---
layout: default
title: Commands
nav_order: 3
permalink: /commands/
---

# Command Reference

This reference describes the public v0.0.20 binary.

{: .highlight }
Run `wukong --help` or `wukong <command> --help` against your installed version
when exact options matter.

## Global options

| Option | Description |
|---|---|
| `-h, --help` | Show help |
| `-V, --version` | Show the installed version |
| `-S, --session [id]` | Resume a session by ID or choose one interactively |
| `-c, --continue` | Continue the previous session for the current workspace |
| `-p, --prompt <prompt>` | Run one prompt non-interactively |
| `-m, --model <model>` | Select a configured model alias |
| `--auto` | Run autonomously with workspace and high-risk guardrails |
| `-y, --yolo` | Skip ordinary approvals; hard limits still apply |
| `--output-format <format>` | Select `text` or `stream-json` prompt output |
| `--skills-dir <dir>` | Add a Skill directory; may be repeated |
| `--add-dir <dir>` | Add another workspace directory; may be repeated |
| `--plan` | Start in plan mode |

For dangerous headless prompt execution, `--yolo` also requires the hidden
confirmation flag `--yes`:

```bash
wukong -p "finish the current change" --yolo --yes
```

`--yes` by itself does not enable YOLO. The legacy `--auto-approve` option is
accepted for one compatibility window, maps to YOLO, and prints a warning.

## Primary workflow

### `wukong`

Launch the interactive TUI.

```bash
wukong
```

### `wukong -p <prompt>`

Run one prompt and print the response.

```bash
wukong -p "explain the project structure"
```

Headless prompt mode defaults to guarded Auto. Use `--output-format
stream-json` for machine-readable event output.

### `wukong loop <goal>`

Run the write → check → review → fix workflow without opening the TUI.

```bash
wukong loop "fix the failing tests"
wukong loop "finish the API" --max-iterations 5 --every 1m
wukong loop "review auth" --model fast --review-model strict
wukong loop "finish validation" --review-model reviewer
wukong loop "validate arguments" --dry-run
wukong loop "finish auth" --done-when "login tests pass" --constraint "keep the public API"
```

| Option | Description |
|---|---|
| `--max-iterations <n>` | Maximum Loop iterations |
| `--every <duration>` | Minimum delay between iterations, such as `1m` or `5m` |
| `--model <alias>` | Writer model alias |
| `--review-model <alias>` | Independent reviewer model alias |
| `--done-when <criterion>` | Optional user-owned completion criterion |
| `--constraint <rule>` | Repeatable Must not constraint |
| `--check <command>` | Repeatable explicit required project check |
| `--accept-discovered-checks` | Include the exact checks proposed by dry-run |
| `--only-explicit-checks` | Exclude discovered checks and record the exclusion |
| `--trust-workspace <digest>` | Confirm the exact short-lived workspace challenge |
| `--approve-gate-plan <digest>` | Confirm the exact frozen Gate approval set |
| `--ack-finish-line-warnings <digest>` | Confirm the exact warning set |
| `--dry-run` | Print the complete Finish Line proposal without creating trust, contract, or run state |
| `--until <condition>` | Compatibility option; all values map to the unified proof gate |

v0.0.20 confirms and freezes the Finish Line, required checks, workspace
identity, trust, Gate approval, selected verification criteria, broker scope,
and exact BYOK review destination before the Loop starts. Suggested criteria
remain unselected until the user confirms their full provenance digests and
order. Trusted project checks run with the current OS permissions; Skill
criteria do not execute commands, and the static guard is not a complete shell
sandbox.
Every review must account for earlier blockers. Repeated identical blockers
trigger one fresh read-only strategy; if that still makes no progress, the Loop
returns `NEEDS_WORK/no_progress`.

Loop results and exit codes:

| Result | Exit code | Meaning |
|---|---:|---|
| `PASS` | `0` | The fixed target passed checks and review |
| `NEEDS_WORK` | `1` | A blocker, permission requirement, limit, or no-progress stop remains |
| `ERROR` | `2` | The Loop could not produce a trustworthy result |
| Interrupted | `130` | The user or process interrupted the run |

Legacy `verify-pass`, `scan-clean`, and `judge-pass` Goal inputs remain readable
in v0.0.20 and map to the unified `proof-pass` gate.

### TUI `/loop`

```text
/loop add input validation to the signup form
/loop --review-model reviewer -- finish the current change
/loop status
/loop resume
/loop stop
/loop revise preserve the old API while completing the migration
```

### TUI `/resume`

```text
/resume
/resume codex
/resume claude
/resume cursor
/resume kimi
/resume grok
```

Bare `/resume` lists Wukong sessions. An explicit source scans that agent's
local sessions. External history is imported as read-only context; old tool
calls are never replayed.

The compatibility aliases `/resume-codex`, `/resume-claude`, and
`/resume-cursor` still work but are hidden from the primary command list. Kimi
Code and Grok use the canonical source arguments and do not add more aliases.

## Providers and account

### `wukong provider`

Manage providers non-interactively:

