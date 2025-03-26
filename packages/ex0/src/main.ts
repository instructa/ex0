import { defineCommand } from 'citty'
import { consola } from 'consola'
import init from './commands/init'
import configs from './commands/configs'

const main = defineCommand({
  meta: {
    name: 'ex0',
    version: '0.0.1',
    description: 'A CLI for to quickstart apps with Cursor and agile workflow management',
  },
  subCommands: {
    init: init,
    configs: configs,
  },
  run() {
    consola.info('Welcome to ex0!')
    
    consola.log('You can run one of the following commands:')
    consola.log('  - init: Create a new project')
    consola.log('  - configs: Initialize IDE configuration files')
    
    consola.log('\nFor more information, run ex0 --help')
  },
})

export default main