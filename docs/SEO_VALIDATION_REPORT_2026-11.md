# SEO Validation Report

Run date: 2026-11-09.

## Repository checks

| Check | Result | Notes |
| --- | --- | --- |
| `pnpm content:validate` | Passed | 168 events validated |
| `pnpm lint` | Passed | ESLint completed successfully |
| Figure content audit | Passed | 552 profiles; zero generic-language flags; zero incomplete SEO profiles; 156 without image assets |
| `pnpm exec tsc --noEmit` | Passed | Completed after frozen dependency install and stale build-output cleanup |
| `pnpm build` | Passed | Generated 5,963 static routes; optimized 1,440 social PNGs |
| `pnpm test:e2e` | Passed | 48 tests passed across desktop and mobile Chromium |
| `pnpm static:verify` | Passed | Verified 4,184 HTML files, supported routes, sitemap, robots, internal links/assets, and OG PNGs |
| GSC row-level analysis | Not available | No raw export is in the repository |
| Google Trends analysis | Not available | No Trends export is in the repository |
| Live slash/robots/sitemap comparison | Not verified locally | DNS/network access to direct production fetches was unavailable |

## Recovery performed

```text
pnpm install --frozen-lockfile
move the stale generated .next directory aside
pnpm content:validate
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm static:verify
pnpm exec playwright install chromium
pnpm test:e2e
```

The generated `.next` directory is build output and should not be treated as source content. The resulting export is approximately 961 MB across 44,681 files. No source or historical content was changed as part of the environment repair.
