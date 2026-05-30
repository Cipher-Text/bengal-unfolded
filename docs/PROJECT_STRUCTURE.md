# Project Structure

```txt
content/
  site/
    home.en.json
    home.bn.json
  events/
    <event-slug>/
      meta.en.json
      meta.bn.json
      timeline.en.json
      timeline.bn.json
      quotes.en.json
      quotes.bn.json
      figure-ids.json
      resource-ids.json
  figures/
    <figure-id>/
      meta.en.json
      meta.bn.json
  resources/
    <resource-id>/
      meta.en.json
      meta.bn.json
  movements/
    <movement-id>/
      meta.en.json
      meta.bn.json
  periods/
    <period-id>/
      meta.en.json
      meta.bn.json
  places/
    <place-id>/
      meta.en.json
      meta.bn.json
  topics/
    <topic-slug>/
      meta.en.json
      meta.bn.json
  glossary/
    <term>/
      meta.en.json
      meta.bn.json
src/
  app/
    layout.tsx
    page.tsx (root redirect)
    robots.ts
    sitemap.ts
    api/
      og/
        route.tsx (Open Graph image generation)
    [locale]/
      layout.tsx
      page.tsx
      compare/
        page.tsx (event comparison)
      timeline/
        page.tsx
      figures/
        page.tsx
        [id]/page.tsx
      creators/
        page.tsx
        [id]/page.tsx
      resources/
        page.tsx
        [id]/page.tsx
      books/
        [id]/page.tsx
      topics/
        page.tsx
        [slug]/page.tsx
      paths/
        page.tsx (learning paths)
        [slug]/page.tsx
      movements/
        [id]/page.tsx
      periods/
        [id]/page.tsx
      places/
        page.tsx
        [id]/page.tsx
      glossary/
        page.tsx
        [term]/page.tsx
      methodology/
        page.tsx
      events/[slug]/
        page.tsx
        figures/page.tsx
        resources/page.tsx
  components/
    (16 components - see CLAUDE.md for details)
  lib/
    content.ts (main data layer)
    seo.ts (metadata generation)
    figures.ts (figure utilities)
    learning-paths.ts (path resolution)
    event-presentation.ts (display helpers)
    glossary-linking.tsx (auto-linking)
  types/
    content.ts (all type definitions)
docs/
  PROJECT_DETAILS.en.md
  PROJECT_DETAILS.bn.md
  CONTENT_MODEL.md
  PROJECT_STRUCTURE.md
  CHANGELOG.md
  ROADMAP.md
  AI_CONTRACT.md
  EDITORIAL_RULES.md
  EDITORIAL_NEUTRALITY.md
  SENSITIVE_POLITICAL_HISTORY.md
  SOURCE_QUALITY.md
  PERFORMANCE.md
  seo-audit.md
  archive/
    deep-research-report.md
  ai/
  codex-command/
```
