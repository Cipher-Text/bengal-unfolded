import {
  getAllTopics,
  getEventMeta,
  getFigure,
  getPeriod,
  getPlace,
  getResource,
  getTopic,
} from "@/lib/content";
import type { LearningPathItem, Locale, Topic } from "@/types/content";

export type LearningPathMode = "beginner" | "student" | "researcher" | "exam-prep";

export type LearningPathSummary = Topic & {
  modes: LearningPathMode[];
  difficulty: "beginner" | "intermediate" | "advanced";
  stepCount: number;
};

export type ResolvedLearningPathStep = LearningPathItem & {
  href: string;
  label: string;
  eyebrow: string;
};

const MODE_LABELS: Record<Locale, Record<LearningPathMode, string>> = {
  en: {
    beginner: "Beginner",
    student: "Student",
    researcher: "Researcher",
    "exam-prep": "Exam prep",
  },
  bn: {
    beginner: "শুরু",
    student: "শিক্ষার্থী",
    researcher: "গবেষক",
    "exam-prep": "পরীক্ষা প্রস্তুতি",
  },
};

const STEP_TYPE_LABELS: Record<Locale, Record<LearningPathItem["type"], string>> = {
  en: {
    event: "Event",
    figure: "Figure",
    resource: "Resource",
    place: "Place",
    period: "Period",
    topic: "Topic",
  },
  bn: {
    event: "ঘটনা",
    figure: "ব্যক্তিত্ব",
    resource: "রিসোর্স",
    place: "স্থান",
    period: "পর্ব",
    topic: "টপিক",
  },
};

export function getLearningPathModeLabel(locale: Locale, mode: LearningPathMode): string {
  return MODE_LABELS[locale][mode];
}

export function getLearningPathModes(topic: Topic): LearningPathMode[] {
  const modes = new Set<LearningPathMode>();
  const haystack = `${topic.slug} ${topic.title} ${topic.description}`.toLowerCase();

  if (topic.priority && topic.priority <= 5) modes.add("beginner");
  if (topic.eventSlugs.length >= 5) modes.add("student");
  if ((topic.resourceIds?.length ?? 0) >= 3 || (topic.advancedSummary?.length ?? 0) > 80) {
    modes.add("researcher");
  }
  if (
    haystack.includes("language") ||
    haystack.includes("liberation") ||
    haystack.includes("pakistan") ||
    haystack.includes("democracy") ||
    haystack.includes("bangladesh history")
  ) {
    modes.add("exam-prep");
  }

  if (modes.size === 0) modes.add("student");
  return Array.from(modes);
}

export function getLearningPathDifficulty(topic: Topic): LearningPathSummary["difficulty"] {
  const modes = getLearningPathModes(topic);
  if (modes.includes("researcher")) return "advanced";
  if (modes.includes("student") || modes.includes("exam-prep")) return "intermediate";
  return "beginner";
}

export async function getAllLearningPaths(locale: Locale): Promise<LearningPathSummary[]> {
  const topics = await getAllTopics(locale);
  return topics
    .filter((topic) => (topic.learningPath?.length ?? 0) > 0)
    .map((topic) => ({
      ...topic,
      modes: getLearningPathModes(topic),
      difficulty: getLearningPathDifficulty(topic),
      stepCount: topic.learningPath?.length ?? 0,
    }))
    .sort((a, b) => {
      const priorityDiff = (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
      if (priorityDiff !== 0) return priorityDiff;
      return a.title.localeCompare(b.title);
    });
}

export async function getLearningPath(locale: Locale, slug: string): Promise<LearningPathSummary> {
  const topic = await getTopic(locale, slug);
  return {
    ...topic,
    modes: getLearningPathModes(topic),
    difficulty: getLearningPathDifficulty(topic),
    stepCount: topic.learningPath?.length ?? 0,
  };
}

export async function resolveLearningPathStep(
  locale: Locale,
  item: LearningPathItem,
): Promise<ResolvedLearningPathStep> {
  if (item.type === "event") {
    const meta = await getEventMeta(locale, item.id);
    return { ...item, href: `/${locale}/events/${item.id}`, label: meta.title, eyebrow: meta.year };
  }
  if (item.type === "figure") {
    const meta = await getFigure(locale, item.id);
    return { ...item, href: `/${locale}/figures/${item.id}`, label: meta.name, eyebrow: meta.role };
  }
  if (item.type === "resource") {
    const meta = await getResource(locale, item.id);
    return { ...item, href: `/${locale}/resources/${item.id}`, label: meta.title, eyebrow: meta.attribution };
  }
  if (item.type === "place") {
    const meta = await getPlace(locale, item.id);
    return { ...item, href: `/${locale}/places/${item.id}`, label: meta.title, eyebrow: meta.placeType };
  }
  if (item.type === "period") {
    const meta = await getPeriod(locale, item.id);
    return {
      ...item,
      href: `/${locale}/periods/${item.id}`,
      label: meta.title,
      eyebrow: `${meta.startYear}-${meta.endYear}`,
    };
  }

  const meta = await getTopic(locale, item.id);
  return { ...item, href: `/${locale}/topics/${item.id}`, label: meta.title, eyebrow: STEP_TYPE_LABELS[locale].topic };
}

export function getLearningPathStepTypeLabel(locale: Locale, type: LearningPathItem["type"]): string {
  return STEP_TYPE_LABELS[locale][type];
}
