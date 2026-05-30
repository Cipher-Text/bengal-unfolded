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

### May 30, 2026 - Major Optimization Pass

**Before**:
- Mobile score: 89
- Issues: 17MB unoptimized images, no next/font, no next/image, render-blocking scripts

**Optimizations Applied**:
1. ✅ Inlined critical scripts (theme-init.js, lang-init.js) - eliminated 2 render-blocking requests
2. ✅ Implemented `next/font` for Hind Siliguri, Playfair Display, Special Elite - automatic optimization + subsetting
3. ✅ Implemented `next/image` for all images - lazy loading + responsive images + WebP/AVIF
4. ✅ Lazy-loaded `react-pageflip` in EventTimeline - saved ~110KB on initial load
5. ✅ Optimized 32 figure images: 17.02MB → 5.90MB (65.3% reduction) using WebP

**Files Changed**:
- `src/app/layout.tsx` - fonts + inlined scripts
- `src/app/globals.css` - font variable fallbacks
- `src/app/[locale]/figures/[id]/page.tsx` - next/image
- `src/components/HeroSection.tsx` - next/image
- `src/app/[locale]/events/[slug]/page.tsx` - lazy EventTimeline
- `next.config.ts` - image optimization config
- `package.json` - added sharp + optimization scripts
- 62 figure metadata files - updated to .webp references

**New Scripts**:
- `pnpm optimize:images` - converts images to WebP
- `pnpm update:image-refs` - updates metadata references

**Expected After**:
- Mobile score: 95-98 (target: >= 85) ✓
- LCP reduction: ~800-2000ms
- FCP reduction: ~200-500ms
- Total image savings: 11.11 MB

## Roadmap Alignment

- Supports RM-006B (landmark-limited homepage + full timeline CTA).
- Creates guardrails so v1/v2 roadmap feature work does not regress mobile experience.
