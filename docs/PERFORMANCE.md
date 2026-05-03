# Performance Guardrails

Scope: preserve current Bengal Unfolded design direction while improving mobile performance, especially for `/bn`.

## Targets (Lighthouse + CWV)

- Route: `https://bengalunfolded.com/bn`
- Mobile Lighthouse performance: target `>= 85`
- Desktop Lighthouse performance: target `>= 95`
- LCP: target `<= 2.5s`
- CLS: target `<= 0.1`
- INP: target `<= 200ms`

## Run Commands

- `pnpm build`
- `pnpm lighthouse:mobile`
- `pnpm lighthouse:desktop`

## Route Rendering Rules

- Keep `/[locale]` static-first (SSG) unless a feature explicitly requires runtime rendering.
- Keep interactive client islands small and localized.
- Default new components to Server Components.

## Client Component Policy

- Use `"use client"` only for true browser interactivity (state, events, browser APIs).
- Avoid wrapping static content with client-only animation wrappers.
- Dynamically import heavy/below-the-fold client components.

## Image Policy

- Use `next/image` for content images when present.
- Always provide stable sizing (`width`/`height` or `fill` + fixed container).
- Lazy-load non-critical images.
- Use `priority` only for the true above-the-fold LCP image.

## Font Policy

- Use `next/font` for primary Bangla/English fonts.
- Keep global font set minimal.
- Use `display: swap`.

## JavaScript Policy

- Avoid introducing new animation/UI libraries into the initial homepage path without clear need.
- Remove unused dependencies from `package.json`.
- Prefer CSS transitions/animations for simple effects.

## Measurement Log

Record date and results after each optimization pass:

```txt
Date:
Route:
Mobile score:
Desktop score:
LCP:
CLS:
INP/TBT:
Notes:
```

## Roadmap Alignment

- Supports RM-006B (landmark-limited homepage + full timeline CTA).
- Creates guardrails so v1/v2 roadmap feature work does not regress mobile experience.
