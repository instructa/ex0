import { defineCommand, showUsage } from 'citty'
import pkg from '../package.json' assert { type: 'json' }

export default defineCommand({
  meta: {
    name: 'codetie',
    version: pkg.version,
    description: pkg.description,
  },
  args: {
    help: {
      type: 'boolean',
      description: 'Show general usage',
      default: false,
    },
  },
  subCommands: {
    init: () => import('./commands/init').then((m) => m.default),
    add: () => import('./commands/add').then((m) => m.default),
  },
  async run({ args, cmd }) {
    if (args.help || !args._.length) {
      showUsage(cmd)
      return
    }
  },
})