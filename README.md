# Wukong CLI

Wukong CLI is a powerful terminal tool that helps you interact with [Wukong](https://wukong.today) directly from your command line. Sync your data, manage your workflow, and stay productive — all without leaving your terminal.

Learn more in the [official documentation](https://docs.wukong.today).

---

## Get Started

### Installation

**npm (Recommended):**

```bash
npm install -g @wukong.today/wukong-cli
```

**Homebrew (macOS/Linux):**

```bash
brew install wukong-cli
```

**Verify installation:**

```bash
wukong --version
```

### Quick Start

1. **Login to your account:**

   ```bash
   wukong login
   ```

2. **Sync your data:**

   ```bash
   wukong sync --pull
   ```

3. **Start interactive mode:**

   ```bash
   wukong
   ```

---

## Commands

| Command | Description |
|---------|-------------|
| `wukong` | Launch interactive mode |
| `wukong login` | Authenticate with your Wukong account |
| `wukong logout` | Sign out of your account |
| `wukong sync` | Sync data with Wukong cloud |
| `wukong config` | Manage CLI configuration |

For a full list of commands:

```bash
wukong --help
```

---

## Configuration

Wukong CLI stores configuration in `~/.wukong/config.json`. You can also set environment variables:

| Variable | Description |
|----------|-------------|
| `WUKONG_API_KEY` | Your API key for authentication |
| `WUKONG_ENDPOINT` | Custom API endpoint (optional) |

---

## Reporting Bugs

We welcome your feedback! Use the `/bug` command to report issues directly within Wukong CLI, or file a [GitHub issue](https://github.com/mutnpc/wukong-cli/issues).

```bash
wukong bug
```

---

## Connect with Us

- **Website:** [wukong.today](https://wukong.today)
- **Documentation:** [docs.wukong.today](https://docs.wukong.today)
- **Discord:** [Join our community](https://discord.gg/wukong)
- **Email:** support@wukong.today

---

## Data Collection &amp; Privacy

When you use Wukong CLI, we collect usage data to improve the product experience. This includes:

- Command usage statistics
- Error reports and crash logs
- Performance metrics

We do **not** collect:

- Your personal files or code content
- Passwords or sensitive credentials
- Data that you explicitly mark as private

For more details, see our [Privacy Policy](https://wukong.today/privacy).
