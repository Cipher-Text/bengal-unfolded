import { expect, test } from "@playwright/test";

test("localized landing pages and language switching work", async ({ page }) => {
  await page.goto("/bn/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/bn\/?$/);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\//);
  await expect(page.locator("main")).toBeVisible();
});

test("figure directory applies query filters, shows more, and follows browser history", async ({ page }) => {
  await page.goto("/en/figures/?q=Jinnah");
  await expect(page).toHaveURL(/q=Jinnah/);
  await expect(page.getByRole("searchbox", { name: /Search people and groups/i })).toHaveValue("Jinnah");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await expect(page.getByRole("link", { name: /Muhammad Ali Jinnah/ }).first()).toBeVisible();
  await page.getByRole("button", { name: "Clear search and filters" }).click();
  await expect(page).not.toHaveURL(/q=/);
  await expect(page.getByRole("searchbox", { name: /Search people and groups/i })).toHaveValue("");
  await page.goBack();
  await expect(page).toHaveURL(/q=Jinnah/);
  await expect(page.getByRole("searchbox", { name: /Search people and groups/i })).toHaveValue("Jinnah");

  // Role chips filter without a form submit and are reflected in the URL.
  await page.goto("/en/figures/");
  await page.getByRole("button", { name: /^Martyrs/ }).click();
  await expect(page).toHaveURL(/group=martyr/);
  await expect(page.getByRole("button", { name: /^Martyrs/ })).toHaveAttribute("aria-pressed", "true");
  const first = await page.getByText(/^\d+ profiles$/).textContent();
  expect(Number(first?.match(/\d+/)?.[0])).toBeLessThan(100);

  // "Show more" reveals further profiles when the list is longer than one batch.
  await page.goto("/en/figures/");
  const before = await page.locator("ul.grid > li").count();
  await page.getByRole("button", { name: /^Show \d+ more/ }).click();
  expect(await page.locator("ul.grid > li").count()).toBeGreaterThan(before);
});

test("compare page remains available with malformed query parameters", async ({ page }) => {
  await page.goto("/en/compare/?a=missing-event&b=1971-liberation-war");
  await expect(page.getByLabel("First chapter")).toBeVisible();
  await expect(page.getByLabel("First chapter")).toHaveValue("1947-partition-and-eastern-bengal");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/compare\/?$/);
});

