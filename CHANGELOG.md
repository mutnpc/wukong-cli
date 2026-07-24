# Changelog

All notable changes to the public Wukong Code distribution will be documented in
this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [0.0.19] - 2026-07-25

### Added
- Add a TUI Finish Line that confirms Goal, optional Done when, Must not constraints, required project checks, warnings, and the per-run limit before creating a Loop.
- Add headless `--done-when`, repeatable `--constraint` and `--check`, discovered-check decisions, exact Gate/workspace confirmations, and a zero-side-effect `--dry-run`.
- Add local workspace trust-once and remembered grants with list and exact revoke controls.

### Changed
- Freeze project-check command, source locator, definition, order, policy, workspace, and approval digests for each Acceptance Contract.
- Separate durable Gate attempts from terminal run results. Continue creates a new idempotent run; finish-line changes create a revised Goal and contract with lineage.
- Keep Cross-Agent Resume text as an editable objective draft without granting imported commands or acceptance text execution authority.

### Security
- Reject known inline credentials and recognizable destructive or upload commands before persistence or process spawn.
- Fail closed on check definition, policy, workspace, approval, evidence, or replay drift. A PASS terminal must reference one complete local PASS attempt.
- State the remaining boundary clearly: trusted project checks run with the current OS permissions; 0.0.19 does not provide a complete shell sandbox.

Wukong Code 0.0.19 remains free, local-first, and BYOK. Finish Line contracts,
trust grants, exact commands, and evidence metadata stay on the user's machine
and are not uploaded to Wukong Web. This release adds no hosted models,
payments, quota, cloud sync, Verification Skill execution, PR Gate, Team
features, or telemetry storage backend.

## [0.0.18] - 2026-07-22

### Added
- Add bounded, read-only Kimi Code and Grok session discovery to canonical `/resume`.
- Add login-free, explicitly confirmed text-only `/feedback` backed by the Wukong website.
- Restore the authenticated Wukong model catalog contract, returning an honest empty list until hosted models exist.

### Changed
- Keep the default TUI surface focused on Resume → Loop → Gate and expose diagnostics through `/help advanced`.
- Confirm Device Login on the Wukong website with Google or GitHub without collecting credentials in the terminal.
- Preserve BYOK providers and the active BYOK default when the Wukong catalog is empty.

### Security
- Remove feedback archive, log, transcript, prompt, source-code, and local-evidence attachment paths.
- Reject Kimi Code and Grok metadata paths that escape their known local session roots.

Wukong Code 0.0.18 remains free and BYOK. It adds no hosted inference,
payments, monthly Loop quota, Hosted Terminal, cloud sync, or Web/D1 product
telemetry backend.

## [0.0.17] - 2026-07-22

### Changed
- Make `/transform list|status|off` the only TUI Role Profile switch and keep it discoverable with local experimental-feature guidance.
- Align `/export` with the ZIP-exporting CLI command and use explicit `/export-md` for Markdown.
- Reject invalid permission, Loop, Today, roles, and slash-command arguments without changing state or sending them to the model.

### Removed
- Remove the misleading global and Loop `--role` flags and the TUI `/role`, `/report`, and `/yes` aliases.

### Fixed
- Keep unknown, disabled, and unavailable slash commands local, with suggestions, instead of treating them as model prompts.
- Keep headless Loop alive across continuation turns, enforce iteration limits, and make `--every` a cancellable Goal-owned delay without orphan cron work.
- Remove Guest trials, monthly Loop allowances, remote start/complete accounting, and quota-service warnings; keep BYOK execution local with per-run safety controls and crash recovery.
- Reconcile duplicate reviewer blockers safely, reject invalid replacement references, cancel deterministic checks promptly, and detect non-Git workspace changes by content.
- Add regression coverage across command registration, resolution, dispatch, and real CLI boundaries.

### Security
- Bound the fresh read-only reviewer to eight steps or two minutes, keep its tool contract read-only, and propagate cancellation instead of leaving a Loop stuck in CHECK.

Wukong Code 0.0.17 remains free and BYOK. It adds no paid plan, Checkout,
entitlement, hosted execution, managed model credits, or Web/D1 product-metrics
backend.

## [0.0.16] - 2026-07-21

### Added
- Freeze each Loop around a user-owned acceptance contract and carry prior blocking findings across review iterations.
- Detect repeated blocker sets, run one fresh-context read-only strategist, and stop with `NEEDS_WORK/no_progress` when the strategy change does not unblock the Loop.
- Retry invalid reviewer output once and fall back once from an unavailable explicit reviewer model to the writer model, while keeping cancellation and infrastructure failures distinct.
- Add bounded current-workspace Resume suggestions, editable Resume-to-Loop handoff coverage for Codex, Claude Code, and Cursor, and cancellable local prompt search for recent Wukong sessions.
- Add input, output, and capability contracts to Role Profiles.

