import { writeFileSync } from 'node:fs';
import { fetchPullRequests } from '../src/data/github-prs.mjs';

const data = await fetchPullRequests();
writeFileSync(new URL('../src/data/contributions.snapshot.json', import.meta.url), JSON.stringify(data, null, 2) + '\n');
console.log(`Snapshot written: ${data.prs.length} PRs across ${Object.keys(data.languages).length} repos.`);
