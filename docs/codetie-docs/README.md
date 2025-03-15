# codetie Docs

Welcome to the **codetie** documentation project! This directory provides a sample site (built on Nuxt 3) to demonstrate how you might structure documentation for your codetie-powered projects.

## About codetie

**codetie** is a CLI that centralizes AI-assistant rules across multiple IDEs or AI-driven code editors. It allows you to enforce consistent coding standards, best practices, or instructions to help your team or your personal workflow.

## Getting Started

1. **Install** codetie:
   ```bash
   npm install -g codetie
   ```
   or just use:
   ```bash
   npx codetie init
   ```

2. **Open** the `content/` folder. We have a few markdown files showing how a docs site can be structured.

3. **Customize** the config in `app.config.ts` or `nuxt.config.ts` if you want to adapt the site (since it uses Nuxt for demonstration). Adjust the text, add or remove sections, and adapt the code to match your brand or style.

4. **Run** your docs site locally:
   ```bash
   pnpm install
   pnpm dev
   ```
   or use npm/yarn if you prefer.

## Contributing

We welcome community contributions! Submit pull requests or open issues on the main [codetie GitHub repository](https://github.com/instructa/codetie).

Enjoy managing your multi-IDE AI configurations with codetie!