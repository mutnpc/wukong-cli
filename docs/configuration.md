---
layout: default
title: Configuration
nav_order: 4
permalink: /configuration
---

# Configuration

Wukong CLI can be configured through config files, environment variables, or command-line options.

## Configuration File

Default location: `~/.wukong/config.json`

### Example Configuration

```json
{
  "apiEndpoint": "https://api.wukong.today",
  "syncInterval": 300,
  "theme": "auto",
  "telemetry": true,
  "locale": "en"
}
```

### Configuration Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `apiEndpoint` | string | `https://api.wukong.today` | API server URL |
| `syncInterval` | number | `300` | Auto-sync interval in seconds (0 to disable) |
| `theme` | string | `auto` | Color theme: `auto`, `light`, `dark` |
| `telemetry` | boolean | `true` | Enable anonymous usage statistics |
| `locale` | string | `en` | UI language |

---

## Environment Variables

Environment variables override config file settings.

| Variable | Description |
|----------|-------------|
| `WUKONG_API_KEY` | API key for authentication |
| `WUKONG_ENDPOINT` | Custom API endpoint |
| `WUKONG_CONFIG_DIR` | Custom config directory path |
| `WUKONG_NO_TELEMETRY` | Set to `1` to disable telemetry |
| `WUKONG_DEBUG` | Set to `1` for debug output |

### Example

```bash
export WUKONG_API_KEY="your-api-key"
export WUKONG_NO_TELEMETRY=1
wukong sync
```

---

## Command-Line Options

Command-line options override both config file and environment variables.

```bash
wukong --config /path/to/config.json sync
wukong --verbose sync
```

---

## Priority Order

Configuration is applied in this order (later overrides earlier):

1. Default values
2. Config file (`~/.wukong/config.json`)
3. Environment variables
4. Command-line options

---

## Managing Configuration

### View Current Settings

```bash
wukong config list
```

### Get a Specific Value

```bash
wukong config get syncInterval
```

### Set a Value

```bash
wukong config set theme dark
```

### Reset to Defaults

```bash
wukong config reset
```

---

## Credential Storage

Wukong CLI stores authentication credentials securely:

| Platform | Storage |
|----------|---------|
| macOS | Keychain |
| Linux | libsecret / encrypted file |
| Windows | Credential Manager |

To clear stored credentials:

```bash
wukong logout
```
