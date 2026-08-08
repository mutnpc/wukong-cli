import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const workflowPath = '.github/workflows/publish-native-prerelease.yml';

test('public repository owns prerelease mutation and attestation with its ephemeral token', async () => {
  const source = await readFile(workflowPath, 'utf8');
  assert.match(source, /permissions:\n  contents: write\n  id-token: write\n  attestations: write/u);
  assert.match(source, /GH_TOKEN: \$\{\{ github\.token \}\}/u);
  assert.doesNotMatch(source, /WUKONG_PUBLIC_RELEASE_TOKEN/u);
  assert.match(source, /actions\/attest-build-provenance@43d14bc/u);
  assert.match(source, /--draft=false --prerelease --latest=false/u);
  assert.match(source, /immutable_policy_verified:/u);
  assert.match(source, /test "\$IMMUTABLE_POLICY_VERIFIED" = "true"/u);
  assert.doesNotMatch(source, /immutable-releases" --jq \.enabled/u);
  assert.match(source, /isImmutable --jq \.isImmutable\)" = "true"/u);
});

test('publication is gated by exact draft bytes and followed by six-platform anonymous smoke', async () => {
  const source = await readFile(workflowPath, 'utf8');
  const validateIndex = source.indexOf('Validate exact draft identity and download all assets');
  const attestIndex = source.indexOf('Attest all six release archives');
  const publishIndex = source.indexOf('Publish once as non-latest immutable prerelease');
  const anonymousIndex = source.indexOf('Re-download and byte-verify every anonymous public asset');
  assert.ok(validateIndex > 0);
  assert.ok(attestIndex > validateIndex);
  assert.ok(publishIndex > attestIndex);
  assert.ok(anonymousIndex > publishIndex);
  assert.match(source, /validate-native-release-assets\.mjs/u);
  assert.match(source, /--json targetCommitish --jq \.targetCommitish/u);
  assert.doesNotMatch(source, /commits\/\$\{RELEASE_TAG\}/u);
  assert.equal((source.match(/target: (?:linux|darwin|win32)-/gu) ?? []).length, 6);
  assert.match(source, /WUKONG_VERSION="\$RELEASE_TAG"/u);
  assert.match(source, /WUKONG_VERSION=v0\.0\.22/u);
  assert.match(source, /Replacement changed existing config/u);
  assert.match(source, /Preserve stable latest after public smoke/u);
});
