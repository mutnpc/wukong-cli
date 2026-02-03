# Advanced Usage Examples

Advanced configurations and integration patterns.

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/sync.yml
name: Sync with Wukong

on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install Wukong CLI
        run: npm install -g @wukong.today/wukong-cli
      
      - name: Sync
        env:
          WUKONG_API_KEY: ${{ secrets.WUKONG_API_KEY }}
        run: wukong sync --push --quiet
```

### GitLab CI

```yaml
# .gitlab-ci.yml
sync:
  image: node:20
  script:
    - npm install -g @wukong.today/wukong-cli
    - wukong sync --push --quiet
  variables:
    WUKONG_API_KEY: ${WUKONG_API_KEY}
```

## Docker Integration

### Dockerfile

```dockerfile
FROM node:20-alpine

RUN npm install -g @wukong.today/wukong-cli

ENTRYPOINT ["wukong"]
```

### Usage

```bash
docker build -t wukong-cli .
docker run -e WUKONG_API_KEY=$WUKONG_API_KEY wukong-cli sync --pull
```

## Scripting

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh - Automated backup with conflict resolution

set -e

echo "Starting backup at $(date)"

# Check status first
wukong status || {
    echo "Not authenticated. Please run: wukong login"
    exit 1
}

# Sync with conflict detection
if wukong sync --dry-run 2>&1 | grep -q "conflict"; then
    echo "Conflicts detected. Manual resolution required."
    exit 1
fi

# Perform actual sync
wukong sync --push --verbose

echo "Backup completed at $(date)"
```

## Team Configuration

### Shared Config Template

```json
{
  "apiEndpoint": "https://api.wukong.today",
  "syncInterval": 600,
  "theme": "dark",
  "telemetry": true
}
```

Share this template with your team and have each member customize as needed.
