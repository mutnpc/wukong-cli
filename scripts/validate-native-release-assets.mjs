import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const TARGETS = [
  'linux-x64',
  'linux-arm64',
  'darwin-x64',
  'darwin-arm64',
  'win32-x64',
  'win32-arm64',
];

const [assetsArg, releaseTag, sourceSha, sourceRun, distributionSha, websiteSha] =
  process.argv.slice(2);

if (!assetsArg || !releaseTag || !sourceSha || !sourceRun || !distributionSha || !websiteSha) {
  throw new Error(
    'Usage: validate-native-release-assets.mjs <assets-dir> <release-tag> <source-sha> <source-run> <distribution-sha> <website-sha>',
  );
}
if (!/^v\d+\.\d+\.\d+-[0-9A-Za-z.-]+$/.test(releaseTag)) {
  throw new Error(`Expected a v-prefixed prerelease tag, got: ${releaseTag}`);
}
for (const [label, value] of [
  ['source SHA', sourceSha],
  ['distribution SHA', distributionSha],
  ['website SHA', websiteSha],
]) {
  if (!/^[a-f0-9]{40}$/.test(value)) {
    throw new Error(`Expected an exact 40-character ${label}, got: ${value}`);
  }
}
if (!/^[1-9][0-9]*$/.test(sourceRun)) {
  throw new Error(`Expected a numeric source workflow run, got: ${sourceRun}`);
}

const assetsDir = resolve(assetsArg);
const expectedFiles = [
  ...TARGETS.flatMap((target) => [
    `wukong-${target}.zip`,
    `wukong-${target}.zip.sha256`,
  ]),
  'release-provenance.json',
].toSorted();
const actualFiles = (await readdir(assetsDir)).toSorted();
if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
  throw new Error(
    `Release assets must contain exactly 13 files.\nExpected: ${expectedFiles.join(', ')}\nActual: ${actualFiles.join(', ')}`,
  );
}

const provenance = JSON.parse(
  await readFile(resolve(assetsDir, 'release-provenance.json'), 'utf8'),
);
const expectedVersion = releaseTag.slice(1);
const expectedWorkflowRun =
  `https://github.com/mutnpc/wukong_cli/actions/runs/${sourceRun}`;
if (
  provenance.schemaVersion !== 1
  || provenance.releaseTag !== releaseTag
  || provenance.version !== expectedVersion
  || provenance.sourceRepository !== 'mutnpc/wukong_cli'
  || provenance.sourceSha !== sourceSha
  || provenance.workflowRun !== expectedWorkflowRun
  || provenance.publicTruth?.distributionRepository !== 'mutnpc/wukong-code'
  || provenance.publicTruth?.distributionSha !== distributionSha
  || provenance.publicTruth?.websiteRepository !== 'mutnpc/wukong_web'
  || provenance.publicTruth?.websiteSha !== websiteSha
  || !Number.isFinite(Date.parse(provenance.generatedAt))
) {
  throw new Error('release-provenance.json does not match the exact release identity.');
}
if (
  provenance.builtInCatalog?.schemaVersion !== 1
  || typeof provenance.builtInCatalog.requestedUrl !== 'string'
  || typeof provenance.builtInCatalog.sourceUrl !== 'string'
  || !/^[a-f0-9]{64}$/.test(provenance.builtInCatalog.sha256 ?? '')
  || !Number.isInteger(provenance.builtInCatalog.bytes)
  || provenance.builtInCatalog.bytes <= 0
) {
  throw new Error('release-provenance.json is missing the exact built-in catalog identity.');
}
if (!Array.isArray(provenance.artifacts) || provenance.artifacts.length !== TARGETS.length) {
  throw new Error('release-provenance.json must describe exactly six platform artifacts.');
}

for (const target of TARGETS) {
  const filename = `wukong-${target}.zip`;
  const zipPath = resolve(assetsDir, filename);
  const checksumText = await readFile(`${zipPath}.sha256`, 'utf8');
  const zipBytes = await readFile(zipPath);
  const sha256 = createHash('sha256').update(zipBytes).digest('hex');
  if (checksumText !== `${sha256}  ${filename}\n`) {
    throw new Error(`Checksum does not exactly match ${filename}.`);
  }

  const artifact = provenance.artifacts.find((candidate) => candidate.target === target);
  if (
    artifact?.filename !== filename
    || artifact.sha256 !== sha256
    || artifact.build?.schemaVersion !== 1
    || artifact.build?.target !== target
    || artifact.build?.version !== expectedVersion
    || artifact.build?.sourceRepository !== 'mutnpc/wukong_cli'
    || artifact.build?.sourceSha !== sourceSha
    || artifact.build?.profile !== 'release'
    || artifact.build?.macosSignedAndNotarized !== false
    || JSON.stringify(artifact.build?.builtInCatalog) !== JSON.stringify(provenance.builtInCatalog)
  ) {
    throw new Error(`Provenance metadata does not match ${filename}.`);
  }

  const { stdout } = await execFileAsync('unzip', ['-Z1', zipPath]);
  const expectedExecutable = target.startsWith('win32-') ? 'wukong.exe' : 'wukong';
  const entries = stdout.split(/\r?\n/).filter(Boolean);
  if (entries.length !== 1 || entries[0] !== expectedExecutable) {
    throw new Error(`${filename} must contain only ${expectedExecutable}.`);
  }
}

console.log(
  `Validated 13 native release assets for ${releaseTag} from ${sourceSha} (run ${sourceRun}).`,
);
