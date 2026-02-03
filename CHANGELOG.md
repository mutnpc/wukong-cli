# Changelog

All notable changes to Wukong CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Initial public release preparation

---

## [1.0.0] - 2026-02-03

### Added
- `wukong login` - Authenticate with your Wukong account
- `wukong logout` - Sign out of your account
- `wukong sync` - Sync data with Wukong cloud
  - `--pull` flag for pulling remote data
  - `--push` flag for pushing local changes
- `wukong config` - Manage CLI configuration
- `wukong bug` - Report bugs directly from CLI
- Interactive mode with `wukong` command
- Environment variable support for configuration
- Cross-platform support (macOS, Linux, Windows)

### Security
- Secure credential storage using system keychain
- API key encryption at rest

---

<!-- 
Template for future releases:

## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Vulnerability fixes
-->
