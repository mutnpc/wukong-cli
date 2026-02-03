# Examples

This directory contains example configurations and usage patterns for Wukong CLI.

## Contents

| Example | Description |
|---------|-------------|
| [basic-usage/](./basic-usage/) | Basic usage patterns and configurations |
| [advanced/](./advanced/) | Advanced usage scenarios |

## Quick Examples

### Basic Sync Workflow

```bash
# Login
wukong login

# Pull latest data
wukong sync --pull

# Make your changes...

# Push your changes
wukong sync --push
```

### CI/CD Integration

```bash
# Use API key for non-interactive auth
export WUKONG_API_KEY="your-api-key"
wukong sync --pull --quiet
```

### Custom Configuration

```bash
# Use a custom config file
wukong --config ./my-config.json sync
```

## More Examples

For more detailed examples, check the subdirectories or visit our [documentation](https://docs.wukong.today).
