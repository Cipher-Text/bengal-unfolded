# Static Hosting Readiness

## Architecture

The App Router is built with Next.js 16 `output: "export"`. Server Components read the repository's JSON content during `next build`; each locale and content entity is written as HTML and static route data under `out/`. `trailingSlash: true` produces directory-style routes. Next Image is configured as unoptimized, so its existing dimensions, responsive CSS, lazy loading, and browser-native image requests remain in place without the Next image server. `generateBuildId` uses the CI commit SHA (or a stable local fallback) so repeat builds of one revision use a consistent build identifier.

The root route is a static Bengali handoff to `/bn/`. Content pages remain bilingual and retain their canonical URLs, language alternates, JSON-LD, sitemap and robots metadata. Article and figure share cards use deterministic `/og/{locale}/{type}/{slug}.png` URLs, generated for the known content IDs at build time by a parameterized GET route handler. `src/app/api/og` has been removed.

## Compatibility blockers found and resolved

- The prior `next.config.ts` redirects cannot be used by static export. Their mapping is documented below for the later web server configuration.
- The root route used `redirect()`, which cannot emit a static redirect response. It now emits static HTML with a zero-delay browser handoff and a visible link.
- The dynamic `/api/og` handler read request query parameters and rendered images at runtime. It is replaced with generated routes for event and figure IDs in both locales.
- Next Image's default optimizer requires a server. `images.unoptimized` allows the current local image files to be served directly.
- Dynamic pages are enumerated from supported locale and content ID lists or from content directory APIs. Unknown IDs continue to reach `notFound()` during the build for generated pages; unknown paths are handled by the exported `404.html`.
- Query-driven pages (`figures`, `resources`, `creators`, `timeline`, `compare`, `paths`, and event figure lists) previously read `searchParams` in server page functions. Those reads have been removed so Next can emit their static default pages. Static export cannot render per-request query strings, and client-side filter state has not yet replaced the old server behavior. Search, filters, comparison selection, pagination, and query-specific `noindex` metadata on these pages therefore do not retain their prior query-driven behavior in this migration and need a client-side implementation before claiming full feature parity.
- `next/font/google` is used for the site UI. Next downloads and bundles those fonts at build time; CI therefore needs network access to Google Fonts unless the fonts are later vendored locally.

## Static route coverage

The `[locale]` layout enumerates `en` and `bn`. Detail pages enumerate all supported event slugs, figure IDs, topic slugs, resource IDs, glossary term IDs, creator IDs, place IDs, period IDs, movement IDs, and learning path slugs. Event subpages enumerate each event slug in both locales. OG routes enumerate every supported event and figure in both locales.

The `static:verify` script checks the exported root, 404, localized landing pages, every supported content route and sitemap URL in both locales, both event subpages for every event, robots, compiled assets, internal HTML links/assets, SEO tags, and 1200×630 PNG signatures for every event and figure social image. It also catches stale in-content route links; the migration fixed the stale event and topic links it surfaced without changing historical claims.

## Legacy redirect mapping

Static export does not process these. Configure them in the future static web server or edge layer:

| Source | Destination | Status |
| --- | --- | --- |
| `/{locale}/heroes` | `/{locale}/figures/` | 301 |
| `/{locale}/heroes/{id}` | `/{locale}/figures/{id}/` | 301 |
| `/{locale}/events/{slug}/heroes` | `/{locale}/events/{slug}/figures/` | 301 |
| `https://www.bengalunfolded.com/{path}` | `https://bengalunfolded.com/{path}` | 301 |

The patterns preserve the locale, entity ID, event slug, and remaining path. Production URL policy remains unchanged.

## CI pipeline

`.github/workflows/ci.yml` runs on pushes to `main`, pull requests targeting `main`, and manual dispatch. It grants only `contents: read`, installs Node.js 22 and pnpm 10.13.1, uses the pnpm lockfile cache, installs frozen dependencies, runs content validation and the figure audit, runs ESLint and TypeScript, builds `out/`, verifies it, and uploads the complete folder as a 14-day GitHub Actions artifact. It contains no deployment or infrastructure credentials.

## Build commands

```bash
pnpm install --frozen-lockfile
pnpm run content:validate
pnpm run content:audit:figures
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
pnpm run static:verify
```

## Artifact structure

Expected output includes `out/index.html`, `out/404.html`, `out/en/`, `out/bn/`, `out/sitemap.xml`, `out/robots.txt`, `out/_next/static/`, local `public/` assets, and generated PNG social images under `out/og/{locale}/{type}/`. Route directories contain `index.html` due to trailing slash mode.

The verified local artifact contains 4,184 HTML files, 1,440 social PNGs, and about 1.0 GB across 44,339 files. CI artifact download and future hosting storage should account for this size.

## Known limitations

- Static hosting cannot add content IDs after deployment; every content change needs a new build and artifact.
- Arbitrary query-driven server rendering is not available. The pages listed above require browser-side filtering and comparison state to regain their prior query controls.
- Browser refreshes on nested routes require the server to serve the corresponding `index.html`; unknown routes should serve `404.html` with an actual 404 status.
- The root handoff uses browser navigation and can briefly show its fallback text when JavaScript is unavailable or the meta refresh is blocked.
- OG images must be regenerated with each content or title update.

## Future deployment prerequisites

Choose a static web server that serves directory `index.html` files, returns `404.html` with status 404, serves PNG and other asset MIME types, applies the redirect table above, and points the canonical host at the exported artifact. Deployment, host configuration, TLS, DNS, and cache policy are outside this repository task.
