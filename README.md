# Wukong Code

> **Give Wukong a goal. It loops until the change is ready.**

Wukong Code is a terminal AI coding agent built around one workflow:
**Goal → Write → Check → Review → Fix**.

The current release is
**[v0.1.0](https://github.com/mutnpc/wukong-code/releases/tag/v0.1.0)**.
It is free and bring-your-own-key (BYOK).

The default install sections below describe that stable binary. The immutable
[`v0.1.0-rc.1`](https://github.com/mutnpc/wukong-code/releases/tag/v0.1.0-rc.1)
prerelease remains available as the candidate evidence snapshot. Check
`wukong --version` when exact installed behavior matters.

Version 0.1.0 is scoped to one controllable, recoverable, explainable local
Loop. The development source now implements enforceable provider-call/token
limits, a versioned no-check decision, pre-existing-versus-Wukong file
attribution, terminal usage/next actions, and automated compatibility/release
smoke coverage, and those contracts pass local automation. The immutable
`0.1.0-rc.1` prerelease has passed six-platform build, public-asset,
checksum/provenance, pinned fresh-install, `0.0.22` upgrade, and state-recovery
verification. Real repository/source flows and first-user/cohort evidence
continue after release without a fixed 14-day wait. Full multi-layer coverage schema replacement,
direct-shell content/PATH attestation, and a provider pricing database are
deferred.

## Why Wukong

- **Loop until ready** — keep one goal and Finish Line fixed while Wukong
  writes, checks, reviews, and fixes.
- **Run repository checks** — use the project's available tests, type checks,
  lint, build, and review policy.
- **Review complete evidence** — preserve distinct risk findings across files,
  lines, and evidence locations.
- **Resume unfinished work** — continue local Wukong, Codex, Claude Code,
  Cursor, Kimi Code, or Grok sessions as read-only imported context.
- **Return clear outcomes** — a completed Gate ends as `PASS`, `NEEDS_WORK`,
  or `ERROR`; `/loop stop` and a headless interruption before a Gate verdict
  are `STOPPED_BY_USER`.
- **Use your model provider** — configure the API key and model you want.

## What's new in v0.1.0

Version `0.1.0` stabilizes the Trusted Local Loop while retaining the provider
catalog fallback and CLI controls from `0.0.22`:

- provider discovery falls back from the maintained catalog to models.dev;
- the source contains an offline snapshot path, but the official v0.0.22 native
  archives omitted it because of a release-profile defect; see the release
  notes before relying on fully offline provider discovery;
- `-r, --resume` is the canonical CLI session-resume option;
- help distinguishes guarded Auto, YOLO, Plan, headless `--yes`, and added
  workspace access.

## Install

### macOS / Linux

```bash
curl -fsSL https://wukong.today/install.sh | sh
```

### Windows

Download the matching Windows ZIP from the
[v0.1.0 release](https://github.com/mutnpc/wukong-code/releases/tag/v0.1.0),
extract `wukong.exe`, and add it to your `PATH`.

Verify the installation:

```bash
wukong --version
```

Upgrade an existing native installation:

```bash
wukong upgrade
```

## Quick start

Configure a model provider and start the TUI:

```bash
wukong provider
wukong
```

Start a Loop inside the TUI:

```text
/loop add input validation to the signup form
```

For headless use, review the dry-run and add its exact **Headless start flags**
to the same command. Missing decisions fail closed:

```bash
wukong loop "add input validation to the signup form" --dry-run
```

**Development preview:** before a Loop starts, one Preflight summary shows the
Goal, Done when, Must not rules, exact checks, review criteria, Writer/Reviewer,
sanitized provider origin, pre-existing Git changes, permission mode, outbound
scope and payload limits, approval order, terminal handling, and iteration
limit, provider-call ceiling, and optional token budget. Local read, provider
transmission, permission, and project-check execution remain separate security
approvals. Cancelling creates no run or provider call. A versioned no-check
decision can cover eligible documentation/configuration work; source changes
without required checks fail closed as `NEEDS_WORK/checks_missing`.

Resume local work from another coding agent:

```text
/resume codex
/resume claude
/resume cursor
/resume kimi
/resume grok
```

Imported session history is read-only context. Wukong checks the current
workspace again before continuing.

## The Loop

Each Loop keeps one user-owned target:

1. Write the change.
2. Run the repository's available checks.
3. Review from a fresh read-only context.
4. Fix blocking findings against the same goal.
5. Pass, stop with a clear blocker, or report an execution error.

### Development preview: result handling

A terminal summary separates decisive evidence, pre-existing changes,
Wukong-touched/added/deleted files, unknown attribution, checks,
calls/tokens/retries/remaining budget, the primary blocker, and the safe Next
action. A source change without required executable checks cannot return
`PASS`; an eligible versioned no-check decision remains explicit and auditable.
After `PASS`, inspect the diff and any non-blocking findings before delivery.
TUI Ctrl-C or `/loop pause` is resumable `PAUSED`; `/loop stop` and a headless
interruption are `STOPPED_BY_USER`, not Gate verdicts. If a result reports
`provider_outcome_unknown`, reconcile its request ID/idempotency key with the
provider logs or billing before any retry and never resume blindly.

Only a final durable `loop.result` maps `PASS=0`, `NEEDS_WORK=1`, and `ERROR=2`
to a Gate verdict. Headless SIGINT exits `130` as a lifecycle interruption. A
successful dry-run or another command exiting `0` is not `PASS`.

## Primary commands

| Command | Description |
|---|---|
| `wukong` | Launch the interactive TUI |
| `wukong -p <prompt>` | Run one non-interactive prompt; ordinary success is not a Loop `PASS` |
| `wukong provider` | Configure model providers and models |
| `wukong loop <goal>` | Run write → check → review → fix |
| `wukong review init` | Create `.wukong/review-policy.md` |
| `wukong guard` | Inspect the command risk guard |
| `wukong login` | Connect an optional Wukong account |
| `wukong logout` | Development preview: revoke the optional account session and remove local account credentials |
| `wukong doctor` | Validate local configuration |
| `wukong upgrade` | Upgrade a native installation |

Run `wukong --help` for the complete command and option list.

**Development preview:** `wukong logout` and TUI `/logout` first try to revoke
the stored refresh token at the configured OAuth host, then continue local
account cleanup. Only a confirmed response is reported as remotely revoked.
Network, rate-limit, or server failures leave remote state `unknown`, while
local cleanup still completes when possible. Repeating logout is safe and does
not delete the user's BYOK provider configuration.

## Local data and privacy

Loop contracts, run state, evidence, findings, and imported session context stay
on the local machine. `/feedback` sends only the text fields shown for
confirmation. Model requests use the provider configured by the user.

## Documentation

Full documentation: [docs.wukong.today](https://docs.wukong.today)

- [Getting started](./docs/getting-started.md)
- [Command reference](./docs/commands.md)
- [Configuration](./docs/configuration.md)
- [Updates and announcements](./docs/updates-and-announcements.md)
- [Changelog](./CHANGELOG.md)

## Support

- Website: [wukong.today](https://wukong.today)
- Issues: [github.com/mutnpc/wukong-code/issues](https://github.com/mutnpc/wukong-code/issues)
- Email: [support@wukong.today](mailto:support@wukong.today)

## License

This is proprietary software. See [LICENSE.md](./LICENSE.md).
