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

Event pages nest under `/[locale]/events/[slug]/` with sub-routes for `/figures/` and `/resources/`. Creator and resource detail pages live under `/[locale]/creators/[id]/` and `/[locale]/resources/[id]/`. Supported slugs are hardcoded in `src/types/content.ts` as `SUPPORTED_EVENT_SLUGS`.

### Data layer (`src/lib/content.ts`)

All content lives in `/content/` as JSON files. Every content file has locale variants: `meta.en.json` / `meta.bn.json`. Content is read directly from the filesystem in Server Components — no API routes.

Key patterns:
- React `cache()` wraps all file readers to deduplicate reads within a render cycle.
- `assertSupportedLocale()`, `assertSupportedEventSlug()`, and the specific ID guards (figure/book) guard against invalid params and throw at the top of page components.
- Normalization functions (`normalizeFigure()`, `normalizeEventResource()`, `normalizeBook()`) handle schema evolution and legacy field migration. When adding new fields, add them here with fallback defaults.
- The comment at line ~267 marks the CMS migration seam: file readers can be swapped for API adapters without changing return types.

Content hierarchy:
```
content/
  events/<slug>/   meta, timeline, quotes, figure-ids.json, resource-ids.json
  figures/<id>/    meta (people, groups, collectives)
  resources/<id>/  meta (includes books/articles/maps/videos via category/subcategory)
  site/            home copy
```

Event pages load data with `Promise.all()` for parallel reads (meta + timeline + figures + resources).

### Theming

Theme (light/dark) is stored in `localStorage` and applied via an inline `<script>` injected in the root `layout.tsx` (`themeInitScript`) before React hydrates — this prevents flash. The `data-theme` attribute on `<html>` drives CSS variable switching in `globals.css`. CSS variables (`--bg`, `--fg`, `--gold`, `--green`, `--red`, `--surface`, `--border`, `--muted`) are defined there for both themes.

### Client vs. Server Components

Default to Server Components. The only Client Components are:
- `AnimatedContainer` — Framer Motion scroll-triggered fade-ins
- `ThemeToggle` — reads/writes localStorage
- `LanguageSwitcher` — navigates between `/en/` and `/bn/` paths

### Path aliases

`@/*` resolves to `src/*` (configured in `tsconfig.json`).

### Adding content

New figures: add a folder under `content/figures/<id>/` with `meta.en.json` and `meta.bn.json`, then add the ID to `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` and to the relevant event's `figure-ids.json`.

New resources: same pattern under `content/resources/<id>/`, add ID to event `resource-ids.json`. Use `attribution` and optional `creatorType` (`person` or `organization`) in resource metadata.

New events: add slug to `SUPPORTED_EVENT_SLUGS`, create the folder structure under `content/events/<slug>/`, and add a page at `src/app/[locale]/events/[slug]/`.
