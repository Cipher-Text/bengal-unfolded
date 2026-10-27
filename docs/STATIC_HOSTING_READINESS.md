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
- Resources (`q/category/subcategory/quality/page`), creators (`q/type/category/minResources/page`), and timeline (`q/year/theme/importance/page`) preserve their pre-migration filtering, sorting, and pagination behavior. Event figure listings restore `page`, default invalid/non-positive values to 1, and clamp pages above the end. Compare restores `a/b`, lazily loads selected event details from pre-generated static data, and resets through browser history. Learning paths restores the `mode` filter. Browser tests cover direct query URLs, browser navigation, resets, invalid values, and pagination boundaries in both locales on desktop and mobile Chromium.
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

`.github/workflows/ci.yml` runs on pushes to `main`, pull requests targeting `main`, and manual dispatch. It grants only `contents: read`, installs Node.js 22 and pnpm 10.13.1, uses dependency and Playwright browser caches, applies a 45-minute job timeout, and cancels superseded runs. It runs content validation and figure audit, ESLint, TypeScript, static build and verification, build-size reporting, Playwright against a local HTTP server serving `out/`, and uploads the static artifact and failure reports. It contains no deployment or infrastructure credentials. Browser tests cover localized landing/language switching; direct query URLs, filtering, resets, invalid values, pagination boundaries and history for resources, timeline, compare, creators, learning paths and event figure listings; sitemap; robots; and 404 behavior on desktop and mobile Chromium.

## Build commands

```bash
pnpm install --frozen-lockfile
pnpm run content:validate
pnpm run content:audit:figures
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
pnpm run static:verify
pnpm run build:size
pnpm run test:e2e
```

## Artifact structure

Expected output includes `out/index.html`, `out/404.html`, `out/en/`, `out/bn/`, `out/sitemap.xml`, `out/robots.txt`, `out/_next/static/`, local `public/` assets, and generated PNG social images under `out/og/{locale}/{type}/`. Route directories contain `index.html` due to trailing slash mode.

The earlier pre-Phase-3 local artifact contained 4,184 HTML files and 44,339 files overall, totaling 991,807,802 bytes (946.0 MiB). It consisted of 316.1 MiB HTML, 499.2 MiB Next static navigation `.txt` route payloads, 108.8 MiB social PNGs, and 18.5 MiB WebP images. The sitemap was 1.87 MiB. Compiled JavaScript was 0.71 MiB and CSS was 0.08 MiB.

Phase 3 starting baseline (the Phase 4 before measurement): 4,184 HTML files, 44,682 files overall, 1,030,348,901 bytes (982.7 MiB). HTML was 340,072,392 bytes (324.3 MiB); Next route payloads were 546,855,973 bytes (521.5 MiB); JavaScript was 809,561 bytes (0.77 MiB); CSS was 82,041 bytes (0.08 MiB); image assets were 129,919,238 bytes (123.9 MiB), including 110,306,354 bytes (105.2 MiB) of social PNGs. The 336 static compare data files totaled 3,717,515 bytes in English and 6,463,831 bytes in Bengali. Figure-directory duplication was measurable: Bengali HTML was 1,469,992 bytes (1.40 MiB) with 1,240,724 bytes (1.18 MiB) of route payload; English HTML was 800,583 bytes (0.76 MiB) with 635,731 bytes (0.61 MiB) of route payload. Lossless social PNG recompression reduced 1,440 files from 108.79 MiB to 105.20 MiB, saving 3.60 MiB. No archival photograph was modified.

## Phase 4: static build optimization results

The optimized export still generates 5,963 static pages, 4,184 HTML files, and 44,682 files. Total size is 1,021,970,709 bytes (974.7 MiB), down 8,378,192 bytes (8.0 MiB, 0.81%) from the Phase 3 starting baseline. HTML is 337,922,574 bytes (322.2 MiB), down 2,149,818 bytes (0.63%). The 38,280 Next route payload files total 540,624,974 bytes (515.5 MiB), down 6,230,999 bytes (1.14%). JavaScript is 809,657 bytes (0.77 MiB), CSS is 82,041 bytes (0.08 MiB), and images are 129,921,767 bytes (123.9 MiB), including 110,308,883 bytes (105.2 MiB) of social images. Small generated-image byte differences (+2,529 bytes) are within the social image pipeline; HTML and route payload totals are the measured optimization.

The primary size drivers remain HTML and Next route payloads: together they account for 878,547,548 bytes (about 86% of the export). These files contain server-rendered content and the static RSC/navigation representation needed for client transitions. JavaScript and CSS together are about 0.85 MiB, so client bundles are not the export-size bottleneck. Image files account for 129.9 MB; social PNGs alone account for 110.3 MB. The sitemap is the largest individual file at 1,957,090 bytes (1.87 MiB), followed by Bengali figure directory HTML (1,470,372 bytes) and its largest route payload variants (1,241,064 and 1,215,276 bytes).

