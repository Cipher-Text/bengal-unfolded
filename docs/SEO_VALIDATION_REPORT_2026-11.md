# SEO Validation Report

Run date: 2026-11-09.

## Repository checks

| Check | Result | Notes |
| --- | --- | --- |
| `pnpm content:validate` | Passed | 168 events validated |
| `pnpm lint` | Passed | ESLint completed successfully |
| Figure content audit | Passed | 552 profiles; zero generic-language flags; zero incomplete SEO profiles; 156 without image assets |
| `pnpm exec tsc --noEmit` | Blocked | Missing `@playwright/test`; stale `.next/dev/types` references missing `src/app/api/og/route.js` |
| `pnpm build` | Blocked | TypeScript phase failed on the same dependency/type issues |
| `pnpm test:e2e` | Blocked | `playwright` executable is unavailable because the declared package is not installed locally |
| `pnpm static:verify` | Not runnable | `out/` was not generated because the build failed |
| GSC row-level analysis | Not available | No raw export is in the repository |
| Google Trends analysis | Not available | No Trends export is in the repository |
| Live slash/robots/sitemap comparison | Not verified locally | DNS/network access to direct production fetches was unavailable |

## Required local recovery sequence

```text
pnpm install --frozen-lockfile
remove the generated .next directory
pnpm content:validate
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm static:verify
pnpm exec playwright install chromium
pnpm test:e2e
```

The generated `.next` directory is build output and should not be treated as source content. No source or historical content was changed as part of this audit.
