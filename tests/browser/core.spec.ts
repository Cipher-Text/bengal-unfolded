import { expect, test } from "@playwright/test";

test("localized landing pages and language switching work", async ({ page }) => {
  await page.goto("/bn/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/bn\/?$/);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\//);
  await expect(page.locator("main")).toBeVisible();
});

test("figure directory applies query filters, paginates, and follows browser history", async ({ page }) => {
  await page.goto("/en/figures/?q=Jinnah");
  await expect(page).toHaveURL(/q=Jinnah/);
  await expect(page.getByRole("heading", { name: /Figure Directory/i })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page).not.toHaveURL(/q=/);
  await page.goBack();
  await expect(page).toHaveURL(/q=Jinnah/);
  await expect(page.locator("main")).toBeVisible();
});

test("compare page remains available with malformed query parameters", async ({ page }) => {
  await page.goto("/en/compare/?a=missing-event&b=1971-liberation-war");
  await expect(page.locator('select[name="a"]')).toBeVisible();
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

  test(`${locale} timeline search reads deep links and invalid theme safely`, async ({ page }) => {
    await page.goto(`/${locale}/timeline/?q=__no_matching_event__`);
    await expect(page.getByText(locale === "en" ? "No results found." : "কোনো ফলাফল পাওয়া যায়নি।")).toBeVisible();
    await page.goto(`/${locale}/timeline/?theme=invalid-theme`);
    await expect(page.getByText(locale === "en" ? "No results found." : "কোনো ফলাফল পাওয়া যায়নি।")).toBeVisible();
    await page.getByRole("button", { name: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট" }).click();
    await expect(page).not.toHaveURL(/theme=/);
  });

  test(`${locale} creators search reads deep links and reset clears filters`, async ({ page }) => {
    await page.goto(`/${locale}/creators/?q=__no_matching_creator__`);
    await expect(page.getByText(locale === "en" ? "No sources found." : "কোনো সূত্র পাওয়া যায়নি।")).toBeVisible();
    await page.getByRole("button", { name: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট" }).click();
    await expect(page).not.toHaveURL(/q=/);
  });

  test(`${locale} compare restores selected events from a direct URL and browser history`, async ({ page }) => {
    await page.goto(`/${locale}/compare/?a=1952-language-movement&b=1971-liberation-war`);
    await expect(page.locator('select[name="a"]')).toHaveValue("1952-language-movement");
    await expect(page.locator('select[name="b"]')).toHaveValue("1971-liberation-war");
    await expect(page.getByRole("heading", { name: "Language Movement" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Liberation War" }).first()).toBeVisible();
    await page.getByRole("link", { name: locale === "en" ? "Reset" : "রিসেট" }).click();
    await expect(page).not.toHaveURL(/[?&][ab]=/);
    await page.goBack();
    await expect(page).toHaveURL(/a=1952-language-movement/);
  });

  test(`${locale} learning paths restore query mode filters and invalid mode fallback`, async ({ page }) => {
    await page.goto(`/${locale}/paths/?mode=researcher`);
    await expect(page).toHaveURL(/mode=researcher/);
    await expect(page.getByRole("link", { name: locale === "en" ? "Researcher" : "গবেষক", exact: true })).toHaveAttribute("aria-pressed", "true");
    await page.goBack();
    await expect(page).not.toHaveURL(/mode=/);
    await page.goto(`/${locale}/paths/?mode=unknown`);
    await expect(page.getByRole("link", { name: locale === "en" ? "All paths" : "সব পথ", exact: true })).toHaveAttribute("aria-pressed", "true");
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

test("unknown route returns 404 and sitemap and robots are served", async ({ request }) => {
  const missing = await request.get("/missing-browser-test-route/");
  expect(missing.status()).toBe(404);
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
});
