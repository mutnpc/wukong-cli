---
layout: default
title: Wukong Code Documentation
description: Install and use Wukong Code v0.1.0, a local BYOK AI coding loop with real repository checks, fresh review, and deterministic Gate outcomes.
nav_order: 1
permalink: /
---

# Give Wukong a goal. It loops until the change is ready.

{: .fs-6 .fw-300 }
Wukong Code is a terminal AI coding agent built around one workflow:
**Goal → Write → Check → Review → Fix**.

[Install v0.1.0](#install){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Download Wukong Code](https://wukong.today/download){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View the release](https://github.com/mutnpc/wukong-code/releases/tag/v0.1.0){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## One workflow

{: .note }
> **Loop until ready** — `/loop` works on one goal, runs the repository's real
> checks, reviews from a fresh read-only context, and fixes blocking findings.

{: .note }
> **Stop instead of drift** — v0.1.0 keeps the goal fixed, remembers earlier
> blockers, and stops with a clear reason when another iteration would repeat
> the same work.

{: .note }
> **Resume unfinished work** — continue local Codex, Claude Code, Cursor, Kimi Code, or Grok
> sessions without modifying the source session or replaying old tools.

{: .note }
> **Experimental roles and subagents** — after explicitly enabling
> `experimental.role_profiles`, transform Wukong for focused work, delegate an
> independent task, and inspect background agents without creating a second
> workflow. They are not part of the default command surface.

{: .note }
> **BYOK** — choose your provider and model API. Wukong does not require a local
> model. Device Login is optional and does not gate local Loops.

## Install

macOS and Linux:

```bash
curl -fsSL https://wukong.today/install.sh | sh
wukong --version
```

Windows users can download the matching x64 or ARM64 ZIP from the
[release page](https://github.com/mutnpc/wukong-code/releases/tag/v0.1.0).
Download the adjacent `.sha256` file too, then follow the exact verification,
extraction, and `PATH` steps in [Getting Started](/getting-started/#windows).

## Start a Loop

```bash
# Start the TUI
wukong

# Or preview a headless Loop; then add its exact Headless start flags
wukong loop "finish the current change" --dry-run
```

Inside the TUI:

```text
/provider
/loop add input validation to the signup form
/resume codex
/resume kimi
```

Every completed Gate finishes as `PASS`, `NEEDS_WORK`, or `ERROR`. TUI Ctrl-C or
`/loop pause` is resumable `PAUSED`; `/loop stop` or a headless interruption
before a Gate verdict is reported separately as `STOPPED_BY_USER`. Start with the
[Getting Started guide](/getting-started/) or browse the
[Command Reference](/commands/).

## Current product boundary

The v0.1.0 release keeps local Loops free and bring-your-own-key, without
a Guest trial, sign-in requirement, or monthly account limit. The default
per-run safety limit is 10 iterations and can be changed explicitly. There is
no public paid plan, Checkout, hosted report workflow, hosted inference, or managed model credit.
