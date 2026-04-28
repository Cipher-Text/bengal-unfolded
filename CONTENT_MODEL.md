# Content Model

Static JSON now, adapter-based backend later.

Types: `HomeContent`, `EventMeta`, `TimelineItem`, `Hero`, `Resource`, `Quote`, `EventContent`.

Future migration: replace `src/lib/content.ts` filesystem reads with Strapi/Payload/Directus/PostgreSQL adapters while preserving function signatures.
