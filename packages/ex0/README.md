# ex0

A CLI tool for managing AI-powered IDE configurations and rules.

## Installation

```bash
npm i ex0 -g
```

## Quick Start

```bash
npx ex0@latest init
```

## Common usage

```bash
# Initialize IDE configuration
npx ex0@latest init --ide cursor
```

```bash
# Create a new project
npx ex0@latest init myapp
```

```bash
# Initialize workflow configuration
npx ex0@latest workflow agile-lite
```

## Commands

- **ex0 init [--ide cursor|windsurf|cline|copilot]**
  Initialize IDE configuration only

- **ex0 init [projectName]**
  Create a new project with the given name

- **ex0 workflow [workflowName]**
  Configure project with a workflow (agile-lite)

- **ex0 add [componentName]**
  Add a new component to the project

## Contributing

Contributions and ideas are welcome. Submit pull requests or discuss improvements.

## License

MIT