# codetie

<p>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat&colorA=18181B&colorB=28CF8D" alt="License">
  <a href="https://github.com/instructa/codetie/stargazers"><img src="https://img.shields.io/github/stars/instructa/codetie.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Stars"></a>
</p>

**codetie** - A CLI tool for managing AI-powered IDE configurations and rules.


**ATTENTION:** This is brand new. untested and under heavy dev! ❗❗❗


---

## Features

- 🤖 **Multi-IDE Support** - Works with popular AI-powered code editors
- 🎯 **Standardized Rules** - Consistent AI behavior across different editors
- 🔄 **Easy Migration** - Switch between IDEs while keeping your AI configurations
- 📦 **Pre-configured Templates** - Best practices for each supported IDE
- 🛠️ **Customizable** - Extend and modify rules for your needs
- 🚀 **Quick Setup** - Initialize IDE configurations with a single command

## Supported IDEs

- **Cursor** - Uses `.cursor/rules` for AI assistance configuration
- **Windsurf** - Uses `.windsurfrules` for code generation settings
- **Cline** - Custom instructions for the Cline AI assistant
- **GitHub Copilot** - `.github/copilot-instructions.md` for personalized suggestions

## Quick Start

1. Initialize configuration for your preferred IDE:
```bash
# Use default IDE (cursor)
npx codetie@latest init

# Or specify an IDE
npx codetie@latest init --ide <ide-name>

# Available IDE options: cursor, windsurf, cline, copilot
```

2. The tool will:
   - Create the appropriate configuration directory
   - Add recommended AI rules and settings
   - Preserve existing configurations (with --force option to override)

## IDE-Specific Setup

### Cursor
```bash
npx codetie@latest init --ide cursor
```
Creates `.cursor/rules` with optimized settings for:
- Code style consistency
- Project-specific conventions
- Documentation standards
- Testing patterns

### Windsurf
```bash
npx codetie@latest init --ide windsurf
```
Creates `.windsurfrules` with:
- Code generation preferences
- Project structure guidelines
- Best practices for your stack

### Cline
```bash
npx codetie@latest init --ide cline
```
Sets up Cline-specific configurations for:
- Custom AI instructions
- Code completion preferences
- Project-specific rules

### GitHub Copilot
```bash
npx codetie@latest init --ide copilot
```
Creates `.github/copilot-instructions.md` with:
- Repository-specific guidelines
- Code style preferences
- Documentation requirements

## CLI Options

```bash
npx codetie@latest init [options]

Options:
  --ide                 IDE to initialize configuration for (cursor, windsurf, cline, copilot)
                       Default: cursor
  --force              Override existing files without prompting (default: false)
  --help, -h           Display help for command
```

## Configuration Structure

Each IDE's configuration follows its own standard format:

```
project/
├── .cursor/           # Cursor AI configuration
│   └── rules/
├── .windsurfrules    # Windsurf configuration
├── .github/          # GitHub Copilot configuration
│   └── copilot-instructions.md
└── ...
```

## Contributing

Contributions are welcome! Feel free to:
- Add support for new IDEs
- Improve existing configurations
- Share best practices
- Report issues

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Links

- X/Twitter: [@kregenrek](https://x.com/kregenrek)
- Bluesky: [@kevinkern.dev](https://bsky.app/profile/kevinkern.dev)

## Related Projects

* [AI Prompts](https://github.com/instructa/ai-prompts) - Curated AI Prompts for various AI-powered IDEs
* [codefetch](https://github.com/regenrek/codefetch) - Turn code into Markdown for LLMs
* [aidex](https://github.com/regenrek/aidex) - CLI tool for AI language model information