### Changed
- Make Auto a guarded non-interactive mode and YOLO an explicit approval bypass; headless YOLO now requires `--yolo --yes`.
- Keep one compact background-task count in the footer and retain detailed task control in `/tasks`.

### Security
- Prevent planner, reviewer, strategist, and read-only explorer agents from inheriting Bash, mutating tools, or unclassified custom/MCP capabilities from a more permissive parent.

## [0.0.15] - 2026-07-20

Wukong Code 0.0.15 makes the Loop recoverable across restarts and reliable through completion reporting failures.

### Added
- Add durable local Loop run records and a retryable completion outbox so a network failure or CLI restart does not lose terminal accounting.
- Add startup recovery for active Loops with explicit Resume, End as cancelled, and View details actions.
- Add preflight for model, workspace, objective, active Goal, and project-check discovery before quota reservation.
- Add anonymous install, first-run, Resume, Loop start/iteration/terminal, and 7-day repeat events with `WUKONG_TELEMETRY=0` opt-out.

### Changed
- Reduce the initial TUI to Continue a task, Start a Loop, and Configure model.
- Reduce terminal Loop results to Gate, Iterations, primary Blocker, and Next.
- Show active, stale, completed, cancelled, and abandoned Loop lifecycle states in the Dashboard.
- Keep source code, prompts, transcripts, repository names, paths, model identity, terminal details, locale, and OS version out of product telemetry.

### Fixed
- Keep cancelled and abandoned runs out of PASS / NEEDS_WORK / ERROR outcome counts.
- Return actionable NEEDS_WORK guidance when source changed without project checks, and distinguish unavailable tools from failed code.

## [0.0.14] - 2026-07-18

Wukong Code 0.0.14 makes it easier to continue unfinished work and understand whether a Loop is actually ready to stop.

### Added
- Add `/resume codex`, `/resume claude`, and `/resume cursor` to discover local sessions from supported coding agents and continue them in Wukong through a read-only context handoff.
- Add an explicit Continue / Start Loop choice before importing an external session; the Loop objective remains editable and never starts without confirmation.
- Discover more real project checks in nested workspaces and monorepos.

### Changed
- Make `/resume` show Wukong sessions only. Source-specific compatibility aliases remain available but stay out of the primary command list.
- Replace ambiguous TUI footer text with a clear Gate result, primary blocker, and next action.
- Keep `verify`, `scan`, and `proof` as advanced local diagnostics inside the Loop rather than separate products or quotas.
- Keep the release free and bring-your-own-key. Payments and real Pro entitlements remain deferred to 0.1.0.

### Removed
- Remove the retired cloud report upload, hosted history, quota, and public sharing workflow from the product.

## [0.0.13] - 2026-07-16

Wukong Code 0.0.13 improves the independent review step inside Loop without adding payment or hosted report dependencies.

### Added
- Add structured multi-finding reviews, project-specific rules in `.wukong/review-policy.md`, local finding feedback, and review diagnostics.
- Add an optional independent reviewer model for stronger separation between writing and reviewing.

### Changed
- Keep the release free and bring-your-own-key; payment remains deferred to 0.1.0.

## [0.0.12] - 2026-07-16

Wukong Code 0.0.12 makes Loop the primary delivery workflow: write, run real repository checks, review from a fresh read-only context, and iterate until the result is actionable.

### Added
- Headless `wukong loop <objective>` and interactive `/loop` as the primary delivery workflow: work, real project checks, risk scan, fresh-context read-only review, and iterative repair.
- Durable `PASS` / `NEEDS_WORK` / `ERROR` results with structured blockers, next actions, shared CLI/TUI/SDK semantics, and stable exit codes.
- Nested monorepo check discovery, project-authorized `.wukong/checks.json`, shared workspace snapshots, and stale-conclusion rejection.
- One two-iteration Guest trial and 10 signed-in Free Loop sessions per month with up to five iterations each; internal checks do not count separately.
- Experimental Role Profiles for task-specific writer prompts, model selection, and tool allowlist narrowing.

### Changed
- `verify`, `scan`, and `proof` remain available as advanced diagnostics but are organized as internal Loop layers rather than separate products or quotas.
- Legacy `verify-pass`, `scan-clean`, and `judge-pass` Goal records and flags remain readable and migrate in memory to the unified `proof-pass` gate.
- Evidence remains local and opt-in. 0.0.12 does not automatically persist Loop evidence.

### Fixed
- A Loop can no longer claim success from the writer's self-assessment alone; deterministic blockers cannot be overridden by the reviewer.
- Workspaces that change while checks are running no longer receive stale proof.

