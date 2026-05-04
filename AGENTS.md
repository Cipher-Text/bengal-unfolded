<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:multi-agent-content-rules -->
# Multi-Agent Content Consistency Rules

All coding/writing agents (Codex, Claude, Gemini, OpenCode, and similar) must follow:

- `docs/AI_CONTRACT.md`
- `docs/EDITORIAL_RULES.md`
- `docs/CONTENT_MODEL.md`

Hard requirements:

- Do not introduce schema changes without updating:
  - `src/types/content.ts`
  - `scripts/validate-content.mjs`
  - relevant docs (`AI_CONTRACT.md`, `CONTENT_MODEL.md`, `CHANGELOG.md`)
- Do not merge content-field additions unless validation rules are added for those fields.
- For roadmap item completion, update:
  - `docs/ROADMAP.md` checkbox state
  - `docs/CHANGELOG.md` with model/validation/UI/backfill notes
- Always run `pnpm content:validate` before finalizing content-model or content-data changes.
<!-- END:multi-agent-content-rules -->
