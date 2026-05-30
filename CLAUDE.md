# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev       # development server at http://localhost:3000
pnpm build     # production build
pnpm start     # serve production build
pnpm lint      # ESLint
```

No test suite exists yet.

## Architecture

**Bengal Unfolded** is a bilingual (English/Bengali) historical storytelling site about key events in Bengal's history (1947–2024). It uses Next.js App Router with a file-based JSON content layer — no database, no CMS, no i18n library.

### Routing

All user-facing routes live under `src/app/[locale]/`. The root `/` redirects to `/en`. Supported locales are `"en"` and `"bn"` (defined in `src/types/content.ts`). The locale layout at `src/app/[locale]/layout.tsx` calls `generateStaticParams()` to pre-render both locales.

Event pages nest under `/[locale]/events/[slug]/` with sub-routes for `/figures/` and `/resources/`. Additional entity routes include:
- `/[locale]/figures/` and `/[locale]/figures/[id]` — figure index and detail pages
- `/[locale]/creators/` and `/[locale]/creators/[id]` — creator index and detail pages (for resource attributions)
- `/[locale]/resources/` and `/[locale]/resources/[id]` — resource index and detail pages
- `/[locale]/books/[id]` — book detail pages
- `/[locale]/topics/` and `/[locale]/topics/[slug]` — topic hub index and detail
- `/[locale]/paths/` and `/[locale]/paths/[slug]` — learning paths index and detail (curated routes through topics)
- `/[locale]/movements/[id]` — movement detail pages
- `/[locale]/periods/[id]` — period detail pages
- `/[locale]/places/` and `/[locale]/places/[id]` — place index and detail pages
- `/[locale]/glossary/` and `/[locale]/glossary/[term]` — glossary index and term pages
- `/[locale]/timeline` — full timeline explorer
- `/[locale]/compare` — event comparison page
- `/[locale]/methodology` — public methodology page

**Entity discovery:**
- Events, figures, books, periods, movements, places: hardcoded in `SUPPORTED_*` constants in `src/types/content.ts`
- Topics, glossary terms: discovered from filesystem via `fs.readdir()`
- Creators: derived from resource attributions (no separate content directory)

### Data layer (`src/lib/content.ts`)

All content lives in `/content/` as JSON files. Every content file has locale variants: `meta.en.json` / `meta.bn.json`. Content is read directly from the filesystem in Server Components — no API routes.

Content hierarchy:
```
content/
  events/<slug>/    meta, timeline, quotes, figure-ids.json, resource-ids.json
  figures/<id>/     meta (people, groups, collectives)
  resources/<id>/   meta (includes books/articles/maps/videos via category/subcategory)
  movements/<id>/   meta (historical movements/themes)
  periods/<id>/     meta (historical periods)
  places/<id>/      meta (geographic locations)
  topics/<slug>/    meta (topic hubs with learning paths)
  glossary/<term>/  meta (terminology definitions)
  site/             home copy
```

**Key patterns:**
- React `cache()` wraps all file readers to deduplicate reads within a render cycle.
- `assertSupportedLocale()`, `assertSupportedEventSlug()`, and the specific ID guards (figure/book) guard against invalid params and throw at the top of page components.
- Normalization functions (`normalizeFigure()`, `normalizeEventResource()`, `normalizeBook()`) handle schema evolution and legacy field migration. When adding new fields, add them here with fallback defaults.
- The comment at line 1204 marks the CMS migration seam: file readers can be swapped for API adapters without changing return types.

**Performance-optimized loaders:**
- `getEventContent()` — Full event data (meta + timeline + figures + resources). Use for event detail pages.
- `getPreviousAndNextEvents()` — Loads only adjacent events for navigation (2 files vs 32). Use instead of `getAllEvents()` for prev/next links.
- `getEventMetaForDisplay()` — Loads only event metadata (title, year, slug) without timeline/figures/resources. Use for hero sections and page metadata when full content isn't needed.
- `creatorsCached()` — Internal Map-based cache for O(1) creator lookups. `getCreatorById()` and `getAllCreators()` use this.

**When to use which loader:**
- Event detail page: `getEventContent()` + `getPreviousAndNextEvents()`
- Figures/resources subpages: `getEventMetaForDisplay()` for hero sections, specific getters for figures/resources
- Metadata generation: `getEventMetaForDisplay()` when only basic event info is needed

Event pages load data with `Promise.all()` for parallel reads. See `docs/CONTENT_MODEL.md` for schema details.

### Fonts

Fonts are loaded via `next/font/google` (self-hosted, optimized):
- **Hind Siliguri** — weights 400, 600; subsets: bengali, latin; variable: `--font-sans`
- **Playfair Display** — weights 400, 600; subsets: latin; variable: `--font-display`
- **Special Elite** — weight 400; subsets: latin; variable: `--font-type`

Font variables are injected on `<html>` via className and referenced in `globals.css` via CSS custom properties. This provides automatic font optimization, subsetting, and eliminates FOUT (Flash of Unstyled Text) while reducing CLS.

### Theming

Theme (light/dark) is stored in `localStorage` and applied via an inline `<script>` injected in the root `layout.tsx` (`themeInitScript`) before React hydrates — this prevents flash. The `data-theme` attribute on `<html>` drives CSS variable switching in `globals.css`. CSS variables (`--bg`, `--fg`, `--gold`, `--green`, `--red`, `--surface`, `--border`, `--muted`) are defined there for both themes.

### Client vs. Server Components

Default to Server Components. The only Client Components are:
- `EventTimeline` — Interactive timeline with load-more functionality
- `ThemeToggle` — reads/writes localStorage and manages theme state
- `ContentDensityControls` — manages reading density preference
- `ShareActions` — handles native share API
- `HeaderScroll` — scroll-based header visibility

Note: `AnimatedContainer` and `LanguageSwitcher` are Server Components using CSS animations and Next.js Link respectively.

### Path aliases

`@/*` resolves to `src/*` (configured in `tsconfig.json`).

### Adding content

**New events:** add slug to `SUPPORTED_EVENT_SLUGS`, create the folder structure under `content/events/<slug>/`, and add a page at `src/app/[locale]/events/[slug]/`.

**New figures:** add a folder under `content/figures/<id>/` with `meta.en.json` and `meta.bn.json`, then add the ID to `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` and to the relevant event's `figure-ids.json`.

**New resources:** same pattern under `content/resources/<id>/`, add ID to event `resource-ids.json`. Use `attribution` and optional `creatorType` (`person` or `organization`) in resource metadata. Creators are auto-derived from resource attributions.

**New topics:** add a folder under `content/topics/<slug>/` with `meta.en.json` and `meta.bn.json`. Topics are filesystem-discovered — no constant registration needed. Include optional `learningPath` array for curated reading sequences.

**New glossary terms:** add a folder under `content/glossary/<term-id>/` with `meta.en.json` and `meta.bn.json`. Glossary terms are filesystem-discovered — no constant registration needed.

**New periods, movements, places, books:** add ID to corresponding `SUPPORTED_*` constant in `src/types/content.ts`, then add content folder and files.

## Documentation

For deeper context:
- `docs/CONTENT_MODEL.md` — Content schema, relationships, and file contracts
- `docs/PROJECT_STRUCTURE.md` — Directory structure overview
- `docs/CHANGELOG.md` — Version history
- `docs/ROADMAP.md` — Future plans
