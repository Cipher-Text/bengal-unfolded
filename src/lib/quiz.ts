import type { QuizDifficulty, QuizQuestion, QuizTier } from "@/types/content";

/** Pure quiz logic: drawing a set, scoring and tier lookup. No React, no DOM. */

export const QUIZ_SET_SIZE = 10;
export const QUIZ_RECENT_LIMIT = 60;
export const QUIZ_SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const QUIZ_STORAGE_KEY = "bu.quiz.v1";

export type QuizAnswers = Record<string, string[] | null>;

export type QuizSession = {
  startedAt: number;
  topic: string;
  queue: string[];
  index: number;
  answers: QuizAnswers;
};

export type QuizStored = {
  v: 1;
  name?: string;
  recentIds: string[];
  session?: QuizSession;
};

type Rng = () => number;

function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Difficulty plan: first two easy, last two hard, the rest medium (only when the set is long enough). */
function difficultyPlan(size: number): QuizDifficulty[] {
  if (size < 6) return Array.from({ length: size }, () => "medium" as const);
  return Array.from({ length: size }, (_, i) => (i < 2 ? "easy" : i >= size - 2 ? "hard" : "medium"));
}

const FALLBACK_ORDER: Record<QuizDifficulty, QuizDifficulty[]> = {
  easy: ["easy", "medium", "hard"],
  medium: ["medium", "easy", "hard"],
  hard: ["hard", "medium", "easy"],
};

/**
 * Draw a balanced random set. Questions seen recently are used only when the rest of the pool
 * cannot fill the set. Falls back to the whole pool when it is smaller than `size`.
 */
export function drawQuestions<T extends Pick<QuizQuestion, "id" | "difficulty">>(
  pool: readonly T[],
  recentIds: readonly string[],
  size: number = QUIZ_SET_SIZE,
  rng: Rng = Math.random,
): T[] {
  const target = Math.min(size, pool.length);
  const recent = new Set(recentIds);
  const buckets: Record<QuizDifficulty, T[]> = { easy: [], medium: [], hard: [] };
  // Shuffle first, then move recently seen questions to the back of each bucket (stable).
  for (const question of shuffle(pool, rng)) buckets[question.difficulty].push(question);
  for (const level of Object.keys(buckets) as QuizDifficulty[]) {
    buckets[level].sort((a, b) => Number(recent.has(a.id)) - Number(recent.has(b.id)));
  }
  const drawn: T[] = [];
  for (const wanted of difficultyPlan(target)) {
    const level = FALLBACK_ORDER[wanted].find((candidate) => buckets[candidate].length > 0);
    if (!level) break;
    drawn.push(buckets[level].shift() as T);
  }
  return drawn;
}

/** Order options for display; honours `shuffleOptions: false`. */
export function orderOptions<T>(options: readonly T[], shuffleOptions: boolean | undefined, rng: Rng = Math.random): T[] {
  return shuffleOptions === false ? [...options] : shuffle(options, rng);
}

/** Credit between 0 and 1. Skipped (null) and empty answers score 0; wrong picks never push below 0. */
export function scoreQuestion(
  question: Pick<QuizQuestion, "type" | "correctOptionIds">,
  selected: readonly string[] | null | undefined,
): number {
  if (!selected || selected.length === 0) return 0;
  const correct = new Set(question.correctOptionIds);
  if (question.type !== "multi_select") return selected.length === 1 && correct.has(selected[0]) ? 1 : 0;
  const right = selected.filter((id) => correct.has(id)).length;
  const wrong = selected.length - right;
  return Math.max(0, (right - wrong) / correct.size);
}

export function scoreSession(
  questions: readonly Pick<QuizQuestion, "id" | "type" | "correctOptionIds">[],
  answers: QuizAnswers,
): number {
  return questions.reduce((total, question) => total + scoreQuestion(question, answers[question.id]), 0);
}

/** Tier for a score out of the set size, scaled to a score out of 10 when the set is shorter. */
export function tierForScore<T extends Pick<QuizTier, "min">>(tiers: readonly T[], score: number, setSize: number): T {
  const scaled = Math.round(setSize > 0 ? (score / setSize) * QUIZ_SET_SIZE : 0);
  let match = tiers[0];
  for (const tier of tiers) if (tier.min <= scaled) match = tier;
  return match;
}

export function isFullyCorrect(
  question: Pick<QuizQuestion, "type" | "correctOptionIds">,
  selected: readonly string[] | null | undefined,
): boolean {
  return scoreQuestion(question, selected) === 1;
}

function emptyStored(): QuizStored {
  return { v: 1, recentIds: [] };
}

export function readStored(now: number = Date.now()): QuizStored {
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return emptyStored();
    const data = JSON.parse(raw) as Partial<QuizStored> | null;
    if (!data || typeof data !== "object") return emptyStored();
    const name = typeof data.name === "string" ? data.name : undefined;
    // A version mismatch keeps only the display name.
    if (data.v !== 1) return { v: 1, recentIds: [], name };
    const recentIds = Array.isArray(data.recentIds) ? data.recentIds.filter((id): id is string => typeof id === "string") : [];
    const session = data.session;
    const valid =
      session &&
      typeof session.startedAt === "number" &&
      now - session.startedAt <= QUIZ_SESSION_MAX_AGE_MS &&
      Array.isArray(session.queue) &&
      typeof session.index === "number" &&
      typeof session.topic === "string" &&
      session.answers &&
      typeof session.answers === "object";
    return { v: 1, name, recentIds, session: valid ? session : undefined };
  } catch {
    return emptyStored();
  }
}

export function writeStored(next: QuizStored): void {
  try {
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, quota): the quiz works without persistence.
  }
}

export function rememberRecent(recentIds: readonly string[], addedIds: readonly string[]): string[] {
  const merged = [...recentIds.filter((id) => !addedIds.includes(id)), ...addedIds];
  return merged.slice(-QUIZ_RECENT_LIMIT);
}
