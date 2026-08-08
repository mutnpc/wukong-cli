import { execFile } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import assert from 'node:assert/strict';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const script = resolve('scripts/validate-native-release-assets.mjs');
const targets = [
  'linux-x64',
  'linux-arm64',
  'darwin-x64',
  'darwin-arm64',
  'win32-x64',
  'win32-arm64',
];
const tag = 'v0.1.0-rc.1';
const sourceSha = 'a'.repeat(40);
const distributionSha = 'b'.repeat(40);
const websiteSha = 'c'.repeat(40);
const sourceRun = '12345';

async function fixture() {
  const dir = await mkdtemp(join(tmpdir(), 'wukong-native-assets-'));
  const catalog = {
    schemaVersion: 1,
    requestedUrl: 'https://models.dev/api.json',
    sourceUrl: 'https://models.dev/api.json',
    sha256: 'd'.repeat(64),
    bytes: 42,
  };
  const artifacts = [];
  for (const target of targets) {
    const executable = target.startsWith('win32-') ? 'wukong.exe' : 'wukong';
    const content = `fixture-${target}`;
    await writeFile(join(dir, executable), content);
    const filename = `wukong-${target}.zip`;
    await execFileAsync('zip', ['-q', filename, executable], { cwd: dir });
    const zip = await readFile(join(dir, filename));
    const { createHash } = await import('node:crypto');
    const sha256 = createHash('sha256').update(zip).digest('hex');
    await writeFile(join(dir, `${filename}.sha256`), `${sha256}  ${filename}\n`);
    artifacts.push({
      target,
      filename,
      sha256,
      build: {
        schemaVersion: 1,
        target,
        version: '0.1.0-rc.1',
        sourceRepository: 'mutnpc/wukong_cli',
        sourceSha,
        profile: 'release',
        macosSignedAndNotarized: false,
        builtInCatalog: catalog,
      },
    });
    await execFileAsync('rm', [executable], { cwd: dir });
  }
  await writeFile(
    join(dir, 'release-provenance.json'),
    `${JSON.stringify({
      schemaVersion: 1,
      releaseTag: tag,
      version: '0.1.0-rc.1',
      sourceRepository: 'mutnpc/wukong_cli',
      sourceSha,
      workflowRun: `https://github.com/mutnpc/wukong_cli/actions/runs/${sourceRun}`,
      generatedAt: '2026-08-08T00:00:00.000Z',
      publicTruth: {
        distributionRepository: 'mutnpc/wukong-code',
        distributionSha,
        websiteRepository: 'mutnpc/wukong_web',
        websiteSha,
      },
      builtInCatalog: catalog,
      artifacts,
    }, null, 2)}\n`,
  );
  return dir;
}

async function validate(dir) {
  return execFileAsync('node', [
    script,
    dir,
    tag,
    sourceSha,
    sourceRun,
    distributionSha,
    websiteSha,
  ]);
}

test('accepts one exact six-platform prerelease asset identity', async () => {
  const dir = await fixture();
  const { stdout } = await validate(dir);
  assert.match(stdout, /Validated 13 native release assets/u);
});

test('rejects provenance drift before public release mutation', async () => {
  const dir = await fixture();
  const provenancePath = join(dir, 'release-provenance.json');
  const provenance = JSON.parse(await readFile(provenancePath, 'utf8'));
  provenance.sourceSha = 'e'.repeat(40);
  await writeFile(provenancePath, `${JSON.stringify(provenance)}\n`);
  await assert.rejects(validate(dir), /exact release identity/u);
});
