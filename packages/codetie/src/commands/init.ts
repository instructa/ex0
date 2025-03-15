import { existsSync, promises as fsp } from 'node:fs'
import process from 'node:process'
import { defineCommand } from 'citty'
import { resolve, join, dirname } from 'pathe'
import { consola } from 'consola'
import { fileURLToPath } from 'node:url'

const IDE_OPTIONS = ['cursor', 'windsurf', 'cline', 'copilot'] as const
type IDEOption = typeof IDE_OPTIONS[number]

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize IDE-specific configuration files',
  },
  args: {
    ide: {
      type: 'string',
      description: 'IDE to initialize configuration for',
      default: 'cursor',
      options: IDE_OPTIONS,
    },
    force: {
      type: 'boolean',
      description: 'Override existing files without prompting',
      default: false,
    },
  },
  async run(ctx) {
    try {
      consola.info('Starting IDE configuration initialization...')
      
      const selectedIDE = ctx.args.ide as IDEOption || 'cursor'
      consola.info(`Selected IDE: ${selectedIDE}`)
      
      if (!IDE_OPTIONS.includes(selectedIDE)) {
        consola.error(`Invalid IDE option. Available options: ${IDE_OPTIONS.join(', ')}`)
        process.exit(1)
      }

      // Get template directory path
      const templateDir = resolve(__dirname, '../../src/utils/templates', selectedIDE)
      consola.debug(`Looking for templates in: ${templateDir}`)
      
      if (!existsSync(templateDir)) {
        consola.error(`No template found for IDE: ${selectedIDE}`)
        consola.info('Available templates should be in src/utils/templates/<ide-name>')
        process.exit(1)
      }

      // Create IDE directory (e.g., .cursor)
      const targetDir = resolve(process.cwd(), `.${selectedIDE}`)
      consola.info(`Creating configuration directory: ${targetDir}`)
      
      try {
        // Function to recursively copy templates
        async function copyTemplates(sourcePath: string, targetPath: string) {
          // Create target directory if it doesn't exist
          if (!existsSync(targetPath)) {
            await fsp.mkdir(targetPath, { recursive: true })
            consola.success(`Created directory: ${targetPath}`)
          }

          // Read source directory contents
          const entries = await fsp.readdir(sourcePath, { withFileTypes: true })
          consola.info(`Found ${entries.length} template files/directories to process`)

          for (const entry of entries) {
            const srcPath = join(sourcePath, entry.name)
            const destPath = join(targetPath, entry.name)

            if (entry.isDirectory()) {
              // Recursively copy subdirectories
              await copyTemplates(srcPath, destPath)
            } else {
              // Check if file exists before copying
              if (existsSync(destPath) && !ctx.args.force) {
                const answer = await consola.prompt(
                  `File ${destPath} already exists. Override?`,
                  {
                    type: 'confirm',
                    default: false,
                  }
                )
                if (!answer) {
                  consola.info(`Skipping ${destPath}`)
                  continue
                }
              }

              // Copy file
              await fsp.copyFile(srcPath, destPath)
              consola.success(`Created file: ${destPath}`)
            }
          }
        }

        // Start copying templates
        await copyTemplates(templateDir, targetDir)
        
        consola.success(`Successfully initialized ${selectedIDE} configuration!`)
        consola.info(`Configuration files are located in: ${targetDir}`)
      } catch (error) {
        consola.error('Failed to copy template files:', error)
        process.exit(1)
      }
    } catch (error) {
      consola.error('Failed to initialize configuration:', error)
      process.exit(1)
    }
  },
})