Directory page props were narrowed where redundant fields were not used. The compare selector now receives only event slug, year, and title, instead of every field from every event. The timeline client island receives only the event fields used for filtering, cards, and grouping. This retains static server rendering, content summaries for search and SEO, both locales, and URL-driven controls. In Bengali, compare HTML decreased from 1,537,270 to 701,602 bytes (54%); its direct route payload set decreased from 4,149,046 to 1,727,844 bytes (58%). Timeline HTML decreased from 951,630 to 294,903 bytes (69%); its direct route payload set decreased from 2,631,181 to 733,786 bytes (72%). The English pages show the same direction: compare HTML is 443,245 bytes and direct route payloads are 1,020,641 bytes; timeline HTML is 176,309 bytes and direct route payloads are 397,210 bytes. Bengali figure-directory weight remains high (1,470,372 bytes HTML plus 3,714,590 bytes across its eight direct `.txt` route payloads) because its search and result cards use the complete bilingual profile fields.

Repeated result-card links to event, figure, resource, and creator details now opt out of automatic prefetch. The Next.js 16 linking guide notes that static routes are fully prefetched by default and recommends disabling prefetch for large lists. Browser inspection of `/bn/figures/` after the change showed no figure-detail payload requests from its result cards; the remaining route data requests came from shared navigation and locale links. Detail navigation remains available on click. Images continue to use native browser loading through the unoptimized static-image configuration; the initial export uses lazy image loading and reserves dimensions, and the local browser snapshot recorded CLS 0 on all five sampled pages.

Build timing on the local macOS runner was 252.72 seconds wall time (322.56 seconds user CPU, 152.07 seconds system CPU); Next reported 6.1 seconds to compile and 63 seconds to generate all static pages. The remaining duration includes finalization and the existing lossless pass over 1,440 social PNGs. There is no comparable Phase 3 build-duration measurement, so a before/after duration delta cannot be claimed. CI now caches `.next/cache` and captures `/usr/bin/time -v` resource data for each build; future runs can establish a stable duration and peak-memory history.

An unthrottled local Chromium sample recorded LCP / CLS of 356 ms / 0 on `/bn/`, 92 ms / 0 on `/bn/timeline/`, 128 ms / 0 on `/bn/compare/`, 164 ms / 0 on `/bn/figures/`, and 156 ms / 0 on a Bengali event page. These are local smoke measurements, not field Core Web Vitals or before/after LCP comparisons. The server-rendered page weights and browser run support the conclusion that projected props reduced initial document work while preserving the interactive behavior verified by Playwright.

CI `build:size` now compares the export to `scripts/build-size-baseline.json` and emits file counts, total/HTML/RSC/JS/CSS/image bytes and deltas, top-level directory totals, representative HTML raw/gzip and direct route-payload weights, exact duplicate HTML/RSC payload groups, and the 25 largest generated files. The report and build resource report are uploaded as artifacts. No hard threshold is enforced yet; the starting baseline and future reports provide evidence for setting one without masking legitimate content growth.

Phase 4 validation: the production build generated all 5,963 pages; `static:verify` verified 4,184 HTML files, supported content routes, sitemap URLs, internal links/assets, robots, and generated social images. Content validation, figure audit, ESLint, TypeScript, `git diff --check`, and all 36 existing Playwright tests passed across desktop and mobile Chromium. No content model or historical content changed.

Remaining size bottlenecks are the static RSC/navigation representation, repeated locale-specific directory content, social PNGs, and the sitemap. Exact duplicate route payload groups total 235,497,712 bytes of repeated copies in this export; these are emitted at distinct Next route paths for static navigation. Removing them safely would require changing Next's generated route format or host rewrite behavior and could break browser navigation, so no output rewriting was applied. A future option is locally generated responsive/lower-byte social imagery, but it needs a separate metadata and image-quality review because OG dimensions and visual quality are public output.

## Known limitations

- Static hosting cannot add content IDs after deployment; every content change needs a new build and artifact.
- Arbitrary query-driven server rendering is not available. Query-dependent updates happen after hydration in client islands; static HTML retains default content for crawlers and no-JavaScript visitors.
- Browser refreshes on nested routes require the server to serve the corresponding `index.html`; unknown routes should serve `404.html` with an actual 404 status.
- The root handoff uses browser navigation and can briefly show its fallback text when JavaScript is unavailable or the meta refresh is blocked.
- OG images must be regenerated with each content or title update.

## Future deployment prerequisites

Choose a static web server that serves directory `index.html` files, returns `404.html` with status 404, serves PNG and other asset MIME types, applies the redirect table above, and points the canonical host at the exported artifact. Deployment, host configuration, TLS, DNS, and cache policy are outside this repository task.
