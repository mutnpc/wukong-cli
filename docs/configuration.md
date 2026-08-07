---
layout: default
title: Configuration
nav_order: 4
permalink: /configuration/
---

# Configuration

Wukong Code stores user configuration and local state under `~/.wukong`, or
under `$WUKONG_CODE_HOME` when that environment variable is set.

```text
~/.wukong/
  config.toml
  tui.toml
  credentials/
  roles/
```

Project review policy and project-scoped roles live in the repository:

```text
.wukong/
  review-policy.md
  roles/
```

Do not commit user credentials or private local state.

## Configure providers

Open the guided provider manager inside the TUI:

```text
/provider
```

Or use the non-interactive command surface:

```bash
wukong provider --help
wukong provider list
```

Wukong uses the provider API key and model you select. Device Login is separate
and is used only for account features. It does not gate local BYOK Loops.

## Permission mode

The active permission mode can be selected through `/permission` or
`/settings`, or set in `~/.wukong/config.toml`:

```toml
default_permission_mode = "manual"
```

Accepted modes:

- `manual`: ask when an approval rule requires user input.
- `auto`: do not ask; block workspace escapes, sensitive targets, high-risk
  commands, and unclassified external tools.
- `yolo`: skip ordinary approval, while keeping explicit denies, safety hooks,
  plan guards, role limits, and read-only agent limits.

Headless prompt mode defaults to guarded Auto. `--yes` alone does not enable
YOLO; dangerous headless execution requires `--yolo --yes`.

## Role profiles

Role profiles are experimental. Enable them in `~/.wukong/config.toml`:

```toml
[experimental]
role_profiles = true
```

Or set:

```bash
export WUKONG_CODE_EXPERIMENTAL_ROLE_PROFILES=1
```

User roles live in `~/.wukong/roles/`. Project roles live in
`.wukong/roles/` and require an explicit `project:<name>` selection in a trusted
workspace. A project role cannot silently replace a built-in role.

```bash
wukong roles list
wukong roles show security
wukong roles init my-role
```

A role can select instructions, a model, and a narrower tool allowlist. It
cannot expand hard safety boundaries.

## Resume suggestions

The TUI may suggest one unfinished Codex, Claude Code, Cursor, Kimi Code, or
Grok session for the current workspace. Disable automatic foreign-session suggestions in
`~/.wukong/tui.toml`:

```toml
[resume]
foreign_suggestions = false
```

This stops the welcome screen from scanning those directories. Explicit
`/resume codex`, `/resume claude`, `/resume cursor`, `/resume kimi`, and
`/resume grok` commands still work.

## Automatic update preference

Package-manager installations can update in the background at startup. Change
the preference through `/settings` → **Upgrade** or in `~/.wukong/tui.toml`:

```toml
[upgrade]
auto_install = false
```

This disables background installation but keeps version checks and prompts.
Use `WUKONG_CODE_NO_AUTO_UPDATE=1` to disable the startup update preflight
completely. Neither setting disables announcements.

Explicit `wukong upgrade` remains available. Native macOS/Linux upgrades verify
the release SHA-256 and replace the binary atomically.

## Environment variables

| Variable | Description |
|---|---|
| `WUKONG_CODE_HOME` | Override the user data directory (`~/.wukong`) |
| `WUKONG_CODE_OAUTH_HOST` | Override the Device Login host (default `https://wukong.today`) |
| `WUKONG_CODE_BASE_URL` | Override the Wukong account API base (default `https://wukong.today/api/v1`) |
| `WUKONG_CODE_CUSTOM_HEADERS` | Newline-separated custom headers for outbound model requests |
| `WUKONG_CODE_EXPERIMENTAL_ROLE_PROFILES` | Set to `1` to enable experimental role profiles |
| `WUKONG_CODE_NO_AUTO_UPDATE` | Disable startup version checks, prompts, and background installation |
| `WUKONG_CLI_NO_AUTO_UPDATE` | Legacy alias for `WUKONG_CODE_NO_AUTO_UPDATE` |
| `WUKONG_TELEMETRY` | Set to `0` or `false` to disable anonymous product events |
| `WUKONG_DISABLE_TELEMETRY` | Legacy opt-out alias; set to `1`, `true`, or `yes` |

Example with an isolated data directory:

```bash
WUKONG_CODE_HOME=/tmp/wukong-test wukong doctor
```

Device Login and account APIs use `wukong.today` by default. In the development
checkout, the same OAuth host receives the logout revocation request before
local account cleanup. There is no separate `auth.wukong.today` host and no
hosted report upload workflow in v0.0.22.

## Anonymous product events

The installer does not create an installation identity and does not send
telemetry. After installation, the CLI may send optional, bounded product
events for first run, Device Login, Resume, and Loop lifecycle with basic
version/platform fields. It excludes source code, diffs, prompts, objectives,
transcripts, repository names, file paths, provider keys, and provider
endpoints.

The only product-event destination is
`POST https://telemetry-logs.wukong.today/v1/event`. The wire envelope contains
random installation/session/event IDs, event name and timestamp, CLI
version, Node runtime, platform, architecture, UI mode, and controlled
primitive lifecycle properties. The client centrally removes model aliases
and hashes derived from tool arguments before transport.

Failed sends may be stored as mode-`0600` files under
`~/.wukong/telemetry/failed_*.jsonl`. When telemetry remains enabled, files
older than seven days are deleted on a later startup; opting out clears this
failed-event queue without changing local Loop behavior. A verifiable remote
retention/deletion period is not currently defined in the public repository,
so telemetry must not be used as 0.1.0 cohort or completion evidence.

Disable anonymous product events with:

```bash
export WUKONG_TELEMETRY=0
```

Opting out does not change local Loop behavior. Local lifecycle records remain
on the machine for crash recovery; account state is separate from anonymous
events and never gates a BYOK Loop.

## Configuration priority

Later sources override earlier sources:

1. Built-in defaults
2. Files under `WUKONG_CODE_HOME`
3. Environment variables
4. Command-line options

Run `wukong doctor` after editing configuration files.
