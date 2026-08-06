import { readFile } from 'node:fs/promises';

const expectedVersionArg = process.argv[2];
const changelog = await readFile('CHANGELOG.md', 'utf-8');
const latestMatch = changelog.match(/^## \[([0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?)\]/m);
if (latestMatch === null) {
  throw new Error('Could not resolve the latest public version from CHANGELOG.md.');
}

const version = expectedVersionArg ?? latestMatch[1];
if (latestMatch[1] !== version) {
  throw new Error(
    `CHANGELOG.md latest version is ${latestMatch[1]}, expected ${version}. Update public truth before publishing.`,
  );
}

const contracts = [
  {
    file: 'README.md',
    markers: [
      `releases/tag/v${version}`,
      `What's new in v${version}`,
    ],
  },
  {
    file: 'docs/README.md',
    markers: [`current public release, **v${version}**`, `releases/tag/v${version}`],
  },
  {
    file: 'docs/index.md',
    markers: [`Install v${version}`, `releases/tag/v${version}`, `v${version} release`],
  },
  {
    file: 'docs/getting-started.md',
    markers: [`Wukong Code v${version}`, `releases/tag/v${version}`],
  },
  {
    file: 'docs/commands.md',
    markers: [`public v${version} binary`],
  },
];

for (const contract of contracts) {
  const text = await readFile(contract.file, 'utf-8');
  for (const marker of contract.markers) {
    if (!text.includes(marker)) {
      throw new Error(`${contract.file} is missing current-release marker: ${marker}`);
    }
  }
}

console.log(`Public release truth is aligned at ${version}.`);