```bash
wukong provider list
wukong provider catalog --help
wukong provider add <registry-url>
wukong provider remove <provider-id>
```

Inside the TUI, `/provider` opens the guided provider manager.

### `wukong login`

Authenticate through Device Login for account features. Login does not gate a
local BYOK Loop.

```bash
wukong login
```

The browser flow uses `https://wukong.today/auth/device`, where the user confirms
with Google or GitHub. Login does not replace the model provider API key used for
inference. The authenticated Wukong model catalog currently returns no hosted
models, and an empty catalog is a successful account connection.

### TUI `/feedback`

`/feedback` works without login. Before submission it shows the exact text JSON
fields and requires confirmation. It never attaches logs, prompts, transcripts,
source code, file paths, or local evidence.

## Review policy and feedback

### `wukong review`

```bash
wukong review init
wukong review feedback <finding-id> accept
wukong review stats
```

- `init` creates `.wukong/review-policy.md` in the current project.
- `feedback` records local finding feedback.
- `stats` shows local feedback counts and hides quality ratios for very small
  samples.

The TUI `/review` command exposes the same review-policy and feedback workflow.

## Roles and subagents

### `wukong roles`

Role profiles are experimental.

```bash
wukong roles list
wukong roles show security
wukong roles init my-role
```

Enable them with `experimental.role_profiles` in `~/.wukong/config.toml` or
`WUKONG_CODE_EXPERIMENTAL_ROLE_PROFILES=1`.

Inside the TUI:

| Command | Description |
|---|---|
| `/transform <role>` | Switch the active role |
| `/transform list` | List available roles |
| `/transform status` | Show the active role and model |
| `/transform off` | Return to the default role |
| `/swarm on` | Enable delegation mode |
| `/swarm off` | Disable delegation mode |
| `/swarm <task>` | Start a task with delegation enabled |
| `/btw <question>` | Ask a forked side agent a focused question |
| `/tasks` | Browse background agents |

Role and subagent capabilities may narrow the parent agent's tool set. They
cannot expand hard denies or a read-only reviewer/strategist boundary.

## Permission modes

| Mode | Behavior |
|---|---|
| Manual | Ask when an approval rule requires user input |
| Auto | Do not ask; block workspace escapes, sensitive targets, high-risk commands, and unclassified external tools |
| YOLO | Skip ordinary approvals, but keep explicit denies, safety hooks, plan guards, role limits, and read-only limits |

TUI commands:

```text
/permission
/auto
/yolo
/settings
```

If Auto blocks an action during a Loop, the Loop stops as
`NEEDS_WORK/permission_required` instead of silently approving it.

## Advanced diagnostics

These commands remain available for diagnosis and CI. Loop runs them as
internal layers, so they are not separate products.

### `wukong verify`

Run the project checks discovered by Loop.

```bash
wukong verify
wukong verify --build
wukong verify --command "pnpm test"
wukong verify --json
wukong verify --no-report
```

### `wukong scan`

Run the read-only risk rules used by Loop.

```bash
wukong scan
wukong scan --json
wukong scan --report ./reports/risk.md
```

### `wukong proof`

Inspect the combined delivery-gate inputs.

```bash
wukong proof
wukong proof --json
wukong proof --no-report
```

### `wukong judge`

Make a deterministic merge decision without model calls by default.

```bash
wukong judge
wukong judge --strict
wukong judge --json
```

### `wukong guard`

Inspect or run the best-effort command risk guard.

```bash
wukong guard --status
wukong guard --stats
wukong guard --enable
wukong guard --disable
wukong guard -- rm -rf ./tmp
```

The TUI equivalents `/verify`, `/scan`, and `/proof` are hidden advanced
commands. `/judge` and `/guard` remain visible utility commands.

## Updates

### `wukong upgrade` / `wukong update`

Check the public version manifest and install the latest release directly.

```bash
wukong upgrade
wukong update
```

Supported package managers, Homebrew, and native macOS/Linux installations can
complete an explicit upgrade automatically. Native upgrades verify the release
SHA-256 before atomically replacing the binary. Native Windows and unknown
installation sources fall back to the download page.

See [Updates and announcements](/updates-and-announcements/).

## Local server and web UI

```bash
wukong web
wukong server run --foreground
wukong server ps
wukong server kill
wukong server rotate-token
```

`wukong web` binds to loopback by default and starts the local daemon when
needed. Review `wukong web --help` before binding to a non-loopback interface;
remote terminal and shutdown routes remain restricted by default.

## Other shipped commands

| Command | Description |
|---|---|
| `wukong doctor` | Validate configuration files |
| `wukong today` | Show the local Daily Proof Briefing and manage its focus |
| `wukong export [sessionId]` | Export a session ZIP |
| `wukong vis [sessionId]` | Open the session visualizer |
| `wukong migrate` | Migrate legacy Wukong data |
| `wukong acp` | Run as an Agent Client Protocol server |

`wukong today` remains a secondary local utility; it is not the primary Loop
workflow and `/today` is not part of the current visible TUI command surface.
