// Den's public PRs to other people's repos, fetched from GitHub at build time.
// Shared by src/data/contributions.ts and scripts/refresh-contributions.mjs.
const QUERY = 'is:pr author:denusklo is:public -user:denusklo';

export async function fetchPullRequests() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'denusklo-portfolio' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const get = async url => {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return res.json();
  };

  // ponytail: one search page (100 PRs); only the newest few repos are ever shown.
  const { items } = await get(`https://api.github.com/search/issues?q=${encodeURIComponent(QUERY)}&per_page=100`);
  const prs = items
    .filter(item => item.state === 'open' || item.pull_request?.merged_at)
    .map(item => ({
      repo: item.repository_url.replace('https://api.github.com/repos/', ''),
      url: item.html_url,
      title: item.title,
      status: item.state === 'open' ? 'OPEN' : 'MERGED',
      date: item.pull_request.merged_at ?? item.created_at,
    }));

  const languages = {};
  for (const repo of new Set(prs.map(pr => pr.repo))) {
    languages[repo] = (await get(`https://api.github.com/repos/${repo}`)).language ?? '';
  }
  return { fetchedAt: new Date().toISOString(), prs, languages };
}
