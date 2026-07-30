# Wukong Code

> **Give Wukong a goal. It loops until the change is ready.**

Wukong Code is a terminal AI coding agent built around one workflow:
**Goal → Write → Check → Review → Fix**.

The current release is
**[v0.0.21](https://github.com/mutnpc/wukong-code/releases/tag/v0.0.21)**.
It is free and bring-your-own-key (BYOK).

## Why Wukong

- **Loop until ready** — keep one goal and Finish Line fixed while Wukong
  writes, checks, reviews, and fixes.
- **Run repository checks** — use the project's available tests, type checks,
  lint, build, and review policy.
- **Review complete evidence** — preserve distinct risk findings across files,
  lines, and evidence locations.
- **Resume unfinished work** — continue local Wukong, Codex, Claude Code,
  Cursor, Kimi Code, or Grok sessions as read-only imported context.
- **Return clear outcomes** — every Loop ends as `PASS`, `NEEDS_WORK`, or
  `ERROR`.
- **Use your model provider** — configure the API key and model you want.

## What's new in v0.0.21

Version `0.0.21` improves Loop evidence integrity:

- distinct occurrences of the same built-in risk now reach the reviewer
  separately;
- each occurrence receives a stable identity derived from its risk kind,
  severity, message, file, line, and evidence;
- exact duplicate input remains deterministic and can still be deduplicated;
- deterministic Gate failures keep priority over reviewer output.

## Install

### macOS / Linux

```bash
curl -fsSL https://wukong.today/install.sh | sh
```

### Windows

Download the matching Windows ZIP from the
[v0.0.21 release](https://github.com/mutnpc/wukong-code/releases/tag/v0.0.21),
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

Or run the Loop directly:

```bash
wukong loop "add input validation to the signup form"
wukong loop "add input validation to the signup form" --dry-run
```

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

Loop exit codes are `PASS=0`, `NEEDS_WORK=1`, `ERROR=2`, and interruption `=130`.

## Primary commands

| Command | Description |
|---|---|
| `wukong` | Launch the interactive TUI |
| `wukong -p <prompt>` | Run one non-interactive prompt |
| `wukong provider` | Configure model providers and models |
| `wukong loop <goal>` | Run write → check → review → fix |
| `wukong review init` | Create `.wukong/review-policy.md` |
| `wukong guard` | Inspect the command risk guard |
| `wukong login` | Connect an optional Wukong account |
| `wukong doctor` | Validate local configuration |
| `wukong upgrade` | Upgrade a native installation |

Run `wukong --help` for the complete command and option list.

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
