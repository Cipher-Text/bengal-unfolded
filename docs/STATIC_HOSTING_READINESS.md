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
- The resources, creators, timeline, compare, learning-path, and event-figure pages still need the same client-state restoration. Their prior query keys are `q/category/subcategory/quality/page`, `q/type/category/minResources/page`, `q/year/theme/importance/page`, `a/b`, `mode`, and `page` respectively. This is a remaining parity gap.
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

After the figure filter island and image pass, the measured output is 4,184 HTML files and 44,340 files overall, totaling 994,921,552 bytes (948.9 MiB): 317.9 MiB HTML, 503.9 MiB route payloads, 105.2 MiB social PNGs, and 18.5 MiB WebP images. JavaScript is 0.72 MiB and CSS is 0.08 MiB. The 1,440 generated 1200×630 social PNGs were recompressed losslessly from 108.79 MiB to 105.20 MiB, saving 3.60 MiB while preserving dimensions and URLs. The overall artifact increased by 2.97 MiB because the client filtering data adds route payloads; individual figure directory pages are the largest HTML files (1.40 MiB BN and 0.76 MiB EN). The largest archival photograph is 0.78 MiB. No archival photograph was modified.

CI emits a JSON size report with total bytes/files, HTML, Next route payload, JavaScript, CSS, image and social image bytes, and the 20 largest files. Reports are uploaded as workflow artifacts. No threshold is enforced until multiple revision measurements establish a stable baseline.

## Known limitations

- Static hosting cannot add content IDs after deployment; every content change needs a new build and artifact.
- Arbitrary query-driven server rendering is not available. Query state must be restored through client islands; only the figure directory is currently restored.
- Browser refreshes on nested routes require the server to serve the corresponding `index.html`; unknown routes should serve `404.html` with an actual 404 status.
- The root handoff uses browser navigation and can briefly show its fallback text when JavaScript is unavailable or the meta refresh is blocked.
- OG images must be regenerated with each content or title update.

## Future deployment prerequisites

Choose a static web server that serves directory `index.html` files, returns `404.html` with status 404, serves PNG and other asset MIME types, applies the redirect table above, and points the canonical host at the exported artifact. Deployment, host configuration, TLS, DNS, and cache policy are outside this repository task.
