---
layout: default
title: Commands
nav_order: 3
permalink: /commands/
---

# Command Reference

This reference describes the public v0.0.22 binary.

Sections marked **development preview** describe the opt-in `0.1.0-rc.1`
prerelease rather than the stable `v0.0.22` command surface.

The 0.1.0 target keeps this command surface narrow and stabilizes one local
Loop. The development source implements provider-call/token limits, a versioned
no-check decision, file attribution, terminal usage/next actions, and automated
recovery coverage, with local automation passing. The immutable `0.1.0-rc.1`
prerelease has passed six-platform build, public-asset, pinned
install/upgrade/recovery, checksum, provenance, and attestation verification.
Real repository/source flows, first-user/cohort evidence, and the 14-day
stability window remain incomplete. Full internal coverage-schema replacement and
direct-shell content/PATH attestation are not user-facing release blockers.

{: .highlight }
Run `wukong --help` or `wukong <command> --help` against your installed version
when exact options matter.

## Global options

| Option | Description |
|---|---|
| `-h, --help` | Show help |
| `-V, --version` | Show the installed version |
| `-r, --resume [id]` | Resume a session by ID or choose one interactively |
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
wukong -p "<task>" --yolo --yes
```

The example shows syntax only; do not paste it unchanged into a workspace with
uncommitted work. A YOLO prompt may modify files and run commands. `--yes` by
itself does not enable YOLO. The legacy `--auto-approve` option is accepted for
one compatibility window, maps to YOLO, and prints a warning.

## Primary workflow

### `wukong`

Launch the interactive TUI.

```bash
wukong
```

### `wukong -p <prompt>`

Run one prompt without creating a verified Loop verdict.

```bash
wukong -p "explain the project structure"
```

Headless prompt mode defaults to guarded Auto. Use `--output-format
stream-json` for machine-readable event output.

**Development preview:** the current checkout prints a Run preflight,
writer-iteration and running-tool activity, and a final `run.summary` in
addition to model prose. `Outcome COMPLETED` or exit `0` is not Loop `PASS`.
The summary reports checks/evidence, workspace attribution when provable, and
Next. A `provider_outcome_unknown` summary omits resume; reconcile its request
ID/idempotency key with provider logs or billing and never retry blindly.

### `wukong loop <goal>`

Run the write → check → review → fix workflow without opening the TUI.

```bash
wukong loop "fix the failing tests" --dry-run
wukong loop "finish the API" --max-iterations 5 --every 1m --dry-run
wukong loop "review auth" --model fast --review-model strict --dry-run
wukong loop "finish validation" --review-model reviewer --dry-run
wukong loop "finish auth" --done-when "login tests pass" --constraint "keep the public API" --dry-run
```

These examples produce a proposal only. Review it, then add every required
Headless start flag printed by that dry-run to the same command. A bare
headless command does not accept checks, trust, Gate approval, or provider
transmission on the user's behalf.

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
| `--trust-workspace <challenge>` | Confirm the exact short-lived workspace challenge |
| `--approve-gate-plan <digest>` | Confirm the exact frozen Gate approval set |
| `--ack-finish-line-warnings <digest>` | Confirm the exact warning set |
| `--verification-catalog-digest <digest>` | Bind an explicit Verification Skill selection to the dry-run catalog |
| `--verification-skill <identity@digest>` | Select one exact criterion source; repeat to set its flat order |
| `--trust-review-subject <challenge>` | Confirm the short-lived local broker read scope |
| `--ack-review-subject <digest>` | Consent to the exact run-scoped files/evidence and BYOK provider destination |
| `--dry-run` | Print the complete Finish Line proposal without creating trust, contract, or run state |
| `--until <condition>` | Compatibility option; all values map to the unified proof gate |

**Development preview:** the current Loop confirms and freezes the Finish Line,
required checks or versioned no-check decision, workspace identity, trust, Gate
approval, selected verification criteria, broker scope, and exact BYOK review
destination before the Loop starts. The TUI first renders one editable summary
containing those facts plus Writer/Reviewer, pre-existing Git paths, permission,
outbound limits, approval order, result handling, iteration limit,
provider-call ceiling, and optional token budget. Suggested criteria remain
unselected until the user confirms their full provenance digests and order. A
versioned no-check decision can cover eligible documentation/configuration
work; source changes without required checks fail closed as
`NEEDS_WORK/checks_missing`. Trusted project checks run with the current OS
permissions; Skill criteria do not execute commands, and the static guard is
not a complete shell sandbox.

For a real headless run, review `wukong loop <goal> --dry-run` and add its exact
**Headless start flags** to the same command. The required set is
workspace-specific and may include discovered-check choice, warning
acknowledgement, Gate approval, project trust, a short-lived broker challenge,
and run-scoped provider consent.

The TUI may present Finish Line, workspace trust, provider consent, and
permission as separate confirmations. Cancelling preflight creates no run.
Starting anyway with no executable checks does not permit `PASS`.

Every review must account for earlier blockers. Repeated identical blockers
trigger one fresh read-only strategy; if that still makes no progress, the Loop
returns `NEEDS_WORK/no_progress`.

**Development preview result contract:** Loop results and exit codes for a
final durable `loop.result`:

| Result | Exit code | Meaning |
|---|---:|---|
| `PASS` | `0` | The fixed target passed checks and review |
| `NEEDS_WORK` | `1` | A blocker, permission requirement, limit, or no-progress stop remains |
| `ERROR` | `2` | The Loop could not produce a trustworthy result |
| `STOPPED_BY_USER` | `130` for a headless process interruption | Lifecycle result, not a Gate verdict; TUI `/loop stop` does not set a shell exit code |

TUI Ctrl-C or `/loop pause` is resumable `PAUSED`, not `STOPPED_BY_USER`.
`--dry-run` can exit `0` with `loop.finish_line.dry_run` and is not `PASS`;
validation, preflight, and unrelated command exits do not use this verdict
table. After `PASS`, inspect the diff and non-blocking findings via
`/loop status` or review feedback. On `ERROR`, if
`provider_outcome_unknown` is present, reconcile provider logs/billing before
any retry and do not resume blindly.

Legacy `verify-pass`, `scan-clean`, and `judge-pass` Goal inputs remain readable
and map to the unified `proof-pass` gate. Hidden `-S, --session` remains accepted
for compatibility; new usage should use `-r, --resume`.

### TUI `/loop`

```text
/loop add input validation to the signup form
/loop --review-model reviewer -- finish the current change
/loop status
/loop resume
/loop stop
/loop revise preserve the old API while completing the migration
```

Ctrl-C or `/loop pause` keeps the Loop resumable. `/loop stop` reports
`STOPPED_BY_USER`, discards the current Loop contract, and leaves workspace
changes on disk for you to inspect, keep, or revert.

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

### `wukong logout` (development preview)

Disconnect the optional Wukong account without changing the active BYOK model
provider:

```bash
wukong logout
```

The TUI equivalent is `/logout`. Logout first attempts to revoke the stored
refresh token at the configured OAuth host and then always attempts local token
and managed-account cleanup. Only a confirmed response is reported as remotely
revoked. Network, rate-limit, or server failures leave remote state `unknown`
and warn that the server session may remain active; local cleanup still
continues when possible. Repeating logout with no token is idempotent. A local
cleanup failure is an error rather than a false success.

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

If no executable verification command is discovered or supplied, `judge`
returns `block`, prints `Verification: not run`, and exits `1`. A passing risk
scan by itself is not delivery verification.

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

Native macOS/Linux installations can complete an explicit upgrade and verify
the release SHA-256 before atomically replacing the binary. The runtime can
recognize Homebrew install layouts, but there is currently no public Wukong
Homebrew formula to promise as an installation channel. Package-manager paths
apply only when that installed version came from a corresponding published
package. Native Windows and unknown installation sources fall back to the
download page.

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
