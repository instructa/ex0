# codetie

A CLI to bootstrap 3D/interactive web projects in a modern, AI-friendly environment. This version includes a minimal "agile-lite" workflow system designed to handle essential planning documents (PRD, architecture, story) and optionally auto-generate rules for your AI environment if needed.

## Features

- **Project Init** – Quickly scaffold a 3D React + Three.js app or another template.
- **Workflow Management** – Optionally install a minimal agile-lite workflow that helps keep you organized.
- **No External Scripts** – Everything integrated into `codetie` subcommands. No extra .sh or .bat needed.
- **Extendable** – Expand the workflow system with additional .mdc files or templates as you see fit.

---

## Installation

```bash
npm i codetie -g

Or run with npx:

npx codetie@latest init

Usage

Initialize a new project:

npx codetie init myapp

Then optionally install the agile-lite workflow:

cd myapp
npx codetie workflow agile-lite

Project Structure

When you install an agile-lite workflow, you get:

myapp/
├── devnotes/                  # Where minimal .mdc docs reside
│   ├── 700-agile-lite.mdc     # Light agile workflow instructions
│   ├── 701-prd-template.mdc   # PRD template or rules
│   ├── 702-arch-template.mdc  # Architecture template
│   └── ...
├── src/                       # Your app code
├── package.json
├── README.md
└── ...

You can fully customize these templates or rename them as needed.

Commands
    •	codetie init [projectName]
Creates a new project from a recommended starter template or from another template.
    •	codetie workflow [workflowName]
Installs the chosen workflow’s devnotes (like agile-lite) into your project.

Contributing

Contributions and ideas are welcome. Submit pull requests or discuss improvements.

License

MIT