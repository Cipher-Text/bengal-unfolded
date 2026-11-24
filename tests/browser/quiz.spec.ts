import { expect, test, type Page } from "@playwright/test";

// The quiz reads its questions from /{locale}/quiz-data/{topic}. These tests mock that response, so they
// do not depend on which pilot questions are published and cover the client flow deterministically.

type MockQuestion = {
  id: string;
  status: "published";
  type: "single_choice" | "multi_select" | "which_first";
  topicSlug: string;
  difficulty: "easy" | "medium" | "hard";
  eventSlug: string;
  resourceIds: readonly string[];
  shuffleOptions?: boolean;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionIds: string[];
  explanation: string;
  eventTitle: string;
};

const base = { status: "published", topicSlug: "liberation-war-1971", eventSlug: "1971-liberation-war", resourceIds: ["x"], eventTitle: "Liberation War" } as const;

const QUESTIONS: MockQuestion[] = [
  {
    ...base,
    id: "t-1",
    type: "single_choice",
    difficulty: "easy",
    question: "Test single question?",
    options: [
      { id: "a", text: "Wrong one" },
      { id: "b", text: "Right one" },
      { id: "c", text: "Other wrong" },
    ],
    correctOptionIds: ["b"],
    explanation: "Because single.",
  },
  {
    ...base,
    id: "t-2",
    type: "multi_select",
    difficulty: "medium",
    question: "Select-all test question?",
    options: [
      { id: "a", text: "Multi A" },
      { id: "b", text: "Multi B" },
      { id: "c", text: "Multi C" },
      { id: "d", text: "Multi D" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Because multi.",
  },
  {
    ...base,
    id: "t-3",
    type: "which_first",
    difficulty: "hard",
    shuffleOptions: false,
    question: "Which came first test?",
    options: [
      { id: "a", text: "Earlier event" },
      { id: "b", text: "Later event" },
    ],
    correctOptionIds: ["a"],
    explanation: "Because order.",
  },
];

async function mockQuestions(page: Page, body: unknown = QUESTIONS, status = 200) {
  await page.route("**/quiz-data/**", (route) => route.fulfill({ status, json: body }));
}

const UI = {
  en: { check: "Check answer", next: "Next question", finish: "See my result", skip: "Skip" },
  bn: { check: "উত্তর যাচাই করুন", next: "পরের প্রশ্ন", finish: "ফলাফল দেখুন", skip: "এড়িয়ে যান" },
} as const;

/** Answers whichever question is showing: single right, multi partly right, which-first skipped. */
async function answerCurrent(page: Page, locale: "en" | "bn" = "en") {
  const heading = (await page.locator("h1").innerText()).trim();
  const ui = UI[locale];
  if (heading.startsWith("Test single")) {
    await page.locator("label", { hasText: "Right one" }).click();
    await page.getByRole("button", { name: ui.check }).click();
  } else if (heading.startsWith("Select-all")) {
    await page.locator("label", { hasText: "Multi A" }).click();
    await page.getByRole("button", { name: ui.check }).click();
  } else {
    await page.getByRole("button", { name: ui.skip }).click();
  }
  return heading;
}

async function playThrough(page: Page, locale: "en" | "bn" = "en") {
  const ui = UI[locale];
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    await answerCurrent(page, locale);
    const last = i === QUESTIONS.length - 1;
    await page.getByRole("button", { name: last ? ui.finish : ui.next }).click();
  }
}

test("quiz landing page renders and is indexable", async ({ page }) => {
  await page.goto("/en/quiz/");
  await expect(page.getByRole("heading", { level: 1, name: "Quiz" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/quiz\/?$/);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("quiz play page is noindex", async ({ page }) => {
  await mockQuestions(page);
  await page.goto("/en/quiz/play/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex,\s*follow/);
});

test("quiz flow: select, check, feedback, skip, result and score", async ({ page }) => {
  await mockQuestions(page);
  await page.goto("/en/quiz/play/?topic=all");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByText("1 of 3")).toBeVisible();

  // Check stays disabled until an option is chosen; the answer is not judged on selection alone.
  await expect(page.getByRole("button", { name: "Check answer" })).toBeDisabled();

  for (let i = 0; i < QUESTIONS.length; i += 1) {
    const heading = await answerCurrent(page);
    if (heading.startsWith("Test single")) {
      await expect(page.locator("label", { hasText: "Right one" })).toContainText("Correct");
      await expect(page.getByText("Because single.")).toBeVisible();
      await expect(page.getByRole("link", { name: /Read the story behind this/ })).toHaveAttribute("href", /\/en\/events\/1971-liberation-war\/?$/);
    } else if (heading.startsWith("Select-all")) {
      // One right pick of two: the missed correct option is marked, nothing is marked wrong.
      await expect(page.locator("label", { hasText: "Multi A" })).toContainText("Correct");
      await expect(page.locator("label", { hasText: "Multi B" })).toContainText("Missed");
      await expect(page.getByText("Because multi.")).toBeVisible();
    } else {
      await expect(page.locator("label", { hasText: "Earlier event" })).toContainText("Correct");
      await expect(page.getByText("Because order.")).toBeVisible();
    }
    // Answers lock after checking.
    await expect(page.getByRole("button", { name: "Check answer" })).toHaveCount(0);
    const last = i === QUESTIONS.length - 1;
    await page.getByRole("button", { name: last ? "See my result" : "Next question" }).click();
  }

  // Result: 1 (single) + 0.5 (multi) + 0 (skipped) = 1.5 of 3.
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByText("1.5")).toBeVisible();
  await expect(page.getByText("1 skipped")).toBeVisible();
  await expect(page.getByText(/just for fun and inspiration/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Stories to read next" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Liberation War" })).toHaveAttribute("href", /\/en\/events\/1971-liberation-war\/?$/);
  await expect(page.getByRole("button", { name: "Play again" })).toBeVisible();

  // Play again starts a fresh set.
  await page.getByRole("button", { name: "Play again" }).click();
  await expect(page.getByText("1 of 3")).toBeVisible();
});

test("quiz share card: name is cleaned, hide toggle and sizes work, PNG downloads", async ({ page }) => {
  await mockQuestions(page);
  await page.goto("/en/quiz/play/?topic=all");
  await playThrough(page);

  const nameField = page.getByLabel("Your name (optional)");
  await expect(nameField).toBeVisible();
  await nameField.fill("Rahim 🎉 <b>Uddin</b>");
  // Emoji and markup characters are stripped; letters and spaces stay.
  await expect(nameField).toHaveValue("Rahim bUddinb");
  await expect(page.getByText("Your name stays on your device.")).toBeVisible();

  const canvas = page.locator("canvas");
  await expect(canvas).toHaveAttribute("width", "1080");
  await expect(canvas).toHaveAttribute("height", "1920");
  await expect(canvas).toHaveAttribute("aria-label", /Rahim bUddinb/);

  await page.getByLabel("Hide my name").check();
  await expect(canvas).not.toHaveAttribute("aria-label", /Rahim/);
  await page.getByLabel("Hide my name").uncheck();

  await page.getByLabel(/^Feed/).check();
  await expect(canvas).toHaveAttribute("height", "1350");

  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Download image" }).click()]);
  expect(download.suggestedFilename()).toBe("bengal-unfolded-quiz-feed.png");
  await expect(page.getByText("Image saved.")).toBeVisible();

  // The name is kept in localStorage only.
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("bu.quiz.v1") ?? "{}").name);
  expect(stored).toBe("Rahim bUddinb");
});

test("quiz resumes an unfinished set only when asked to", async ({ page }) => {
  await mockQuestions(page);
  await page.goto("/en/quiz/play/?topic=all");
  await answerCurrent(page);
  await page.getByRole("button", { name: "Next question" }).click();
  await expect(page.getByText("2 of 3")).toBeVisible();

  await page.goto("/en/quiz/play/?topic=all&resume=1");
  await expect(page.getByText("2 of 3")).toBeVisible();

  await page.goto("/en/quiz/play/?topic=all");
  await expect(page.getByText("1 of 3")).toBeVisible();
});

test("quiz shows an empty state and recovers from a load error", async ({ page }) => {
  await page.route("**/quiz-data/**", (route) => route.fulfill({ status: 200, json: [] }));
  await page.goto("/en/quiz/play/?topic=all");
  await expect(page.getByText("There are no questions for this topic yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to quiz" })).toBeVisible();

  await page.unroute("**/quiz-data/**");
  await page.route("**/quiz-data/**", (route) => route.fulfill({ status: 500, body: "nope" }));
  await page.goto("/en/quiz/play/?topic=all");
  await expect(page.getByText("The questions could not be loaded.")).toBeVisible();

  await page.unroute("**/quiz-data/**");
  await mockQuestions(page);
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByText("1 of 3")).toBeVisible();
});

test("bn quiz uses Bengali labels and Bengali numerals", async ({ page }) => {
  await mockQuestions(page);
  await page.goto("/bn/quiz/play/?topic=all");
  await expect(page.getByText("১/৩")).toBeVisible();
  await expect(page.getByRole("button", { name: "উত্তর যাচাই করুন" })).toBeDisabled();
  await playThrough(page, "bn");
  await expect(page.getByText(/মজা ও অনুপ্রেরণার জন্য/)).toBeVisible();
  await expect(page.getByRole("button", { name: "আবার খেলুন" })).toBeVisible();
  await expect(page.getByLabel("আপনার নাম (ঐচ্ছিক)")).toBeVisible();
});
