# Wukong Code

> **Give Wukong a goal. It loops until the change is ready.**

Wukong Code is a terminal AI coding agent built around one workflow:
**Goal → Write → Check → Review → Fix**.

Give `/loop` a goal. Wukong works on the change, runs the repository's real
checks, reviews the result from a fresh read-only context, and fixes blocking
findings against the same goal.

The current release is **[v0.0.19](https://github.com/mutnpc/wukong-code/releases/tag/v0.0.19)**.
It is free and bring-your-own-key (BYOK).

## Why Wukong

- **A Loop that converges**: Wukong keeps the goal and finish condition fixed,
  remembers earlier blockers, and stops with a clear reason when another
  iteration would only repeat the same work.
- **An explicit Finish Line**: review Goal, Done when, Must not constraints,
  real project checks, and the run limit before Wukong creates the Loop.
- **Resume unfinished work**: continue local Codex, Claude Code, Cursor, Kimi Code, or Grok
  sessions without modifying the source session or replaying its old tools.
- **Clear outcomes**: every Loop ends as `PASS`, `NEEDS_WORK`, or `ERROR`, with
  the current blocker and next action.
- **Guarded autonomy**: Auto can work without follow-up approval while staying
  inside workspace and safety boundaries. YOLO remains an explicit bypass and
  cannot expand the permissions of read-only reviewers or strategists.
- **Your model provider**: Wukong uses the model API key and model you configure.
  It does not require a local model.

## Install

### macOS / Linux

```bash
curl -fsSL https://wukong.today/install.sh | sh
```

### Windows

Download the matching Windows ZIP from the
[releases page](https://github.com/mutnpc/wukong-code/releases), extract
`wukong.exe`, and add it to your `PATH`.

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

Or run the Loop directly:

```bash
wukong loop "add input validation to the signup form"
wukong loop "add input validation to the signup form" --dry-run
```

Resume unfinished work from another coding agent:

```text
/resume codex
/resume claude
/resume cursor
/resume kimi
/resume grok
```

Wukong imports the selected session as read-only context. You choose whether to
continue directly or turn it into an editable Loop goal.

## The 0.0.19 explicit Finish Line

Every new TUI Loop first shows a Finish Line with the Goal, optional Done when,
Must not constraints, required project checks, warnings, and per-run iteration
limit. Starting the Loop freezes those checks with their source and definition
so an agent cannot silently weaken the Gate.

Headless users can inspect the same proposal with `--dry-run`, then confirm the
exact warning, Gate approval, and workspace trust digests. Continuing a terminal
run creates a new traceable run under the unchanged contract; changing the
finish line creates a revised Loop.

Trusted project checks execute with the current operating-system permissions.
Wukong blocks known inline secrets and recognizable destructive or upload
commands before spawn, but does not claim a complete shell sandbox.

## The Loop

Each Loop keeps one user-owned target:

1. Write the change.
2. Run the repository's available checks.
3. Review from a fresh read-only context.
4. Fix blocking findings against the same goal.
5. Pass, stop with a clear blocker, or report an execution error.

If the same blocker survives repeated reviews, Wukong tries one fresh read-only
strategy. If that still makes no progress, it returns
`NEEDS_WORK/no_progress` instead of spending the remaining iterations blindly.

Loop exit codes are `PASS=0`, `NEEDS_WORK=1`, `ERROR=2`, and interruption `=130`.

## Roles (experimental)

Wukong includes role profiles for focused tasks and supports user-defined roles.
Enable `experimental.role_profiles` in `~/.wukong/config.toml`, then use:

```bash
wukong roles list
wukong roles show security
```

Inside the TUI, use `/transform list`, `/transform security`, `/transform status`,
and `/transform off` to inspect, switch, check, and reset the active role. A role
may narrow tools and behavior, but it cannot expand Wukong's hard safety
boundaries.

## Primary commands

| Command | Description |
|---|---|
| `wukong` | Launch the interactive TUI |
| `wukong -p <prompt>` | Run one non-interactive prompt |
| `wukong provider` | Configure model providers and models |
| `wukong loop <goal>` | Review a Finish Line, then run write → check → review → fix |
| `wukong login` | Sign in through Device Login for account features |
| `wukong roles list` | List built-in and user-defined role profiles |
| `wukong review init` | Create `.wukong/review-policy.md` |
| `wukong guard` | Inspect the command risk guard |
| `wukong doctor` | Validate local configuration |
| `wukong upgrade` | Upgrade a native installation |

Inside the TUI, `/loop` and `/resume` are the primary workflow. `/login` opens
the Wukong website for Google or GitHub confirmation; the current Wukong model
catalog can be empty and never replaces a BYOK default. `verify`,
`scan`, `proof`, and `judge` remain available as advanced diagnostics and Loop
layers; they are not separate products or separate quotas.

Run `wukong --help` for the complete command and option list.

## Local BYOK and privacy

Every user can run local BYOK Loops without signing in, a Guest trial, or a
monthly allowance. The default per-run limit is 10 iterations and can be
changed with `--max-iterations`; reviewer limits and `/loop stop` remain local
safety controls. Anonymous metrics respect `WUKONG_TELEMETRY=0` and never gate
execution.

There is no public paid plan, Checkout, hosted report workflow, or managed model
credit in v0.0.19.

`/feedback` is login-free and sends only the exact text fields shown for
confirmation. It never attaches logs, prompts, transcripts, source code, file
paths, or local evidence.

Anonymous product events are limited to installation, first run, Device Login,
and Loop lifecycle state. They never include source code, prompts, transcripts,
repository names, or file paths. Set `WUKONG_TELEMETRY=0` to opt out.

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
