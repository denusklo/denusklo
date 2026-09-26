// Open-source rows on the home page, in display order. Confirmed by Den 27 Sep 2026.
// `change` may wrap code in backticks; it renders as <code>.
export interface Contribution {
  repo: string;
  language: string;
  change: string;
  why: string;
  status: 'MERGED' | 'OPEN';
  date: string;
  url: string;
}

export const contributions: Contribution[] = [
  {
    repo: 'coder/code-server',
    language: 'TYPESCRIPT',
    change: 'Added a Windows release build: package job, launcher, named-pipe session socket and fixes to the Windows build scripts.',
    why: 'Windows had no code-server build, and tode needed one.',
    status: 'MERGED',
    date: 'SEP 2026',
    url: 'https://github.com/coder/code-server/pull/7987',
  },
  {
    repo: 'coder/code-server',
    language: 'SHELL',
    change: '`npm install` on Windows failed because `mklink` ran without cmd.exe; it now runs through cmd.',
    why: 'Hit it installing on Windows.',
    status: 'MERGED',
    date: 'SEP 2026',
    url: 'https://github.com/coder/code-server/pull/7982',
  },
  {
    repo: 'nedpals/supabase-go',
    language: 'GO',
    change: '`VerifyOtp` sent its credentials in the wrong JSON shape; they are now marshalled properly.',
    why: 'It broke OTP login in my own Supabase-auth project.',
    status: 'MERGED',
    date: 'DEC 2025',
    url: 'https://github.com/nedpals/supabase-go/pull/70',
  },
  {
    repo: 'zenbu-labs/terminal-browser',
    language: 'TYPESCRIPT',
    change: 'Native Windows support for tode.',
    why: 'Wanted tode on Windows.',
    status: 'OPEN',
    date: 'SEP 2026',
    url: 'https://github.com/zenbu-labs/terminal-browser/pull/96',
  },
];
