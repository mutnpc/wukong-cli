# Basic Usage Examples

Common usage patterns for Wukong CLI.

## Configuration Files

### Default Config

Create `~/.wukong/config.json`:

```json
{
  "apiEndpoint": "https://api.wukong.today",
  "syncInterval": 300,
  "theme": "auto",
  "telemetry": true
}
```

### Minimal Config (Privacy-focused)

```json
{
  "telemetry": false,
  "syncInterval": 0
}
```

## Common Workflows

### Daily Sync

```bash
#!/bin/bash
# daily-sync.sh - Run this on startup or via cron

wukong sync --pull
echo "Synced at $(date)"
```

### Before Work

```bash
wukong sync --pull
# Start your work...
```

### After Work

```bash
# After completing your work...
wukong sync --push
```

## Shell Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
alias ws="wukong sync"
alias wsp="wukong sync --pull"
alias wss="wukong sync --push"
alias wst="wukong status"
```
