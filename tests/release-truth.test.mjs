import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const script = resolve(import.meta.dirname, '../scripts/validate-release-truth.mjs');

test('validates repository truth independently of the caller working directory', () => {
  const result = spawnSync(process.execPath, [script, '0.1.1'], {
    cwd: tmpdir(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Public release truth is aligned at 0\.1\.1\./u);
});
