---
layout: default
title: Updates and announcements
description: How Wukong Code v0.1.0 checks for updates, upgrades native or package-manager installs, and displays non-blocking TUI announcements.
nav_order: 5
permalink: /updates-and-announcements/
---

# Updates and announcements

Software updates and TUI announcements are separate channels. An announcement
never installs software, and the update channel does not depend on an
announcement.

This page documents the published `v0.1.0` channels. The runtime contains
install-source detection for additional layouts; detection alone does not make
an official distribution channel available.

## Explicit upgrade

Run either command to fetch the latest public version directly:

```bash
wukong upgrade
wukong update
```

The `update` command is an alias. An explicit upgrade does not wait for a staged
startup rollout and does not ask for a second confirmation after the command is
entered.

Current install-source behavior:

| Install source | Explicit upgrade behavior |
|---|---|
| Global npm, pnpm, yarn, or bun | Run the matching update only when the installed version came from a corresponding published package |
| Homebrew | Runtime support can recognize an existing formula, but no official public Wukong formula currently exists; do not present this as an install or upgrade channel |
| Native macOS or Linux binary | Download the platform ZIP and SHA-256, verify it, then atomically replace the binary |
| Native Windows binary | Open or print the current download path when in-place replacement is unavailable |
| Unknown source | Print a safe manual path instead of guessing |

Native automatic upgrade support begins with v0.0.13. A v0.0.12 native binary
requires one installation through the current install script before it can use
the new native upgrade path.

## Startup update check

Interactive startup reads a local cache and refreshes the public version
manifest in the background. Network and manifest failures are fail-open and do
not prevent the TUI from starting.

- Global npm, pnpm, yarn, and bun installations can install updates in the
  background. This is enabled by default.
- Native startup checks report an available release but do not replace the
  installation in the background. The same detection behavior can apply to an
  existing Homebrew layout, but Wukong currently publishes no official formula.
- A successful background installation is reported on the next interactive
  startup with a changelog link.
- Passive startup checks may respect staged rollout metadata. Explicit
  `wukong upgrade` always targets the latest release.

The version manifest is served from `https://wukong.today/latest.json`, with
`/latest` retained as a compatibility fallback.

## Update preferences

Open `/settings` → **Upgrade** in the TUI, or edit `~/.wukong/tui.toml`:

```toml
[upgrade]
auto_install = false
```

`auto_install = false` stops background installation but keeps version checks
and prompts.

To disable the startup update preflight completely:

```bash
export WUKONG_CODE_NO_AUTO_UPDATE=1
```

The legacy `WUKONG_CLI_NO_AUTO_UPDATE` variable is also accepted. These settings
do not disable an explicit `wukong upgrade` command or TUI announcements.

## TUI announcements

After the main TUI mounts, Wukong requests
`https://wukong.today/cli/announcements.json` once per startup.

- The request has a three-second timeout and never blocks terminal input.
- Network failures, non-success responses, invalid JSON, and unsupported schema
  versions are ignored.
- At most one eligible announcement is shown per startup.
- Announcements can target a client version range and a UTC time window.
- `once` appears once per announcement ID on a device.
- `cooldown` may reappear after its configured interval.
- `always` is reserved for active incidents.
- Text is sanitized before terminal rendering.
- Action links are limited to approved Wukong HTTPS destinations.

Only the display timestamp needed for `once` and `cooldown` behavior is stored
locally. The announcement body is not cached.

## Network and privacy

The announcement request does not include a Wukong login token, repository
content, prompts, or personalized query parameters. The server still receives
ordinary HTTPS metadata such as source IP and User-Agent.

The update manifest request likewise contains no repository content. Native
release downloads come from the public `mutnpc/wukong-code` GitHub Release.

## Compatibility

v0.0.10 and earlier use the previous announcement address and cannot read the
current announcement document. They must first upgrade through the independent
version-update channel.

An announcement endpoint must never be the only way users learn about the
release that introduces that endpoint.

## Verify the current release

- Latest version: `https://wukong.today/latest.json`
- Announcements: `https://wukong.today/cli/announcements.json`
- Releases: `https://github.com/mutnpc/wukong-code/releases`
- Changelog: [CHANGELOG.md](../CHANGELOG.md)
