import { existsSync, promises as fsp } from 'node:fs'
import process from 'node:process'
import { defineCommand } from 'citty'
import type { CommandDef, ArgsDef } from 'citty'
import { dirname, resolve, join } from 'pathe'
import { consola } from 'consola'
import { downloadTemplate } from 'giget'
import { fileURLToPath } from 'node:url'

// Define shared args types
interface SharedArgs {
  cwd?: string
  logLevel?: string
}

const cwdArgs = {
  cwd: {
    type: 'string',
    description: 'Current working directory'
  }
} as const

const logLevelArgs = {
  logLevel: {
    type: 'string',
    description: 'Log level'
  }
} as const

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const COMPONENTS_DIR = resolve(__dirname, '../../../templates/components')
const REMOTE_TEMPLATE_BASE = 'https://instructa.ai/r/templates'

interface AddCommandArgs extends SharedArgs {
  force: boolean
  name: string
  target: string
}

const addCommandArgs = {
  ...cwdArgs,
  ...logLevelArgs,
  force: {
    type: 'boolean',
    description: 'Override existing files',
    default: false,
  },
  name: {
    type: 'positional',
    required: true,
    description: 'Component name or URL to add',
  },
  target: {
    type: 'string',
    description: 'Target directory to add the component to',
    default: 'components',
  },
} as const satisfies ArgsDef

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add a component template or download from URL.',
  },
  args: addCommandArgs,
  async run(ctx) {
    const args = ctx.args as AddCommandArgs
    const cwd = resolve(args.cwd || '.')
    const componentName = args.name
    const targetDir = resolve(cwd, args.target)

    // Ensure target directory exists
    if (!existsSync(targetDir)) {
      await fsp.mkdir(targetDir, { recursive: true })
      consola.info(`Created directory: ${targetDir}`)
    }

    try {
      // Check if input is a URL
      const isUrl = componentName.startsWith('http://') || componentName.startsWith('https://')
      
      if (isUrl) {
        // Handle remote template
        await handleRemoteTemplate(componentName, targetDir, args.force)
      } else {
        // Handle local template
        await handleLocalTemplate(componentName, targetDir, args.force)
      }

      consola.success(`Successfully added ${componentName} to ${targetDir}`)
    } catch (error) {
      consola.error(`Failed to add ${componentName}: ${error}`)
      process.exit(1)
    }
  },
}) as CommandDef

async function handleLocalTemplate(
  componentName: string,
  targetDir: string,
  force: boolean
) {
  // Check if component template exists in components directory
  const templatePath = join(COMPONENTS_DIR, componentName)
  
  if (!existsSync(templatePath)) {
    throw new Error(`Template '${componentName}' not found in components directory`)
  }

  // Get list of files in template directory
  const files = await fsp.readdir(templatePath, { withFileTypes: true })

  for (const file of files) {
    const sourcePath = join(templatePath, file.name)
    const targetPath = join(targetDir, componentName, file.name)

    // Check if target exists and force flag is not set
    if (existsSync(targetPath) && !force) {
      throw new Error(
        `File ${targetPath} already exists. Use --force to override.`
      )
    }

    // Create component directory if it doesn't exist
    await fsp.mkdir(dirname(targetPath), { recursive: true })

    if (file.isDirectory()) {
      // Recursively copy directory
      await fsp.cp(sourcePath, targetPath, { recursive: true, force })
    } else {
      // Copy file
      await fsp.copyFile(sourcePath, targetPath)
    }

    consola.info(`Added ${file.name} to ${targetPath}`)
  }
}

async function handleRemoteTemplate(
  url: string,
  targetDir: string,
  force: boolean
) {
  // If URL is a shorthand (e.g., sidebar-01), convert to full URL
  if (!url.startsWith('http')) {
    url = `${REMOTE_TEMPLATE_BASE}/${url}`
  }

  try {
    // Download template using giget
    await downloadTemplate(url, {
      dir: targetDir,
      force
    })
  } catch (error) {
    throw new Error(`Failed to download template from ${url}: ${error}`)
  }
}