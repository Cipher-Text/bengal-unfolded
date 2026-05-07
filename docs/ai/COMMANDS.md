# Commands (AI)

Last verified: 2026-05-08

## Core

- `pnpm dev` - start local dev server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm lint` - ESLint checks

## Content integrity

- `pnpm content:validate` - validate content file presence and schema constraints

This is mandatory before finalizing content-model/content-data changes (per `AGENTS.md`).

## Performance checks

- `pnpm lighthouse:mobile`
- `pnpm lighthouse:desktop`

These run Lighthouse against `https://bengalunfolded.com/bn`.

## Useful repo inspection commands

- `rg --files` - list tracked files quickly
- `rg "pattern" src content docs` - fast code/content search
