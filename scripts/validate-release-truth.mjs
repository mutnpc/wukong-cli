import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readRepositoryFile(path) {
  return readFile(resolve(repositoryRoot, path), 'utf-8');
}

const STABLE_VERSION_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const PRERELEASE_VERSION_PATTERN =
  /^[0-9]+\.[0-9]+\.[0-9]+-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*$/;

const expectedVersionArg = process.argv[2];
const changelog = await readRepositoryFile('CHANGELOG.md');
const stableMatch = changelog.match(/^## \[([0-9]+\.[0-9]+\.[0-9]+)\]/m);
if (stableMatch === null) {
  throw new Error('Could not resolve the latest stable public version from CHANGELOG.md.');
}

const stableVersion = stableMatch[1];
const version = expectedVersionArg ?? stableVersion;
const isStable = STABLE_VERSION_PATTERN.test(version);
const isPrerelease = PRERELEASE_VERSION_PATTERN.test(version);
if (!isStable && !isPrerelease) {
  throw new Error(`Expected a stable or prerelease SemVer version, received: ${version}`);
}

if (isStable && stableVersion !== version) {
  throw new Error(
    `CHANGELOG.md latest stable version is ${stableVersion}, expected ${version}. Update public truth before publishing.`,
  );
}

await validateStableChannel(stableVersion);

if (isPrerelease) {
  await validatePrerelease(version, stableVersion);
  console.log(
    `Prerelease documentation truth is prepared for ${version}; stable remains ${stableVersion}.`,
  );
} else {
  console.log(`Public release truth is aligned at ${version}.`);
}

async function validateStableChannel(versionToValidate) {
  const contracts = [
    {
      file: 'README.md',
      markers: [
        `releases/tag/v${versionToValidate}`,
        `What's new in v${versionToValidate}`,
      ],
    },
    {
      file: 'docs/README.md',
      markers: [
        `current public release, **v${versionToValidate}**`,
        `releases/tag/v${versionToValidate}`,
      ],
    },
    {
      file: 'docs/index.md',
      markers: [
        `Install v${versionToValidate}`,
        `releases/tag/v${versionToValidate}`,
        `v${versionToValidate} release`,
      ],
    },
    {
      file: 'docs/getting-started.md',
      markers: [
        `Wukong Code v${versionToValidate}`,
        `releases/tag/v${versionToValidate}`,
      ],
    },
    {
      file: 'docs/commands.md',
      markers: [`public v${versionToValidate} binary`],
    },
  ];

  for (const contract of contracts) {
    const text = await readRepositoryFile(contract.file);
    for (const marker of contract.markers) {
      if (!text.includes(marker)) {
        throw new Error(`${contract.file} is missing current-release marker: ${marker}`);
      }
    }
  }
}

async function validatePrerelease(prereleaseVersion, stableVersion) {
  const releaseNotesPath = `docs/releases/${prereleaseVersion}.md`;
  const releaseNotes = await readRepositoryFile(releaseNotesPath);
  const prereleaseMarkers = [
    `# Wukong Code ${prereleaseVersion}`,
    `releases/tag/v${prereleaseVersion}`,
    `WUKONG_VERSION=v${prereleaseVersion}`,
    `stable latest remains v${stableVersion}`,
  ];
  for (const marker of prereleaseMarkers) {
    if (!releaseNotes.includes(marker)) {
      throw new Error(`${releaseNotesPath} is missing prerelease marker: ${marker}`);
    }
  }
}
