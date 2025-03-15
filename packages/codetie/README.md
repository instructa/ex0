# codetie

A CLI to build interactive web projects in a modern, AI-friendly environment. This version includes IDE configuration initialization and a minimal project planning system designed to handle essential planning documents (PRD, architecture, story) and optionally auto-generate rules for your AI environment if needed.

## Installation

```bash
npm i codetie -g
```

Or run with npx:

```bash
npx codetie@latest init
```

## Usage

Initialize IDE configuration:

```bash
npx codetie@latest init --ide cursor
```

Initialize a new project:

```bash
npx codetie@latest init myapp
```

Then optionally install the agile-lite workflow:

```bash
cd myapp
npx codetie workflow agile-lite
```

You can fully customize these templates or rename them as needed.

## Commands

- **codetie init [--ide cursor|windsurf|cline|copilot]**  
  Initializes configuration files for the specified AI-powered IDE.

- **codetie init [projectName]**  
  Creates a new project from a recommended starter template or from another template.

- **codetie workflow [workflowName]**  
  Installs the chosen workflow's devnotes (like agile-lite) into your project.

- **codetie add [componentName]**  
  Adds a new component to your project.

## Contributing

Contributions and ideas are welcome. Submit pull requests or discuss improvements.

## License

MIT