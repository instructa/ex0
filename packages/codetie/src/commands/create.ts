import { existsSync } from 'node:fs'
import process from 'node:process'
import { execSync } from 'node:child_process'

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { resolve, relative } from 'pathe'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname } from 'pathe'
import { downloadTemplate } from 'giget'
import { cwdArgs, logLevelArgs } from './_shared'
import initCommandDef from './init'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templateDir = resolve(__dirname, '../../../templates')

const DEFAULT_TEMPLATE = 'starter/base-starter'
const DEFAULT_REGISTRY = 'https://raw.githubusercontent.com/instructa/codetie/main/templates'

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _cursorignore: '.cursorignore',
  _prettierrc: '.prettierrc',
  _prettierignore: '.prettierignore',
  _eslintrc: '.eslintrc.js',
}

// Package manager options
const packageManagerOptions = ['npm', 'yarn', 'pnpm'] as const
type PackageManagerName = typeof packageManagerOptions[number]

const initCommand = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a fresh codetie project',
  },
  args: {
    ...cwdArgs,
    ...logLevelArgs,
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '',
    },
    name: {
      type: 'string',
      description: 'Project name',
    },
    force: {
      type: 'boolean',
      alias: 'f',
      description: 'Override existing directory',
    },
    install: {
      type: 'boolean',
      default: true,
      description: 'Skip installing dependencies',
    },
    template: {
      type: 'string',
      alias: 't',
      description: 'Template name or repository URL',
      default: DEFAULT_TEMPLATE,
    },
    gitInit: {
      type: 'boolean',
      description: 'Initialize git repository',
    },
    packageManager: {
      type: 'string',
      description: 'Package manager choice (npm, pnpm, yarn)',
    },
    yes: {
      type: 'boolean',
      default: false,
      description: 'Skip confirmation prompt',
      alias: 'y',
    },
    defaults: {
      type: 'boolean',
      default: false,
      description: 'Use default configuration',
      alias: 'd',
    },
    silent: {
      type: 'boolean',
      default: false,
      description: 'Mute output',
      alias: 's',
    },
    help: {
      type: 'boolean',
      description: 'Display help for command',
      alias: 'h',
    },
  },
  async run(ctx) {
    // Handle help option
    if (ctx.args.help) {
      return
    }
    
    // Get the current working directory
    const argsCwd = ctx.args.cwd || '.'
    const cwd = resolve(argsCwd)

    // Configure console output based on silent mode
    if (ctx.args.silent) {
      consola.level = 0
    }

    try {
      // Get project name from args or prompt
      let projectName = ctx.args.name || ctx.args.dir || ''
      
      // If using defaults, use default project name without prompting
      if (!projectName && ctx.args.defaults) {
        projectName = 'my-codetie-project'
      } else if (!projectName && !ctx.args.yes) {
        projectName = await consola.prompt('Where would you like to create your codetie project?', {
          placeholder: 'my-codetie-game',
          type: 'text',
          default: 'my-codetie-game',
        })
      } else if (!projectName) {
        projectName = 'my-codetie-game'
      }

      if (!projectName) {
        consola.error('Project name is required')
        process.exit(1)
      }

      // Project directory
      const root = resolve(cwd, projectName)
      consola.info(`Creating a new project in ${colors.cyan(relative(cwd, root) || root)}.`)

      // Get template name
      const templateName = ctx.args.template || DEFAULT_TEMPLATE

      if (typeof templateName !== 'string') {
        consola.error('Please specify a template!')
        process.exit(1)
      }

      // Check if directory exists
      let shouldForce = Boolean(ctx.args.force)
      if (!shouldForce && existsSync(root) && !ctx.args.yes && !ctx.args.defaults) {
        const selectedAction = await consola.prompt(
          `The directory ${colors.cyan(root)} already exists. What would you like to do?`,
          {
            type: 'select',
            options: ['Override its contents', 'Select different directory', 'Abort'],
          },
        )

        switch (selectedAction) {
          case 'Override its contents':
            shouldForce = true
            break
          case 'Select different directory': {
            const newDir = await consola.prompt('Please specify a different directory:', {
              type: 'text',
            })
            if (!newDir) process.exit(1)
            projectName = newDir
            break
          }
          default:
            process.exit(1)
        }
      } else if (!shouldForce && existsSync(root) && (ctx.args.yes || ctx.args.defaults)) {
        shouldForce = true
      }

      // Download template
      consola.info(`Downloading template: ${templateName}...`)
      try {
        let templateUrl = templateName
        
        // If it's the default template or a known template name
        if (templateName === DEFAULT_TEMPLATE || !templateName.includes('/')) {
          templateUrl = `gh:instructa/codetie/templates/${templateName}`
        }

        await downloadTemplate(templateUrl, {
          dir: root,
          force: shouldForce
        })
        consola.success('Template downloaded successfully!')
      } catch (error) {
        consola.error('Failed to download template:', error)
        process.exit(1)
      }

      // Get project details
      let description = `A codetie game called ${projectName}`
      let authorName = getGitUser() || 'codetie Developer'
      
      if (!ctx.args.defaults && !ctx.args.yes) {
        description = await consola.prompt('Enter project description:', {
          default: description,
          type: 'text',
        }) || description
        
        authorName = await consola.prompt('Enter author name:', {
          default: authorName,
          type: 'text',
        }) || authorName
      }

      // Process template files
      const templateVariables = {
        PROJECT_NAME: projectName,
        DESCRIPTION: description,
        AUTHOR_NAME: authorName,
        CURRENT_YEAR: new Date().getFullYear(),
      }

      // Process template files (like README.md.mustache)
      processTemplateFiles(templateDir, root, templateVariables)

      // Update package.json
      updatePackageJson(root, projectName, description, authorName)

      // After template is downloaded and configured, run the init command
      consola.info('Initializing IDE configuration...')
      try {
        if (initCommandDef?.run) {
          await initCommandDef.run({
            args: {
              ide: 'cursor',
              force: ctx.args.force,
              _: []
            },
            data: {},
            rawArgs: [],
            cmd: initCommandDef
          })
        }
      } catch (error) {
        consola.warn('Failed to initialize IDE configuration:', error)
        // Don't exit here as this is not critical
      }

      // Install dependencies
      if (ctx.args.install !== false) {
        // Resolve package manager
        const packageManagerArg = ctx.args.packageManager as PackageManagerName
        
        // Determine which package manager to use
        let selectedPackageManager: PackageManagerName | undefined
        
        if (packageManagerOptions.includes(packageManagerArg as any)) {
          selectedPackageManager = packageManagerArg
        } else if (ctx.args.defaults) {
          selectedPackageManager = 'npm' as const
        } else if (ctx.args.yes) {
          selectedPackageManager = 'npm' as const
        } else {
          const pmChoice = await consola.prompt('Which package manager would you like to use?', {
            type: 'select',
            options: [...packageManagerOptions] as string[],
          })
          
          if (pmChoice && packageManagerOptions.includes(pmChoice as any)) {
            selectedPackageManager = pmChoice as PackageManagerName
          } else {
            selectedPackageManager = 'npm' as const
          }
        }

        if (selectedPackageManager) {
          consola.info(`Installing dependencies with ${selectedPackageManager}...`)
          try {
            let command = ''
            switch (selectedPackageManager) {
              case 'npm':
                command = 'npm install'
                break
              case 'yarn':
                command = 'yarn'
                break
              case 'pnpm':
                command = 'pnpm install'
                break
            }
            execSync(command, { cwd: root, stdio: 'inherit' })
            consola.success('Dependencies installed successfully!')
          } catch (error) {
            consola.error('Failed to install dependencies:', error)
          }
        }
      } else {
        consola.info('Skipping install dependencies step.')
      }

      // Initialize git repository
      let shouldInitGit = ctx.args.gitInit
      
      if (shouldInitGit === undefined) {
        if (ctx.args.defaults) {
          shouldInitGit = true
        } else if (ctx.args.yes) {
          shouldInitGit = true
        } else {
          shouldInitGit = await consola.prompt('Initialize git repository?', {
            type: 'confirm',
          })
        }
      }
      
      if (shouldInitGit) {
        consola.info('Initializing git repository...')
        try {
          execSync('git init', { cwd: root, stdio: 'inherit' })
        } catch (err) {
          consola.warn(`Failed to initialize git repository: ${err}`)
        }
      }

      // Display next steps
      const relativeRoot = relative(process.cwd(), root) || '.'
      consola.box(`
codetie project created successfully! 🎉

Project: ${projectName}
Template: ${templateName}
Location: ${root}

Next steps:
${relativeRoot !== '.' ? `1. cd ${relativeRoot}` : ''}
${relativeRoot !== '.' ? '2' : '1'}. npm run dev (or yarn dev, pnpm dev)
${relativeRoot !== '.' ? '3' : '2'}. Open your browser at http://localhost:5173

Happy game development! 🚀
      `)
    } catch (error) {
      consola.error(error)
      process.exit(1)
    }
  },
})

