# Figure Images Audit Report

**Date:** 2026-06-14  
**Status:** Current after key-figure image backfill

---

## Executive Summary

- **Total figures:** 554
- **Coverage:** 392/554 figures have images (70.8%)
- **Missing:** 162/554 figures still need images (29.2%)
- **Storage:** 18.0 MB across 391 files
- **Data integrity:** No orphaned images, broken references, invalid paths, or locale mismatches

---

## Image Inventory

### By Format

| Format | Count | Percentage | Notes |
| --- | ---: | ---: | --- |
| WEBP | 386 | 98.7% | Preferred optimized format |
| SVG | 5 | 1.3% | Organization/alliance marks |

**Total:** 391 files, 18.0 MB

---

## Coverage Analysis

### Figures With Images: 392 (70.8%)

Images follow the convention:

```text
public/figures/<figure-id>.<ext>
```

Metadata references use:

```json
{
  "image": "/figures/<figure-id>.<ext>"
}
```

Set the same image path in both:

```text
content/figures/<figure-id>/meta.en.json
content/figures/<figure-id>/meta.bn.json
```

### Figures Without Images: 162 (29.2%)

The current priority list is maintained in:

```text
docs/missing-images-report.csv
```

Top current gaps by event usage:

| Rank | Figure ID | Name | Event Count |
| ---: | --- | --- | ---: |
| 1 | `nusrat-shah` | Nusrat Shah | 4 |
| 2 | `ashrafuzzaman-khan` | Ashrafuzzaman Khan | 3 |
| 3 | `chand-rai` | Chand Rai | 3 |
| 4 | `chowdhury-mueen-uddin` | Chowdhury Mueen Uddin | 3 |
| 5 | `kedar-rai` | Kedar Rai | 3 |
| 6 | `krishnachandra-ray-of-nadia` | Krishnachandra Ray of Nadia | 3 |
| 7 | `lakshmana-sena` | Lakshmana Sena | 3 |
| 8 | `major-ma-manzur` | Major M. A. Manzur | 3 |
| 9 | `mukunda-ray-of-bhusna` | Mukunda Ray of Bhusna | 3 |
| 10 | `musa-khan` | Musa Khan | 3 |

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

On 2026-06-14, images were added for four additional high-priority missing key figures:

```text
all-india-muslim-league
indian-national-congress
islam-khan-chishti
shaista-khan
```

The 2026-06-14 backfill was extended with four more high-priority missing key figures:

```text
asaduzzaman-khan-kamal
nawab-abdul-latif
rao-farman-ali
syed-ameer-ali
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
