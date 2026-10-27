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

test("unknown route returns 404 and sitemap and robots are served", async ({ request }) => {
  const missing = await request.get("/missing-browser-test-route/");
  expect(missing.status()).toBe(404);
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
});
