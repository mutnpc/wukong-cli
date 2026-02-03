---
layout: default
title: Getting Started
nav_order: 2
permalink: /getting-started
---

# Getting Started

This guide will help you install and start using Wukong CLI.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- A Wukong account ([Sign up](https://wukong.today/signup))

## Installation

### npm (Recommended)

```bash
npm install -g @wukong.today/wukong-cli
```

### Homebrew (macOS/Linux)

```bash
brew install wukong-cli
```

### Verify Installation

```bash
wukong --version
```

## First Steps

### 1. Login to Your Account

```bash
wukong login
```

This will open your browser for authentication. Once completed, your credentials will be securely stored.

### 2. Verify Connection

```bash
wukong status
```

### 3. Sync Your Data

```bash
wukong sync --pull
```

### 4. Explore Interactive Mode

```bash
wukong
```

## Next Steps

- Learn about [all available commands](./commands.md)
- Configure your [settings](./configuration.md)
- Join our [Discord community](https://discord.gg/wukong)

## Troubleshooting

### Command not found

If you see "command not found" after installation:

```bash
# Check npm global bin path
npm bin -g

# Add to your PATH if needed
export PATH="$(npm bin -g):$PATH"
```

### Authentication Issues

```bash
# Clear stored credentials
wukong logout

# Login again
wukong login
```

For more help, visit [SUPPORT.md](../SUPPORT.md).
