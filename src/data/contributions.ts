// Open-source rows on the home page: one per repo, newest activity first, at most four.
// Live from GitHub at build time; falls back to the committed snapshot when the API fails.
// Text comes from contributions.overrides.json; `what` may wrap code in backticks.
import overrides from './contributions.overrides.json';
import snapshot from './contributions.snapshot.json';
import { fetchPullRequests } from './github-prs.mjs';

interface PullRequest { repo: string; url: string; title: string; status: 'MERGED' | 'OPEN'; date: string }
interface Override { what?: string; why?: string; pin?: string; hide?: boolean }

let data: { prs: PullRequest[]; languages: Record<string, string> };
try {
  data = await fetchPullRequests();
} catch (error) {
  console.warn(`[contributions] GitHub fetch failed (${(error as Error).message}); using snapshot from ${snapshot.fetchedAt}.`);
  data = snapshot as typeof data;
}

const texts = overrides as Record<string, Override>;
const latestByRepo = new Map<string, PullRequest>();
for (const pr of [...data.prs].sort((a, b) => b.date.localeCompare(a.date))) {
  if (!texts[pr.repo]?.hide && !latestByRepo.has(pr.repo)) latestByRepo.set(pr.repo, pr);
}

const month = (iso: string) => new Date(iso).toLocaleString('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

export const contributions = [...latestByRepo].slice(0, 4).map(([repo, latest]) => {
  const override = texts[repo] ?? {};
  const pr = data.prs.find(p => p.url === override.pin) ?? latest;
  return {
    repo,
    language: (data.languages[repo] ?? '').toUpperCase(),
    change: override.what ?? pr.title,
    why: override.why,
    status: pr.status,
    date: month(pr.date),
    url: pr.url,
  };
});
