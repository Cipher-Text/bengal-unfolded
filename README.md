# Bengal Unfolded

Bilingual static historical storytelling website (`EN`/`BN`) built with Next.js App Router.

## Tech stack
- Next.js (App Router, static generation)
- TypeScript
- Tailwind CSS
- Framer Motion
- JSON content files

## Run locally
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
pnpm start
```

## Content
- Home: `content/site/home.en.json`, `content/site/home.bn.json`
- Events: `content/events/<slug>/*.json`

## Add new event
1. Add slug in `src/types/content.ts`.
2. Create locale JSON files under `content/events/<slug>/`.
3. Run `pnpm build`.

## Future backend migration
Keep UI/pages unchanged and swap data provider inside `src/lib/content.ts` to Strapi, Payload, Directus, or PostgreSQL.
