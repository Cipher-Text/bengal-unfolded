import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: "node scripts/serve-static.mjs", url: "http://127.0.0.1:4173", reuseExistingServer: !process.env.CI, timeout: 30_000 },
});
