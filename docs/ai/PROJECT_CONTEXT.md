# Project Context (AI)

Last verified: 2026-05-08

## What this repository is

Bengal Unfolded is a bilingual historical learning site (English/Bangla) built with Next.js App Router.

- Framework/runtime: Next.js `16.2.4`, React `19.2.4`
- Package manager: `pnpm` (`pnpm@10.13.1` in `packageManager`)
- Languages: TypeScript + JSON content
- Content source: filesystem JSON in `content/` (no DB, no CMS, no API backend)

## Current scope in code

- Locales: `en`, `bn` (`SUPPORTED_LOCALES`)
- Events: 42 slugs in `SUPPORTED_EVENT_SLUGS`
- Figures: 331 figure folders in `content/figures/`
- Resources: 114 resource folders in `content/resources/`
- Periods: 8
- Movements: 5
- Glossary terms: 8

## Important runtime behavior

- Root route `/` redirects to `/bn`.
- Locale pages live under `src/app/[locale]/...`.
- Invalid locale/slug/id paths are rejected with `notFound()`.
- Content is read server-side from local files via `src/lib/content.ts`.

## Infra/deployment reality

- No database/migrations found (`*.sql`, Prisma, migration folders not present).
- No Docker/deployment manifests found in repo root (`Dockerfile`, `docker-compose`, `vercel.json` not present).
- Site metadata points to production origin `https://bengalunfolded.com`.

## AI-agent constraints to honor

From `AGENTS.md`:

- Treat `docs/AI_CONTRACT.md`, `docs/EDITORIAL_RULES.md`, and `docs/CONTENT_MODEL.md` as mandatory.
- For schema/content-model changes: update type definitions, validator, docs, changelog, and run `pnpm content:validate`.
