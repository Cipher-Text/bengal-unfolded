<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:multi-agent-content-rules -->
# Multi-Agent Content Consistency Rules

All coding/writing agents (Codex, Claude, Gemini, OpenCode, and similar) must follow:

- `docs/AI_CONTRACT.md`
- `docs/EDITORIAL_GUIDELINES.md`
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

## Agent Roles

- **Claude is the lead.** It makes the main decisions: scope, architecture, design and editorial calls. It writes the task briefs and reviews all output before commit.
- **Codex is a worker only.** It is a general developer that executes the task it is given, inside the files named in the brief.
- Codex must not, without a Claude decision:
  - change the schema (`src/types/content.ts`, `scripts/validate-content.mjs`) or the rules in `docs/`;
  - add events, figures or resources, or change scope beyond the brief;
  - commit or push.
- Codex reports back what it changed; Claude reviews the diff and runs `pnpm content:validate`, `pnpm lint` and `npx tsc --noEmit` before anything is committed.
- Task prompts for Codex live in `docs/codex-command/`.
