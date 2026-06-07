# Adding Figure Images - Workflow Guide

**Status:** 163 figures need images as of 2026-06-07  
**Priority Report:** `docs/missing-images-report.csv`

---

## Quick Start

1. Pick a figure from the priority list
2. Source/create the image following guidelines
3. Process the image (ratio, format, style)
4. Add to project and update metadata
5. Validate and commit

For source and license tracking, add each accepted image to `docs/figure-image-sources.md`.

---

## Image Guidelines

### Technical Requirements

**Format:** WEBP (preferred) or JPG  
**Ratio:** 4:5 portrait (preferred) or 3:2 landscape (archival fallback)  
**Max width:** 1200px  
**Quality:** 85  
**Naming:** `<figure-id>.webp` (must match figure ID exactly)

### Visual Style

**Color treatment:**
- Near-monochrome base
- Subtle warm sepia tone  
- Mild contrast increase
- No vivid color boost

**Composition:**
- `object-contain` fit (no aggressive cropping)
- Keep full subject visibility
- Preserve face and identifying features
- Natural background (no artificial replacement)

**Historical authenticity:**
- No face reshaping or beautification
- No modern stylization
- Clean minor dust/noise only
- Preserve factual visual details

---

## Step-by-Step Workflow

### Step 1: Select Figure

Check priority list in `docs/missing-images-report.csv`:

```bash
# View top 20 priority figures
head -21 docs/missing-images-report.csv | column -t -s,
```

**Priority tiers:**
- **High (Score > 100):** Liberation war leaders, landmark figures
- **Medium (Score 50-100):** Political leaders, cultural figures  
- **Low (Score < 50):** Supporting figures, organizations

### Step 2: Source Image

**Public domain sources:**
- Wikimedia Commons
- National Archives of Bangladesh
- Liberation War Museum collections
- Family contributions (with permissions)
- Historical books and publications (public domain)

**Important:**
- Verify copyright status
- Get permissions if needed
- Document source and license/status in `docs/figure-image-sources.md`

### Step 3: Process Image

**Using ChatGPT (Recommended):**

Upload the source image with this prompt:

```
I am uploading a historical figure photo for a website profile page.

Edit this image with the following exact rules:
1) Output ratio: 4:5 portrait. If the source is very wide and portrait crop is not safe, produce a second version in 3:2.
2) Do not crop out the main subject's face or identifying features.
3) Keep full subject visibility preference (object-contain style composition), avoid aggressive zoom.
4) Color treatment: near-monochrome archival look:
   - grayscale base
   - subtle warm sepia tone
   - mild contrast increase
   - no vivid color boost
5) Preserve historical authenticity: no face reshaping, no beautification, no modern stylization.
6) Clean only minor dust/noise artifacts if present; do not alter factual visual details.
7) Keep background natural; do not replace background.
8) Return a web-ready JPG/PNG suitable for profile usage.

Deliver:
- Primary output: 4:5 version
- Optional fallback: 3:2 version (only if needed for composition safety)
```

**Using Sharp (Automated):**

```bash
# Convert to WEBP with proper settings
npx sharp input.jpg -o public/figures/<figure-id>.webp --webp-quality 85
```

**Manual Editing:**
- Use GIMP, Photoshop, or similar
- Follow the visual style guidelines above
- Export as WEBP (85 quality) or JPG (90 quality)

### Step 4: Add to Project

**4.1. Save image file:**

```bash
# Place in public/figures/
cp processed-image.webp public/figures/<figure-id>.webp
```

**4.2. Update metadata (both locales):**

Edit `content/figures/<figure-id>/meta.en.json`:
```json
{
  "name": "Figure Name",
  "role": "Role",
  ...
  "image": "/figures/<figure-id>.webp"
}
```

**4.3. Document source:**

Update `docs/figure-image-sources.md` with the source URL, license/status, and any non-standard processing notes.

Edit `content/figures/<figure-id>/meta.bn.json`:
```json
{
  "name": "ব্যক্তির নাম",
  "role": "ভূমিকা",
  ...
  "image": "/figures/<figure-id>.webp"
}
```

### Step 5: Validate

