# Contributing to ex0

Thank you for your interest in contributing to ex0! This document provides guidelines and instructions to help you get started with contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher

### Setting Up the Local Environment

1. Clone the repository:

```bash
git clone git@github.com:instructa/ex0.git
cd ex0
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the packages:

```bash
pnpm run build:packages
```

## Development Process

### Creating a New Feature

1. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:

```bash
git add .
git commit -m "feat: add your feature"
```

3. Push your branch to GitHub:

```bash
git push origin feature/your-feature-name
```

### Submitting a Pull Request

Go to the [ex0 repository](https://github.com/instructa/ex0) and create a pull request from your fork.

## Code Style and Guidelines

- Follow the existing code style and naming conventions.
- Write clear, concise commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- Add tests for your changes when applicable.
- Update documentation as needed.

## Release Process

The project follows [Semantic Versioning](https://semver.org/). When a new release is ready, maintainers will:

1. Update the version number in package.json.
2. Create a changelog entry.
3. Tag the release in Git.
4. Publish to npm.

## Issues and Discussions

Feel free to open issues for bugs, feature requests, or questions. For complex discussions, start a discussion in the repository's Discussions section.

Thank you for contributing!