#!/usr/bin/env node
/**
 * Batch Add Image Field to Metadata
 *
 * For a set of figure images, automatically adds the "image" field
 * to both EN and BN metadata files.
 *
 * Usage: node scripts/batch-add-image-field.mjs <images-directory>
 * Example: node scripts/batch-add-image-field.mjs /tmp/new-images/
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const FIGURES_DIR = "./content/figures";

async function addImageField(figureId, imageExt) {
  const imagePath = `/figures/${figureId}${imageExt}`;
  let updated = 0;

  for (const locale of ["en", "bn"]) {
    const metaPath = join(FIGURES_DIR, figureId, `meta.${locale}.json`);

    try {
      const content = await readFile(metaPath, "utf8");
      const data = JSON.parse(content);

      // Add or update image field
      const hadImage = !!data.image;
      data.image = imagePath;

      // Write back with formatting
      await writeFile(metaPath, JSON.stringify(data, null, 2) + "\n", "utf8");

      updated++;
      if (hadImage) {
        console.log(`  ↻ Updated ${locale}: ${data.image}`);
      } else {
        console.log(`  ✓ Added ${locale}: ${data.image}`);
      }
    } catch (error) {
      console.log(`  ✗ Failed ${locale}: ${error.message}`);
    }
  }

  return updated;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: node scripts/batch-add-image-field.mjs <images-directory>");
    console.log("Example: node scripts/batch-add-image-field.mjs /tmp/new-images/");
    process.exit(1);
  }

  const imagesDir = args[0];

  console.log(`📁 Processing images from: ${imagesDir}\n`);

  try {
    const files = await readdir(imagesDir);
    const imageFiles = files.filter((f) => {
      const ext = extname(f).toLowerCase();
      return [".webp", ".jpg", ".jpeg", ".png", ".svg"].includes(ext);
    });

    console.log(`Found ${imageFiles.length} image files\n`);

    let totalUpdated = 0;
    let errors = 0;

    for (const file of imageFiles) {
      const figureId = basename(file, extname(file));
      const imageExt = extname(file);

      console.log(`Processing: ${figureId}${imageExt}`);

      const updated = await addImageField(figureId, imageExt);
      if (updated > 0) {
        totalUpdated += updated;
      } else {
        errors++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Images processed: ${imageFiles.length}`);
    console.log(`   Metadata files updated: ${totalUpdated}`);
    console.log(`   Errors: ${errors}`);

    if (errors > 0) {
      console.log(
        `\n⚠️  ${errors} figures had errors. Check that figure IDs match existing metadata folders.`,
      );
    }

    console.log(`\n💡 Next steps:`);
    console.log(`   1. Copy images to public/figures/`);
    console.log(`   2. Run: pnpm content:validate`);
    console.log(`   3. Test in browser: pnpm dev`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