```bash
# Run content validation
pnpm content:validate

# Check image displays correctly
pnpm dev
# Visit: http://localhost:3000/en/figures/<figure-id>
```

### Step 6: Commit

```bash
git add public/figures/<figure-id>.webp
git add content/figures/<figure-id>/meta.*.json
git commit -m "Add image for <Figure Name>

- Source: [describe source]
- Format: WEBP, 4:5 ratio
- Style: Sepia-toned archival"
```

---

## Batch Processing

For adding multiple images at once:

**1. Organize source images:**
```bash
mkdir /tmp/figure-images-batch
# Add images named: <figure-id>.jpg
```

**2. Batch convert to WEBP:**
```bash
for img in /tmp/figure-images-batch/*.jpg; do
  basename=$(basename "$img" .jpg)
  npx sharp "$img" -o "public/figures/${basename}.webp" --webp-quality 85
done
```

**3. Batch update metadata:**

Use the helper script:
```bash
node scripts/batch-add-image-field.mjs /tmp/figure-images-batch/
```

**4. Validate all:**
```bash
pnpm content:validate
```

---

## Helper Scripts

### Check if figure has image

```bash
figure_id="aak-niazi"
ls public/figures/${figure_id}.* 2>/dev/null && echo "Has image" || echo "No image"
```

### List all figures without images

```bash
node -e "
import { readdir, access } from 'fs/promises';
import { join } from 'path';

const figures = await readdir('content/figures');
for (const fig of figures) {
  try {
    await access(join('content/figures', fig, 'meta.en.json'));
    let found = false;
    for (const ext of ['.webp', '.jpg', '.png', '.svg']) {
      try {
        await access(join('public/figures', fig + ext));
        found = true;
        break;
      } catch {}
    }
    if (!found) console.log(fig);
  } catch {}
}
"
```

---

## Quality Checklist

Before committing, verify:

- [ ] Image file size < 100KB (ideally)
- [ ] Ratio is 4:5 or 3:2
- [ ] Format is WEBP
- [ ] Filename matches figure ID exactly
- [ ] Metadata updated in both EN and BN files
- [ ] Image displays correctly in browser
- [ ] Content validation passes
- [ ] Source documented in commit message

---

## Common Issues

### Image too large
```bash
# Reduce quality or resize
npx sharp input.webp -o output.webp --webp-quality 75
npx sharp input.webp --resize 800 -o output.webp --webp-quality 85
```

### Wrong ratio
```bash
# Resize to 4:5
npx sharp input.jpg --resize '{ "width": 800, "height": 1000, "fit": "cover" }' -o output.webp
```

### Image doesn't display
- Check filename matches figure ID
- Check metadata has correct path: `/figures/<id>.webp`
- Check file actually exists in `public/figures/`
- Clear browser cache

---

## Tracking Progress

**Current status:**
```bash
# Total figures
echo "Total figures: $(ls -1 content/figures | wc -l)"

# With images
node -e "const fs=require('fs'); let n=0; for (const id of fs.readdirSync('content/figures')) { try { const d=JSON.parse(fs.readFileSync(`content/figures/${id}/meta.en.json`,'utf8')); if (d.image) n++; } catch {} } console.log(`With images: ${n}`)"

# Missing
node -e "const fs=require('fs'); let n=0; for (const id of fs.readdirSync('content/figures')) { try { const d=JSON.parse(fs.readFileSync(`content/figures/${id}/meta.en.json`,'utf8')); if (!d.image) n++; } catch {} } console.log(`Missing: ${n}`)"
```

**Update priority report:**
```bash
node scripts/audit-figure-images.mjs
```

If no repo-local audit script exists, regenerate `docs/missing-images-report.csv` by comparing `content/figures/*/meta.en.json` image fields with event `figure-ids.json` usage counts.

---

## Resources

- **Image Guidelines:** `docs/CONTENT_MODEL.md`
- **Figure Schema:** `docs/CONTENT_MODEL.md`
- **Priority List:** `docs/missing-images-report.csv`
- **Source Notes:** `docs/figure-image-sources.md`
- **Validation Script:** `scripts/validate-content.mjs`

---

**Last updated:** 2026-06-07  
**Figures remaining:** 163
