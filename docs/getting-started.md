---
layout: default
title: Getting Started
nav_order: 2
permalink: /getting-started/
---

# Getting Started

Wukong Code v0.0.22 is a terminal AI coding agent centered on one workflow:
**Goal → Write → Check → Review → Fix**.

{: .highlight }
Install and release facts on this page refer to published `v0.0.22`. Sections
marked **development preview** describe the unreleased source checkout and do
not mean that `0.1.0-rc.1` is available.

Version 0.1.0 is scoped to one controllable, recoverable, explainable local
Loop. Before RC, the development path must add enforceable call/token limits,
trustworthy no-check handling, file attribution, complete terminal usage/next
actions, and upgrade/recovery proof. Full multi-layer coverage schemas and
direct-shell content/PATH attestation are deferred.

## Requirements

- macOS, Linux, or Windows
- A local workspace directory
- An API key for a supported model provider

Wukong calls the provider API you configure. BYOK does not mean a local model.
Device Login is optional and is used for account features. It does not provide
a model API key and does not decide whether a local BYOK Loop may run.

## Install

### macOS and Linux

```bash
curl -fsSL https://wukong.today/install.sh | sh
wukong --version
```

The installer downloads the matching native binary from the public release and
verifies its SHA-256 file.

### Windows

Download the matching Windows x64 or ARM64 ZIP from the
[release page](https://github.com/mutnpc/wukong-code/releases/tag/v0.0.22),
along with its adjacent `.sha256` file. In PowerShell, verify and extract it:

```powershell
$expected = (Get-Content .\wukong-win32-x64.zip.sha256).Split()[0]
$actual = (Get-FileHash .\wukong-win32-x64.zip -Algorithm SHA256).Hash.ToLower()
if ($actual -ne $expected) { throw "SHA-256 mismatch" }
Expand-Archive .\wukong-win32-x64.zip -DestinationPath .\wukong
.\wukong\wukong.exe --version
```

Use the `win32-arm64` filenames on Windows ARM64. Move `wukong.exe` to a
permanent directory, add that directory to your user `PATH`, open a new
terminal, and run `wukong --version`.

### Manual macOS or Linux ZIP

Download both the matching ZIP and `.sha256` file, then run:

```bash
shasum -a 256 -c wukong-darwin-arm64.zip.sha256
unzip wukong-darwin-arm64.zip
chmod +x wukong
./wukong --version
```

Replace the target name for Intel macOS or Linux. The v0.0.22 macOS assets
have published SHA-256 files but were not Developer ID notarized; macOS may
show a Gatekeeper warning. Do not bypass it unless the checksum matches and
you trust the linked GitHub Release. The release workflow for subsequent
public versions fails closed unless Developer ID signing and notarization pass.

### Upgrade

```bash
wukong upgrade
```

Native macOS and Linux installations upgrade in place after checking the
release SHA-256. Windows native installations open the download path when an
automatic replacement is unavailable.

## Configure a model

Start the TUI and open the guided provider manager:

```bash
wukong
```

```text
/provider
```

For non-interactive provider commands:

```bash
wukong provider --help
wukong provider list
```

## Run your first Loop

Inside the TUI:

```text
/loop add input validation to the signup form
```

Or run a headless Loop:

```bash
wukong loop "add input validation to the signup form" --dry-run
# Review “Headless start flags”, then rerun the same command with those flags.
```

The dry-run lists the exact check decision, Gate approval, workspace trust (if
checks execute), short-lived broker challenge, and run-scoped provider consent
required by the current workspace. A bare headless command fails closed when
those decisions are missing; it never silently accepts them for you.

### A normal prompt is not a Loop verdict (development preview)

```bash
wukong -p "summarize this repository"
```

The current development checkout prints a Run preflight, writer-iteration and
running-tool activity, and a final `run.summary` in addition to model prose.
`Outcome COMPLETED` or exit `0` means only that the prompt turn ended normally;
it is not `PASS`. The summary says whether checks or durable Loop evidence were
recorded, shows workspace attribution when it can be proved, and gives a Next
action. If it reports `provider_outcome_unknown`, the resume command is omitted:
reconcile the request ID/idempotency key with provider logs or billing before
starting another request.

## What you should see (development preview)

The primary user flow is **input → execution → evidence → disposition**:

1. **Input:** one Preflight summary shows the exact Goal, optional Done when and
   Must not rules, selected project checks and review criteria, Writer/Reviewer,
   sanitized provider origin, pre-existing Git paths, permission mode, outbound
   scope and payload limits, approval order, result handling, and iteration
   limit. It explicitly says that no separate provider-call or token cap is
   currently enforced. Headless dry-run prints the same runtime facts and exact
   start flags. Local read, provider transmission, permission, and project-check
   execution remain separate approvals. A generic warning acknowledgement is
   not yet the final versioned no-check decision; both that decision and real
   call/token enforcement remain RC work.
   execution remain separate security approvals. Cancelling creates no run;
   starting anyway with no executable checks does not make `PASS` possible.
2. **Execution:** watch writer iteration, elapsed time, the active tool/activity,
   and any permission, provider, or check blocker. TUI `WRITE`/`CHECK`/`REVIEW`
   labels are activity hints; headless currently reports writer iterations and
   running tools, and an internal reviewer is not always exposed as a distinct
   `REVIEW` phase. A model saying “done” is not completion.
3. **Evidence:** the final decision is based on the current workspace, real
   check results, bounded risk findings, and a fresh read-only review. Earlier
   session claims are context only. Usage, cost, provider-call count, reviewer
   usage, and file attribution remain `unavailable` or `unknown` unless durable
   records can prove them.
4. **Disposition:** act on the single terminal result below. Do not interpret
   raw agent prose as the release decision.

| Result | Meaning | Next action |
|---|---|---|
| `PASS` | Current workspace checks and review passed the frozen Gate | Inspect the diff and non-blocking findings in `/loop status` or review feedback, then commit or deliver it through your normal workflow |
| `NEEDS_WORK` | A concrete blocker, limit, permission need, or no-progress condition remains | Read the primary blocker; continue/revise the Loop or handle the required external action |
| `ERROR` | Wukong could not produce a trustworthy Gate result | Fix the provider, tool, check, or state error. With `provider_outcome_unknown`, reconcile provider logs/billing first and never retry blindly |
| `PAUSED` | TUI Ctrl-C or `/loop pause` parked the same contract without a Gate verdict | Inspect retained changes and use `/loop resume` when safe |
| `STOPPED_BY_USER` | `/loop stop` or a headless interruption stopped work without a Gate verdict | Inspect retained changes. `/loop stop` discards the contract; headless resume is offered only when the provider outcome is known |

An Auto permission guard inside an active Loop is
`NEEDS_WORK/permission_required`, not `PAUSED` or `STOPPED_BY_USER`.

The Loop:

1. Works on the goal.
2. Runs the checks available in the repository.
3. Reviews the change from a fresh read-only context.
4. Fixes blocking findings against the same goal.
5. Returns the Gate verdict `PASS`, `NEEDS_WORK`, or `ERROR`.

TUI Ctrl-C or `/loop pause` parks the Goal as `PAUSED` so the same contract can
be resumed. `/loop stop` reports `STOPPED_BY_USER`, deliberately discards that
Loop contract, and leaves workspace changes for explicit keep/revert. A
headless interruption also reports `STOPPED_BY_USER`; it must not offer blind
resume when the provider request outcome is unknown.

v0.0.22 remembers earlier blockers. If the same blocker survives repeated
reviews, Wukong tries one fresh read-only strategy and then stops with
`NEEDS_WORK/no_progress` if the work is still not moving forward.

Only the final durable `loop.result` maps `PASS=0`, `NEEDS_WORK=1`, and
`ERROR=2` to Gate verdicts. Headless SIGINT exits `130` as a lifecycle result.
A successful `loop.finish_line.dry_run` also exits `0` and is not `PASS`;
validation, preflight, and unrelated command exits do not use the verdict table.

Resume a Wukong session from the shell with the canonical option:

```bash
wukong -r
wukong --resume <session-id>
```

`-S, --session` remains accepted only for compatibility with older scripts.

## Resume unfinished work

Use `/resume` for Wukong sessions. Name another source only when you want Wukong
to scan that agent's local sessions:

```text
/resume
/resume codex
/resume claude
/resume cursor
/resume kimi
/resume grok
```

External history is imported as read-only context. Wukong does not restart the
other agent, inherit its permissions, replay its old tools, or modify the source
session. You choose whether to continue directly or start an editable Loop goal.

## Use a focused role

Role profiles are experimental. Enable them in `~/.wukong/config.toml`:

```toml
[experimental]
role_profiles = true
```

Then inspect the available roles:

```bash
wukong roles list
wukong roles show security
```

Inside the TUI:

```text
/transform list
/transform security
/transform status
/transform off
```

Roles can select instructions, models, and a narrower tool set. They cannot
expand Wukong's hard safety boundaries.

## Use subagents

Wukong can delegate bounded work without changing the main Loop contract:

```text
/swarm investigate the failing tests and propose independent fixes
/btw explain whether this migration is backward compatible
/tasks
```

- `/swarm <task>` enables swarm mode and starts a task that may delegate work.
- `/btw <question>` opens a forked side agent for a focused question.
- `/tasks` shows background agents and their current state.

Read-only reviewers and strategists remain read-only even when the parent agent
uses Auto or YOLO.

## Choose a permission mode

- **Manual** asks before operations covered by approval rules.
- **Auto** does not ask follow-up approval questions, but blocks workspace
  escapes, sensitive targets, high-risk commands, and unclassified external
  tools.
- **YOLO** skips ordinary approvals, but cannot bypass explicit deny rules,
  safety hooks, plan guards, role limits, or read-only agent limits.

Headless prompt mode defaults to guarded Auto. Dangerous headless execution
requires both flags:

```bash
wukong -p "<task>" --yolo --yes
```

This is syntax only; do not paste it unchanged into a workspace with uncommitted
work. A YOLO prompt may modify files and run commands. `--yes` by itself does
not enable YOLO.

## Local BYOK execution

Every user can run local BYOK Loops without signing in, a Guest trial, or a
monthly allowance. A Loop defaults to 10 iterations; use `--max-iterations` to
set the per-run safety limit. Reviewer step/time limits and `/loop stop` remain
available to prevent runaway API-key use.

```bash
wukong login
wukong logout
```

**Development preview:** logout first attempts remote refresh-token revocation
and then cleans local account credentials. A network, rate-limit, or server
failure is reported as remote state `unknown`, not as confirmed revocation;
local cleanup still proceeds when possible. It does not remove BYOK provider
configuration, and repeating it is safe.

## Advanced diagnostics

`verify`, `scan`, `proof`, and `judge` remain directly executable for diagnosis
and CI. Loop already runs these layers, so they are not separate products. See
the [Command Reference](/commands/#advanced-diagnostics).

## Next steps

- Browse the [Command Reference](/commands/)
- Configure [permissions, roles, Resume, and updates](/configuration/)
- Read [Updates and announcements](/updates-and-announcements/)