## [0.0.11] - 2026-07-13

Wukong Code 0.0.11 improved terminal evidence, release announcements, and Loop status alignment.

### Added
- Non-blocking TUI announcements fetched from `https://wukong.today/cli/announcements.json`. Messages can target client versions and UTC time windows, use `once` / `cooldown` / `always` frequency, and link only to approved Wukong destinations.
- Improved local proof output and diagnostic command ergonomics.
- Kept `wukong today` local and fail-open.

### Changed
- Refined TUI welcome, loop status, proof actions, status tracks, and footer alignment for narrow and wide terminals.
- Reworked the Wukong Dashboard around account, platform, and Loop status.
- Added public documentation for software updates, automatic-update controls, announcement privacy, operator JSON workflow, and version compatibility.

### Fixed
- Announcement network failures remain fail-open and never block the local briefing or TUI startup.
- The public announcement endpoint now ships as cacheable static JSON with a five-minute cache policy and no authentication requirement.

## [0.0.10] - 2026-07-09

### Fixed
- OAuth device-code login now targets `https://wukong.today` (the previous `auth.wukong.today` host had no DNS).
- Accept legacy `oauth/` credential key prefixes so persisted `oauth_host` is not dropped during login.
- Startup no longer warns when refreshing `managed:wukong` models while logged out.
- CLI `--help` documentation link points to `https://docs.wukong.today`.

## [0.0.9] - 2026-07-09

### Added
- `wukong today` Daily Proof Briefing: local verify/scan/proof stats, streak, focus, and next actions. Run `wukong today` or `/today`.
- Authenticated Loop usage and account status endpoints.
- Loop-driven TUI chrome: Claude Code-style borderless editor, loop-phase heartbeat, and verify/proof conclusion tracks.

### Fixed
- Chrome-state no longer treats goal blocked as a verify failure; hydrate keeps the newest stats events; warning/judge mapping matches CLI semantics.
- Nix/SEA Node 26.4.0 build and verification workspace wiring.

## [0.0.8] - 2026-07-08

### Added
- Milestone 0.5 AI Coding Loop control plane: interactive `/loop` for local iteration pacing. The non-interactive driver and cloud `/schedule` remain planned.
- `/loop --every` cron-style scheduler pacing for recurring agent loops.
- Verification layer merge proof and stop conditions for `verify-skill`.

### Changed
- Point CLI default OAuth host and API base URL to `wukong.today`.
- Regenerate web favicon from the Wukong logo.

### Fixed
- Clear all lint warnings and fix latent bugs uncovered by lint (verification double-resolve, jitter hash safety, oauth Set typing).
- Fix Vitest `#/cli/*` alias resolution so the CLI test suite runs green.

## [0.0.7] - 2026-07-03

### Changed
- Point CLI default OAuth host to `wukong.today` so `wukong login` uses the new web device-code flow.

## [0.0.6] - 2026-07-03

### Changed
- Rebrand TUI welcome card to **Wukong Code** with a compact startup layout.
- Simplify platform selector to OAuth-only, removing API-key platform options.

## [0.0.5] - 2026-07-03

### Added
- Native binaries for all six target platforms: macOS Intel (`darwin-x64`), macOS Apple Silicon (`darwin-arm64`), Linux x64, Linux arm64, Windows x64, and Windows arm64.
- POSIX-compatible `install.sh` that auto-detects platform/architecture and downloads the matching release asset.

### Fixed
- Windows native build failures caused by PowerShell interpreting `@wukong` in pnpm filter commands; CI steps now explicitly use `shell: bash`.
- macOS x64 build by cross-compiling on `macos-latest` Apple Silicon runners with a target-architecture Node.js SEA base binary.
- Public release publish job failing due to missing `WUKONG_PUBLIC_RELEASE_TOKEN` repository secret.

## [0.0.1] - 2026-07-03

### Added
- Initial public release of Wukong Code as a terminal AI coding agent.
- Interactive TUI (`wukong`) and one-off prompt mode (`wukong -p`).
- Verification suite: `wukong verify`, `wukong scan`, `wukong guard`.
- Provider management (`wukong provider`) with built-in support for DeepSeek, Moonshot, OpenAI-compatible providers, and more.
- Local web UI (`wukong web`) and REST/WebSocket server (`wukong server`).
- ACP server mode (`wukong acp`), session export, session visualizer, and legacy migration.
- Native binary distribution for macOS, Linux, and Windows.

### Notes
- This public release corresponds to the implementation work in the internal `mutnpc/wukong_cli` repository.
- No API keys are bundled with the binary; users bring their own model provider keys.

---

## Legacy history

### [1.0.0] - 2026-02-03

### Added
- Legacy public release preparation covering login, sync, config, and bug reporting commands.
