---
title: Usage
description: Learn how to configure and customize ex0 for your IDEs.
---

ex0 offers a simple CLI approach. Whether you're working with Cursor, Windsurf, Cline, or GitHub Copilot, you can quickly bootstrap and share AI rules among different editors.

## Basic Commands

- **Initialize**:
```bash
npx ex0@latest init
```
Creates or updates configuration for your default IDE (`cursor`) unless otherwise specified.

- **Specify IDE**:
```bash
npx ex0@latest init --ide copilot
```
This sets up `.github/copilot-instructions.md` with recommended rules for Copilot.

- **Force Overwrite**:
```bash
npx ex0@latest init --force
```
Overrides existing configuration files without prompting.

## Example Workflow

1. **Init**:
   ```bash
   npx ex0@latest init --ide cursor
   ```
   This creates `.cursor/rules/` along with recommended ex0 AI guidelines.

2. **Customize**:
   Open `.cursor/rules/` to tweak your AI instructions, coding standards, or naming conventions.

3. **Commit**:
   ```bash
   git add .
   git commit -m "Add custom ex0 configuration for Cursor"
   ```

4. **Switch IDE**:
   ```bash
   npx ex0@latest init --ide windsurf
   ```
   Now you have `.windsurfrules` with the same best practices, ensuring consistent AI behavior across both editors.

That's it! In just a few steps, ex0 saves you from re-creating AI instructions when switching between multiple IDEs.