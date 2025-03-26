# ex0

<p align="center">
<a href="https://github.com/instructa/ex0/stargazers"><img src="https://img.shields.io/github/stars/instructa/ex0.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Stars"></a>
</p>

**ex0** - A CLI tool for managing AI-powered IDE configurations and rules.

<table>
<tr>
<td width="500px" valign="top">

**Quick Links**

- [Installation](#installation)
- [Usage](#usage)
- [Supported IDEs](#supported-ides)
- [Commands](#commands)
- [Configuration](#configuration)
- [Contributing](#contributing)

</td>
<td width="500px" valign="top">

**Supported IDEs**

- [Cursor](#cursor)
- [Windsurf](#windsurf)
- [Cline](#cline)
- [GitHub Copilot](#github-copilot)

</td>
</tr>
</table>

## Installation

You can use ex0 without installing it by using npx:

```bash
npx ex0@latest init
```

Or you can install it globally:

```bash
npm install -g ex0
```

## Usage

Create a new project with standard IDEs configuration:

```bash
npx ex0@latest init --ide <ide-name>
```

### Cursor

Initialize a project with Cursor AI configuration:

```bash
npx ex0@latest init --ide cursor
```

This will create a `.cursor` directory in your project with configuration files for Cursor AI.

### Windsurf

Initialize a project with Windsurf configuration:

```bash
npx ex0@latest init --ide windsurf
```

This will create a `.windsurf` directory in your project.

### Cline

Initialize a project with Cline configuration:

```bash
npx ex0@latest init --ide cline
```

This will create a `.cline` directory in your project.

### GitHub Copilot

Initialize a project with GitHub Copilot configuration:

```bash
npx ex0@latest init --ide copilot
```

This will create a `.github/.copilot` directory in your project.

## Commands

```bash
npx ex0@latest init [options]
```

Options:
- `--ide <name>`: Specify the IDE to configure (cursor, windsurf, cline, copilot)
- `--defaults`: Use default options without prompting
- `--yes`: Skip prompts, use defaults

## Contributing

Please see [CONTRIBUTE.md](./CONTRIBUTE.md) for details on how to contribute to this project.

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
