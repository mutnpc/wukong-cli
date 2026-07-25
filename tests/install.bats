#!/usr/bin/env bats

setup() {
    TEST_DIR="$(mktemp -d)"
    export TEST_DIR
    export HOME="$TEST_DIR/home"
    mkdir -p "$HOME"

    # Put mock commands ahead of system PATH
    MOCK_BIN="$TEST_DIR/bin"
    mkdir -p "$MOCK_BIN"
    export PATH="$MOCK_BIN:$PATH"

    # Default mock uname reports macOS x86_64
    cat > "$MOCK_BIN/uname" <<'EOF'
#!/bin/sh
case "$1" in
    -s) echo "Darwin" ;;
    -m) echo "x86_64" ;;
    *) echo "unknown" ;;
esac
EOF
    chmod +x "$MOCK_BIN/uname"

    # Mock curl: fails GitHub API calls and writes release assets locally.
    cat > "$MOCK_BIN/curl" <<'EOF'
#!/bin/sh
OUTPUT=""
URL=""
while [ $# -gt 0 ]; do
    case "$1" in
        -o) shift; OUTPUT="$1" ;;
        -*) ;;
        *) URL="$1" ;;
    esac
    shift
done

echo "$URL" >> "$TEST_DIR/curl.log"

if echo "$URL" | grep -q "api.github.com"; then
    echo 'GitHub API rate limit exceeded' >&2
    exit 22
fi

if echo "$URL" | grep -q "/download/"; then
    if echo "$URL" | grep -q "\.sha256$"; then
        python3 - "$OUTPUT" <<'PY'
import hashlib, pathlib, sys
out = pathlib.Path(sys.argv[1])
archive = pathlib.Path(str(out).removesuffix('.sha256'))
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
out.write_text(f'{digest}  {archive.name}\n')
PY
        exit 0
    fi
    python3 - "$OUTPUT" <<'PY'
import sys, zipfile, os
out = sys.argv[1]
with zipfile.ZipFile(out, 'w') as z:
    z.writestr('wukong', '#!/bin/sh\necho "wukong stub"\n')
    z.writestr('wukong.exe', '@echo off\necho wukong stub\r\n')
os.chmod(out, 0o644)
PY
    exit 0
fi

exit 1
EOF
    chmod +x "$MOCK_BIN/curl"
}

teardown() {
    rm -rf "$TEST_DIR"
}

@test "installs the latest release without calling the rate-limited GitHub API" {
    run ./install.sh
    [ "$status" -eq 0 ]
    [ -x "$HOME/.wukong/bin/wukong" ]
    [[ "$output" == *"latest"* ]]
    [[ "$output" == *"wukong-darwin-x64"* ]]
    [[ "$output" == *"Verified SHA-256"* ]]
    grep -q "/releases/latest/download/wukong-darwin-x64.zip" "$TEST_DIR/curl.log"
    grep -q "/releases/latest/download/wukong-darwin-x64.zip.sha256" "$TEST_DIR/curl.log"
    ! grep -q "api.github.com" "$TEST_DIR/curl.log"
}

@test "fresh installer pins the 0.0.15 candidate when explicitly requested" {
    WUKONG_VERSION=v0.0.15 run ./install.sh
    [ "$status" -eq 0 ]
    [[ "$output" == *"v0.0.15"* ]]
    grep -q "/releases/download/v0.0.15/wukong-darwin-x64.zip" "$TEST_DIR/curl.log"
    [ -x "$HOME/.wukong/bin/wukong" ]
}

@test "respects WUKONG_INSTALL_DIR override" {
    CUSTOM_DIR="$TEST_DIR/custom/bin"
    export WUKONG_INSTALL_DIR="$CUSTOM_DIR"
    run ./install.sh
    [ "$status" -eq 0 ]
    [ -x "$CUSTOM_DIR/wukong" ]
}

@test "does not create an install identity or send install telemetry" {
    run ./install.sh
    [ "$status" -eq 0 ]
    ! grep -q "telemetry-logs.wukong.today/v1/event" "$TEST_DIR/curl.log"
    [ ! -e "$HOME/.wukong/device_id" ]
    [ ! -e "$HOME/.wukong/install_first_run_pending" ]
}

@test "fails on unsupported platform" {
    cat > "$MOCK_BIN/uname" <<'EOF'
#!/bin/sh
case "$1" in
    -s) echo "FreeBSD" ;;
    -m) echo "x86_64" ;;
esac
EOF
    chmod +x "$MOCK_BIN/uname"

    run ./install.sh
    [ "$status" -eq 1 ]
    [[ "$output" == *"Unsupported platform"* ]]
}

@test "fails on unsupported architecture" {
    cat > "$MOCK_BIN/uname" <<'EOF'
#!/bin/sh
case "$1" in
    -s) echo "Darwin" ;;
    -m) echo "riscv64" ;;
esac
EOF
    chmod +x "$MOCK_BIN/uname"

    run ./install.sh
    [ "$status" -eq 1 ]
    [[ "$output" == *"Unsupported architecture"* ]]
}

@test "prints PATH hint when install dir is not on PATH" {
    run ./install.sh
    [ "$status" -eq 0 ]
    [[ "$output" == *"Add the following to your shell profile"* ]]
}

@test "does not print PATH hint when install dir is already on PATH" {
    export PATH="$HOME/.wukong/bin:$MOCK_BIN:/usr/bin:/bin"
    run ./install.sh
    [ "$status" -eq 0 ]
    [[ "$output" != *"Add the following to your shell profile"* ]]
}

@test "selects the published windows x64 asset name" {
    cat > "$MOCK_BIN/uname" <<'EOF'
#!/bin/sh
case "$1" in
    -s) echo "MINGW64_NT-10.0" ;;
    -m) echo "x86_64" ;;
esac
EOF
    chmod +x "$MOCK_BIN/uname"

    run ./install.sh
    [ "$status" -eq 0 ]
    [[ "$output" == *"wukong-win32-x64.zip"* ]]
    [ -x "$HOME/.wukong/bin/wukong.exe" ]
}

@test "selects the published windows arm64 asset name" {
    cat > "$MOCK_BIN/uname" <<'EOF'
#!/bin/sh
case "$1" in
    -s) echo "MSYS_NT-10.0" ;;
    -m) echo "arm64" ;;
esac
EOF
    chmod +x "$MOCK_BIN/uname"

    run ./install.sh
    [ "$status" -eq 0 ]
    [[ "$output" == *"wukong-win32-arm64.zip"* ]]
    [ -x "$HOME/.wukong/bin/wukong.exe" ]
}