for (const locale of ["en", "bn"]) {
  test(`${locale} resource filters read deep links and reset browser history`, async ({ page }) => {
    await page.goto(`/${locale}/resources/?q=__no_matching_resource__`);
    await expect(page.getByText(locale === "en" ? "No resources found." : "কোনো রিসোর্স পাওয়া যায়নি।")).toBeVisible();
    await page.getByRole("button", { name: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট" }).click();
    await expect(page).not.toHaveURL(/q=/);
    await page.goBack();
    await expect(page).toHaveURL(/q=__no_matching_resource__/);
    await expect(page.getByText(locale === "en" ? "No resources found." : "কোনো রিসোর্স পাওয়া যায়নি।")).toBeVisible();
  });

  test(`${locale} timeline search reads deep links, ignores retired filters and resets`, async ({ page }) => {
    const none = locale === "en" ? /No chapters match/ : /কোনো অধ্যায় মেলেনি/;
    const reset = locale === "en" ? "Clear search and filters" : "খোঁজ ও ফিল্টার মুছুন";
    await page.goto(`/${locale}/timeline/?q=__no_matching_event__`);
    await expect(page.getByText(none)).toBeVisible();
    await page.getByRole("button", { name: reset }).click();
    await expect(page).not.toHaveURL(/q=/);
    await expect(page.locator("[data-era-section]").first()).toBeVisible();
    // The old year/theme/importance/page parameters no longer filter anything.
    await page.goto(`/${locale}/timeline/?theme=invalid-theme&page=9`);
    await expect(page.locator("[data-era-section]").first()).toBeVisible();
  });

  test(`${locale} timeline is one era-grouped list with a working era bar`, async ({ page }) => {
    await page.goto(`/${locale}/timeline/`);
    expect(await page.locator("[data-era-section]").count()).toBe(9);
    expect(await page.locator(".timeline-entry").count()).toBeGreaterThan(100);
    await page.locator('nav a[href="#era-colonial-rule-and-resistance"]').click();
    await expect(page).toHaveURL(/#era-colonial-rule-and-resistance/);
    await expect(page.locator("#era-colonial-rule-and-resistance")).toBeInViewport();
  });

  test(`${locale} creators search reads deep links and reset clears filters`, async ({ page }) => {
    await page.goto(`/${locale}/creators/?q=__no_matching_creator__`);
    await expect(page.getByText(locale === "en" ? "No sources found." : "কোনো সূত্র পাওয়া যায়নি।")).toBeVisible();
    await page.getByRole("button", { name: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট" }).click();
    await expect(page).not.toHaveURL(/q=/);
  });

  test(`${locale} compare restores selected events from a direct URL, swaps and follows history`, async ({ page }) => {
    await page.goto(`/${locale}/compare/?a=1952-language-movement&b=1971-liberation-war`);
    const first = page.getByLabel(locale === "en" ? "First chapter" : "প্রথম অধ্যায়");
    const second = page.getByLabel(locale === "en" ? "Second chapter" : "দ্বিতীয় অধ্যায়");
    await expect(first).toHaveValue("1952-language-movement");
    await expect(second).toHaveValue("1971-liberation-war");
    await expect(page.getByRole("heading", { name: locale === "en" ? "Language Movement" : "ভাষা আন্দোলন" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: locale === "en" ? "Liberation War" : "মুক্তিযুদ্ধ" }).first()).toBeVisible();

    await page.getByRole("button", { name: locale === "en" ? "Swap" : "অদলবদল" }).click();
    await expect(page).toHaveURL(/a=1971-liberation-war/);
    await expect(first).toHaveValue("1971-liberation-war");

    await page.getByRole("button", { name: locale === "en" ? "Reset" : "রিসেট", exact: true }).click();
    await expect(page).not.toHaveURL(/[?&][ab]=/);
    await page.goBack();
    await expect(page).toHaveURL(/a=1971-liberation-war/);
  });

  test(`${locale} learning paths restore query mode filters and invalid mode fallback`, async ({ page }) => {
    const exam = locale === "en" ? /^Exam prep/ : /^পরীক্ষা প্রস্তুতি/;
    const all = locale === "en" ? /^All paths/ : /^সব পথ/;
    await page.goto(`/${locale}/paths/?mode=exam-prep`);
    await expect(page.getByRole("button", { name: exam })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: all }).click();
    await expect(page).not.toHaveURL(/mode=/);
    await expect(page.getByRole("button", { name: all })).toHaveAttribute("aria-pressed", "true");
    await page.goBack();
    await expect(page).toHaveURL(/mode=exam-prep/);
    // Retired modes ("researcher") fall back to all paths.
    await page.goto(`/${locale}/paths/?mode=researcher`);
    await expect(page.getByRole("button", { name: all })).toHaveAttribute("aria-pressed", "true");
  });

  test(`${locale} learning path mode works after client navigation`, async ({ page }) => {
    await page.goto(`/${locale}/paths/`);
    const beginner = page.getByRole("button", { name: locale === "en" ? /^Beginner-friendly/ : /^নতুনদের জন্য/ });
    await beginner.click();
    await expect(page).toHaveURL(/mode=beginner/);
    await expect(beginner).toHaveAttribute("aria-pressed", "true");
  });

  test(`${locale} event figure listing paginates direct links, bounds, and history`, async ({ page }) => {
    await page.goto(`/${locale}/events/1971-liberation-war/figures/?page=2`);
    await expect(page.getByText(locale === "en" ? "Page 2 of 5" : "2 / 5")).toBeVisible();
    await page.getByRole("link", { name: locale === "en" ? "Next" : "পরে" }).click();
    await expect(page).toHaveURL(/page=3/);
    await page.goBack();
    await expect(page).toHaveURL(/page=2/);
    await page.goto(`/${locale}/events/1971-liberation-war/figures/?page=999`);
    await expect(page.getByText(locale === "en" ? "Page 5 of 5" : "5 / 5")).toBeVisible();
  });
}

test("placeholder (stub) chapters do not show citations or evidence badges", async ({ page }) => {
  await page.goto("/en/events/1971-december-14-intellectual-killings/");
  await expect(page.getByText("Chapter in progress")).toBeVisible();
  await expect(page.getByText(/Evidence:/)).toHaveCount(0);
  await expect(page.locator("#timeline")).toHaveCount(0);
  await page.goto("/en/events/1757-battle-of-plassey/");
  await expect(page.getByText("Chapter in progress")).toHaveCount(0);
  await expect(page.locator("#timeline")).toBeVisible();
});

test("places index is grouped and place detail folds long chapter lists", async ({ page }) => {
  await page.goto("/en/places/");
  await expect(page.getByRole("link", { name: /Cities, capitals and ports/ }).first()).toBeVisible();
  await page.goto("/en/places/bengal-region/");
  await expect(page.getByText(/^Show \d+ more chapters/)).toBeVisible();
});

test("unknown route returns 404 and sitemap and robots are served", async ({ request }) => {
  const missing = await request.get("/missing-browser-test-route/");
  expect(missing.status()).toBe(404);
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
});
