---
layout: default
title: Command Reference
nav_order: 3
permalink: /commands
---

# Command Reference

Complete reference for all Wukong CLI commands.

## Global Options

These options are available for all commands:

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Show help information |
| `--version`, `-v` | Show version number |
| `--verbose` | Enable verbose output |
| `--quiet`, `-q` | Suppress non-error output |
| `--config <path>` | Use custom config file |

---

## Core Commands

### `wukong`

Launch interactive mode.

```bash
wukong
```

### `wukong login`

Authenticate with your Wukong account.

```bash
wukong login
wukong login --api-key <key>    # Use API key instead of browser
```

### `wukong logout`

Sign out and clear stored credentials.

```bash
wukong logout
```

### `wukong status`

Check connection and account status.

```bash
wukong status
```

---

## Sync Commands

### `wukong sync`

Synchronize data with Wukong cloud.

```bash
wukong sync              # Two-way sync
wukong sync --pull       # Pull remote changes
wukong sync --push       # Push local changes
wukong sync --force      # Force sync (override conflicts)
```

**Options:**

| Option | Description |
|--------|-------------|
| `--pull` | Only pull remote data |
| `--push` | Only push local changes |
| `--force` | Force sync, override conflicts |
| `--dry-run` | Preview changes without applying |

---

## Configuration Commands

### `wukong config`

Manage CLI configuration.

```bash
wukong config list              # List all settings
wukong config get <key>         # Get a setting value
wukong config set <key> <value> # Set a setting value
wukong config reset             # Reset to defaults
```

---

## Utility Commands

### `wukong bug`

Report a bug directly from CLI.

```bash
wukong bug
```

### `wukong update`

Check for and install updates.

```bash
wukong update          # Check for updates
wukong update --force  # Force reinstall latest
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Authentication error |
| 4 | Network error |
| 5 | Sync conflict |
