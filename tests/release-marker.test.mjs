import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, test } from 'node:test';

const script = resolve(import.meta.dirname, '../scripts/write-release-marker.mjs');
const repositoryRoot = resolve(import.meta.dirname, '..');
const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

async function fixture() {
  const directory = await mkdtemp(resolve(tmpdir(), 'wukong-code-release-marker-'));
  temporaryDirectories.push(directory);
  await mkdir(resolve(directory, 'docs'));
  await writeFile(
    resolve(directory, 'CHANGELOG.md'),
    '# Changelog\n\n## [Unreleased]\n\n## [0.1.0-rc.1]\n\n## [0.0.22]\n',
    'utf8',
  );
  return directory;
}

function run(directory, environment = {}) {
  return spawnSync(process.execPath, [script], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      WUKONG_RELEASE_REPOSITORY: 'mutnpc/wukong-code',
      WUKONG_RELEASE_COMMIT_SHA: 'a'.repeat(40),
      ...environment,
    },
  });
}

test('writes a deterministic exact-commit marker for the stable docs channel', async () => {
  const directory = await fixture();
  const result = run(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(await readFile(resolve(directory, 'docs/_release.json'), 'utf8')), {
    version: '0.0.22',
    repository: 'mutnpc/wukong-code',
    commitSha: 'a'.repeat(40),
  });
});

test('fails closed instead of emitting a marker for an invalid commit identity', async () => {
  const directory = await fixture();
  const result = run(directory, { WUKONG_RELEASE_COMMIT_SHA: 'main' });
  assert.notEqual(result.status, 0);
  await assert.rejects(readFile(resolve(directory, 'docs/_release.json'), 'utf8'), {
    code: 'ENOENT',
  });
});

test('fails closed when the deployment repository identity is wrong', async () => {
  const directory = await fixture();
  const result = run(directory, { WUKONG_RELEASE_REPOSITORY: 'mutnpc/wukong_web' });
  assert.notEqual(result.status, 0);
});

test('docs deployment binds the generated marker to the workflow commit before Jekyll', async () => {
  const workflow = await readFile(
    resolve(repositoryRoot, '.github/workflows/docs.yml'),
    'utf8',
  );
  const markerIndex = workflow.indexOf('Generate exact deployment marker');
  const buildIndex = workflow.indexOf('Build with Jekyll');
  assert(markerIndex > 0);
  assert(buildIndex > markerIndex);
  assert.match(workflow, /WUKONG_RELEASE_REPOSITORY: \$\{\{ github\.repository \}\}/u);
  assert.match(workflow, /WUKONG_RELEASE_COMMIT_SHA: \$\{\{ github\.sha \}\}/u);
  assert.match(workflow, /persist-credentials: false/u);
  assert.match(workflow, /- 'CHANGELOG\.md'/u);

  const jekyllConfig = await readFile(resolve(repositoryRoot, 'docs/_config.yml'), 'utf8');
  assert.match(jekyllConfig, /include:\n  - _release\.json/u);
});