function getGitUser() {
  try {
    const name = execSync('git config user.name').toString().trim()
    return name
  } catch (e) {
    return ''
  }
}

function processTemplateFiles(
  templateDir: string,
  targetDir: string,
  variables: Record<string, any>
) {
  if (!existsSync(templateDir)) {
    return // Skip if template directory doesn't exist
  }
  
  const files = fs.readdirSync(templateDir, { withFileTypes: true })
  
  for (const file of files) {
    const srcPath = resolve(templateDir, file.name)
    const destPath = resolve(targetDir, renameFiles[file.name] || file.name)
    
    if (file.isDirectory()) {
      fs.ensureDirSync(destPath)
      processTemplateFiles(srcPath, destPath, variables)
    } else if (file.name.endsWith('.mustache')) {
      const content = fs.readFileSync(srcPath, 'utf-8')
      const rendered = renderTemplate(content, variables)
      fs.writeFileSync(destPath.replace(/\.mustache$/g, ''), rendered)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function renderTemplate(template: string, variables: Record<string, any>): string {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key) => {
    return variables[key.trim()] || ''
  })
}

function updatePackageJson(
  root: string,
  projectName: string,
  description: string,
  authorName: string
) {
  const packageJsonPath = resolve(root, 'package.json')
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    
    // Update package.json with new project details
    packageJson.name = projectName
    packageJson.description = description
    packageJson.author = authorName
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }
}

// Main command with subcommands
const main = defineCommand({
  meta: {
    name: 'codetie',
    description: 'codetie CLI tools',
  },
  subCommands: {
    init: initCommand,
  }
})
runMain(main)
