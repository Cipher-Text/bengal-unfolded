# Figure Images Audit Report

**Date:** 2026-05-31  
**Status:** Analysis Complete

---

## Executive Summary

- **Total figures:** 584
- **Coverage:** 287/584 figures have images (49.1%)
- **Storage:** 20 MB across 373 files
- **Data integrity:** ✅ No orphaned images
- **Issues:** ⚠️ 24 broken metadata references

---

## Image Inventory

### By Format

| Format | Count | Percentage | Avg Size | Notes |
|--------|-------|------------|----------|-------|
| JPG | 277 | 74.3% | ~60 KB | Legacy format |
| WEBP | 92 | 24.7% | ~40 KB | Modern, optimized |
| PNG | 1 | 0.3% | ~50 KB | Rare |
| SVG | 3 | 0.8% | Variable | Organizations |

**Total:** 373 files, 20 MB

---

## Coverage Analysis

### Figures with Images: 287 (49.1%)

All images follow naming convention: `public/figures/<figure-id>.<ext>`

### Figures Without Images: 297 (50.9%)

Missing images primarily for:
- 2024 anti-discrimination movement coordinators
- Historical organizations and collectives
- Some liberation war figures
- Pakistan-era political figures

---

## Metadata Consistency

### ✅ Healthy Metrics
- **Zero orphaned images** — Every file in `public/figures/` matches a valid figure ID
- **Consistent naming** — All files use kebab-case matching figure IDs
- **No duplicate extensions** — Each figure has only one image format

### ⚠️ Issues Found

**24 Broken Image References**

These figures have `"image"` field in metadata pointing to non-existent files:

```
k-m-obaidur-rahman
kazi-arif-ahmed
m-hamidullah-khan
major-ma-manzur
major-rafiqul-islam
mk-bashar
mofazzal-haider-chaudhury
muhammad-kamaruzzaman
mujibul-haque-chunnu
nawab-ali-chowdhury
nizamul-huq-judge
rafiq-uddin-ahmed
rokeya-kabir
salahuddin-quader-chowdhury
selina-parvin
shafiur-rahman
shah-ams-kibria
shah-azizur-rahman
shahidullah-kaiser
shamsur-rahman
sheikh-fazlul-haque-moni
siraj-sikder
syed-amir-ali
syed-shamsul-haq
```

---

## Metadata Statistics

- **Figures with `image` field:** 398 (68.2%)
- **Figures without `image` field:** 120 (20.5%)
- **Broken references:** 24 (4.1%)
- **Valid references:** 374 (64.0%)

**Note:** Some figures have `image` field but file doesn't exist (broken refs). Others exist as files but metadata is missing (need metadata update).

---

## Recommendations

### Priority 1: Fix Broken References (24 figures)

**Option A - Remove broken references:**
```bash
# For each figure in the list above, edit both meta files:
# content/figures/<figure-id>/meta.en.json
# content/figures/<figure-id>/meta.bn.json
# Remove the "image" field
```

**Option B - Add missing images:**
```bash
# Source and add images for the 24 figures listed above
# Follow guidelines in docs/CONTENT_MODEL.md
```

### Priority 2: Optimize Image Formats (277 JPG files)

Convert JPG to WEBP for better performance:

```bash
pnpm optimize:images
```

**Expected benefit:**
- 30-50% file size reduction
- Faster page loads
- Better mobile performance

### Priority 3: Increase Coverage (297 missing)

Target order:
1. **Landmark figures** (liberation war leaders, language movement martyrs)
2. **Major figures** (political leaders, cultural icons)
3. **High-importance figures** (coordinators, organizers)
4. **Supporting figures** (organizations, collectives)

---

## Image Guidelines

Per `docs/CONTENT_MODEL.md`:

### Technical Specs
- **Ratio:** 4:5 portrait (preferred) or 3:2 landscape (archival)
- **Format:** WEBP (preferred) or JPG
- **Color:** Near-monochrome with subtle warm sepia
- **Fit:** `object-contain` (no cropping)

### Metadata Pattern
```json
{
  "image": "/figures/<figure-id>.webp"
}
```

Set in **both** `meta.en.json` and `meta.bn.json`.

### Storage Location
```
public/figures/<figure-id>.webp
```

---

## Data Validation

Run content validation after making changes:

```bash
pnpm content:validate
```

This will catch:
- Broken image references
- Invalid file paths
- Missing required fields

---

## Next Steps

1. **Immediate:** Fix 24 broken references (remove field or add images)
2. **Week 1:** Convert high-traffic figure JPGs to WEBP
3. **Ongoing:** Add images for missing figures (prioritize by importance)
4. **Monthly:** Re-run this audit to track progress

---

## Appendix: Figure Image Discovery Process

Images are referenced in figure metadata and discovered at runtime:

```typescript
// In content/figures/<id>/meta.en.json and meta.bn.json
{
  "id": "sheikh-mujibur-rahman",
  "name": "Sheikh Mujibur Rahman",
  "image": "/figures/sheikh-mujibur-rahman.webp",
  // ... other fields
}
```

The UI renders images only when:
1. `image` field exists in metadata
2. File exists at the specified path
3. Display context supports images (detail pages only, not cards)

---

**Report generated:** 2026-05-31  
**Audit script:** `/tmp/analyze-figures.sh`
