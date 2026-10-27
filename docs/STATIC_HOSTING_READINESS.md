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
- Static output cannot render request-specific query strings. Query state must be read in small Client Components with `useSearchParams()` under Suspense; the Server Component continues to load content and render the page shell and default content. The figures directory now restores `q`, `entity`, `group`, and `page`, including browser history and invalid page clamping. Query result URLs keep the unfiltered canonical URL so filtered variants do not compete in search results.
- Resources (`q/category/subcategory/quality/page`), creators (`q/type/category/minResources/page`), and timeline (`q/year/theme/importance/page`) now use client-side query state under Suspense, retaining the original filtering and ordering rules. Event figure listings restore `page`, default invalid/non-positive values to 1, and clamp pages above the end. Browser tests pass for all four features in English and Bengali, including direct links and history/reset coverage.
- Compare and learning paths remain incomplete. Compare uses `a/b` and fetches selected event details from 168 pre-generated static files per locale instead of embedding all event records in the page. The static files are present, but browser tests still show the default pair on direct query URLs. Learning paths uses `mode`; direct-query initialization also remains on the default state in the browser. Do not treat these two areas as restored yet.
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

`.github/workflows/ci.yml` runs on pushes to `main`, pull requests targeting `main`, and manual dispatch. It grants only `contents: read`, installs Node.js 22 and pnpm 10.13.1, uses dependency and Playwright browser caches, applies a 45-minute job timeout, and cancels superseded runs. It runs content validation and figure audit, ESLint, TypeScript, static build and verification, build-size reporting, Playwright against a local HTTP server serving `out/`, and uploads the static artifact and failure reports. It contains no deployment or infrastructure credentials. The initial browser suite covers localized landing/language switching, figure query filters and browser history, comparison URL parameters, sitemap, robots, and 404 behavior on desktop and mobile Chromium.

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

The measured pre-change local artifact contained 4,184 HTML files and 44,339 files overall, totaling 991,807,802 bytes (946.0 MiB). It consisted of 316.1 MiB HTML, 499.2 MiB Next static navigation `.txt` route payloads, 108.8 MiB social PNGs, and 18.5 MiB WebP images. The sitemap was 1.87 MiB. Compiled JavaScript was 0.71 MiB and CSS was 0.08 MiB.

Latest measured output after the query islands and static compare data: 4,184 HTML files, 44,682 files overall, 1,030,351,914 bytes (982.7 MiB). HTML is 340,072,359 bytes (324.3 MiB); Next route payloads are 546,855,973 bytes (521.5 MiB); JavaScript is 809,579 bytes (0.77 MiB); CSS is 82,041 bytes (0.08 MiB); image assets are 129,922,266 bytes (123.9 MiB), including 110,309,382 bytes (105.2 MiB) of social PNGs. The 336 static compare data files account for 3,717,515 bytes EN and 6,463,831 bytes BN. Figure-directory duplication remains: BN HTML is 1,469,992 bytes (1.40 MiB), BN route payload 1,240,724 bytes (1.18 MiB); EN HTML 800,583 bytes (0.76 MiB), EN route payload 635,731 bytes (0.61 MiB). The client query data increases route sizes, so no further optimization was applied without a measured safe alternative. The 1,440 social PNGs were losslessly recompressed from 108.80 MiB to 105.20 MiB, saving 3.60 MiB. No archival photograph was modified.

Validation at this checkpoint: static build, `static:verify`, content validation, ESLint, TypeScript, and `git diff --check` pass. Playwright has 24 passing and 8 failing cases across desktop/mobile. The failures are direct-query initialization for compare (`a/b`) and learning paths (`mode`) in both locales. Resource, creator, timeline, figure-directory, event-figure pagination, language switching, and static route checks pass.

CI emits a JSON size report with total bytes/files, HTML, Next route payload, JavaScript, CSS, image and social image bytes, and the 20 largest files. Reports are uploaded as workflow artifacts. No threshold is enforced until multiple revision measurements establish a stable baseline.

## Known limitations

- Static hosting cannot add content IDs after deployment; every content change needs a new build and artifact.
- Arbitrary query-driven server rendering is not available. Resources, creators, timeline, and event figure pagination are restored through client islands. Compare and learning-path direct query initialization remain unresolved and are still static migration regressions.
- Browser refreshes on nested routes require the server to serve the corresponding `index.html`; unknown routes should serve `404.html` with an actual 404 status.
- The root handoff uses browser navigation and can briefly show its fallback text when JavaScript is unavailable or the meta refresh is blocked.
- OG images must be regenerated with each content or title update.

## Future deployment prerequisites

Choose a static web server that serves directory `index.html` files, returns `404.html` with status 404, serves PNG and other asset MIME types, applies the redirect table above, and points the canonical host at the exported artifact. Deployment, host configuration, TLS, DNS, and cache policy are outside this repository task.
