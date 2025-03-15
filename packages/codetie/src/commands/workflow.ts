import { defineCommand } from 'citty'
import { consola } from 'consola'
import { resolve, join, dirname } from 'pathe'
import { existsSync, promises as fsp } from 'node:fs'
import { fileURLToPath } from 'node:url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// For this example, we store the agile-lite devnotes folder in “templates/workflow/agile-lite”
const WORKFLOW_TEMPLATES_DIR = resolve(__dirname, ‘../../utils/templates/workflow’)

export default defineCommand({
meta: {
name: ‘workflow’,
description: ‘Install optional workflow items such as agile-lite’,
},
args: {
workflowName: {
type: ‘positional’,
required: true,
description: ‘The workflow name to install (e.g. agile-lite)’,
},
force: {
type: ‘boolean’,
default: false,
description: ‘Override existing files without prompting’,
},
},
async run({ args }) {
const { workflowName, force } = args
consola.info(Installing workflow '${workflowName}'...)
const targetDir = resolve(process.cwd(), ‘devnotes’)

try {
  const sourceDir = join(WORKFLOW_TEMPLATES_DIR, workflowName)
  if (!existsSync(sourceDir)) {
    consola.error(`No templates found for workflow: ${workflowName}`)
    process.exit(1)
  }

  // Ensure devnotes directory exists
  await fsp.mkdir(targetDir, { recursive: true })

  // Copy all .mdc, .md, or other files from sourceDir to devnotes
  const entries = await fsp.readdir(sourceDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = join(sourceDir, entry.name)
    const destPath = join(targetDir, entry.name)
    if (entry.isDirectory()) {
      // skip or recursively copy if needed
      continue
    }
    if (existsSync(destPath) && !force) {
      consola.warn(`File ${destPath} already exists, use --force to override.`)
      continue
    }
    await fsp.copyFile(srcPath, destPath)
    consola.success(`Copied ${entry.name} -> ${destPath}`)
  }

  consola.success(`Workflow '${workflowName}' installed successfully!`)
  consola.info(`Check devnotes/ for the new files.`)
} catch (error) {
  consola.error('Failed to install workflow:', error)
  process.exit(1)
}

},
})