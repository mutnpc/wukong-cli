import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const EXPECTED_REPOSITORY = 'mutnpc/wukong-code';
const EXACT_COMMIT_PATTERN = /^[a-f0-9]{40}$/;

const repository = process.env.WUKONG_RELEASE_REPOSITORY;
const commitSha = process.env.WUKONG_RELEASE_COMMIT_SHA;

if (repository !== EXPECTED_REPOSITORY) {
  throw new Error(
    `WUKONG_RELEASE_REPOSITORY must be ${EXPECTED_REPOSITORY}; received ${repository ?? '<missing>'}.`,
  );
}
if (commitSha === undefined || !EXACT_COMMIT_PATTERN.test(commitSha)) {
  throw new Error('WUKONG_RELEASE_COMMIT_SHA must be an exact lowercase 40-character commit SHA.');
}

const changelog = await readFile('CHANGELOG.md', 'utf8');
const stableMatch = changelog.match(/^## \[([0-9]+\.[0-9]+\.[0-9]+)\]/mu);
if (stableMatch === null) {
  throw new Error('Could not resolve the latest stable version from CHANGELOG.md.');
}

const marker = {
  version: stableMatch[1],
  repository,
  commitSha,
};
const outputPath = process.env.WUKONG_RELEASE_MARKER_PATH ?? 'docs/_release.json';
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(marker, null, 2)}\n`, 'utf8');
console.log(`Wrote exact documentation release marker for ${repository}@${commitSha}.`);
