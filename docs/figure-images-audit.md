# Figure Images Audit Report

**Date:** 2026-06-07  
**Status:** Current after key-figure image backfill

---

## Executive Summary

- **Total figures:** 547
- **Coverage:** 384/547 figures have images (70.2%)
- **Missing:** 163/547 figures still need images (29.8%)
- **Storage:** 16.8 MB across 383 files
- **Data integrity:** No orphaned images, broken references, invalid paths, or locale mismatches

---

## Image Inventory

### By Format

| Format | Count | Percentage | Notes |
| --- | ---: | ---: | --- |
| WEBP | 380 | 99.2% | Preferred optimized format |
| SVG | 3 | 0.8% | Organization/alliance marks |

**Total:** 383 files, 16.8 MB

---

## Coverage Analysis

### Figures With Images: 384 (70.2%)

Images follow the convention:

```text
public/figures/<figure-id>.<ext>
```

Metadata references use:

```json
{
  "image": "/figures/<figure-id>.webp"
}
```

Set the same image path in both:

```text
content/figures/<figure-id>/meta.en.json
content/figures/<figure-id>/meta.bn.json
```

### Figures Without Images: 163 (29.8%)

The current priority list is maintained in:

```text
docs/missing-images-report.csv
```

Top current gaps by event usage:

| Rank | Figure ID | Name | Event Count |
| ---: | --- | --- | ---: |
| 1 | `all-india-muslim-league` | All-India Muslim League | 6 |
| 2 | `indian-national-congress` | Indian National Congress | 6 |
| 3 | `islam-khan-chishti` | Islam Khan Chishti | 4 |
| 4 | `nusrat-shah` | Nusrat Shah | 4 |
| 5 | `ashrafuzzaman-khan` | Ashrafuzzaman Khan | 3 |
| 6 | `chand-rai` | Chand Rai | 3 |
| 7 | `chowdhury-mueen-uddin` | Chowdhury Mueen Uddin | 3 |
| 8 | `kedar-rai` | Kedar Rai | 3 |
| 9 | `krishnachandra-ray-of-nadia` | Krishnachandra Ray of Nadia | 3 |
| 10 | `lakshmana-sena` | Lakshmana Sena | 3 |

---

## Metadata Consistency

### Healthy Metrics

- **Zero broken image references** — every declared `image` path exists in `public/`.
- **Zero orphaned image files** — every `public/figures/*` image stem maps to an existing figure ID.
- **Zero locale mismatches** — EN and BN metadata point to the same image path where images exist.
- **Zero invalid paths** — all current image references use public-root absolute paths.

### Recent Backfill

On 2026-06-07, images were added for 10 high-priority key figures:

```text
aak-niazi
akbar
atisha-dipankara-srijnana
daud-khan-karrani
haji-shariatullah
ishwar-chandra-vidyasagar
jahangir-mughal
manabendra-narayan-larma
raja-rammohun-roy
sam-manekshaw
```

Source and license notes for those additions are recorded in:

```text
docs/figure-image-sources.md
```

---

## Recommendations

### Priority 1: Continue High-Usage Missing Images

Use `docs/missing-images-report.csv` and prioritize figures with the highest event counts first. For organizations and parties, use only clearly licensed logos/marks or historically appropriate public-domain source material.

### Priority 2: Keep Source Notes Current

For each new image batch, update `docs/figure-image-sources.md` with:

- figure ID
- source URL
- license/status noted at source
- processing notes, if different from the standard workflow

### Priority 3: Validate After Every Batch

Run:

```bash
pnpm content:validate
```

This catches broken image references, invalid paths, missing required fields, and relation issues.

---

## Image Guidelines

Per `docs/CONTENT_MODEL.md` and `docs/ADDING_FIGURE_IMAGES.md`:

- **Ratio:** 4:5 portrait preferred; 3:2 archival fallback when portrait composition is unsafe.
- **Format:** WEBP preferred.
- **Color:** Near-monochrome with subtle warm sepia.
- **Fit:** Preserve full subject visibility; avoid aggressive cropping.
- **Authenticity:** No face reshaping, beautification, invented portraits, or modern stylization.

---

## Appendix: Figure Image Discovery

Images are referenced in figure metadata and discovered at runtime:

```typescript
// content/figures/<id>/meta.en.json and meta.bn.json
{
  "name": "Sheikh Mujibur Rahman",
  "image": "/figures/sheikh-mujibur-rahman.webp"
}
```

The UI renders images when:

1. `image` exists in metadata.
2. The referenced file exists under `public/`.
3. The display context renders figure images.

---

**Report generated:** 2026-06-07  
**Validation:** `pnpm content:validate`
