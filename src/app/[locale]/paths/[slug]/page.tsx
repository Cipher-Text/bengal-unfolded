import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { getAllTopicSlugs } from "@/lib/content";
import {
  getLearningPath,
  getLearningPathStepTypeLabel,
  resolveLearningPathStep,
} from "@/lib/learning-paths";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const LABELS = {
  en: {
    overview: "About this path",
    sequence: "Reading order",
    topicHub: "Open the full topic hub",
    allPaths: "All paths",
    step: "Step",
    steps: "steps",
    start: "Start with step 1",
    beginner: "Beginner-friendly",
    sequenceNote: "Context first, then chapters, people and sources.",
    noSteps: "This path does not have steps yet.",
  },
  bn: {
    overview: "এই পথ সম্পর্কে",
    sequence: "পড়ার ক্রম",
    topicHub: "পূর্ণ টপিক হাব খুলুন",
    allPaths: "সব পথ",
    step: "ধাপ",
    steps: "ধাপ",
    start: "প্রথম ধাপ দিয়ে শুরু করুন",
    beginner: "নতুনদের জন্য",
    sequenceNote: "আগে প্রেক্ষাপট, তারপর অধ্যায়, ব্যক্তি ও সূত্র।",
    noSteps: "এই পথে এখনও ধাপ নেই।",
  },
} as const;

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return SUPPORTED_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  try {
    const path = await getLearningPath(locale as Locale, slug);
    return buildPageMetadata({
      locale: locale as Locale,
      title: `${path.title} | Learning Path`,
      description: path.seoDescription ?? path.description,
      canonicalPath: `/${locale}/paths/${slug}`,
      languagePathWithoutLocale: `/paths/${slug}`,
      type: "website",
    });
  } catch {
    return {};
  }
}

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  let path: Awaited<ReturnType<typeof getLearningPath>>;
  try {
    path = await getLearningPath(locale as Locale, slug);
  } catch {
    notFound();
  }

  if (!path.learningPath?.length) notFound();

  const labels = LABELS[locale as Locale];
  // Orient the reader first: period context leads, then chapters, people and places, with sources last.
  const ORDER: Record<string, number> = { period: 0, topic: 1, event: 2, figure: 3, place: 4, resource: 5 };
  const resolved = await Promise.all(path.learningPath.map((item) => resolveLearningPathStep(locale as Locale, item)));
  const steps = resolved
    .map((step, index) => ({ step, index }))
    .sort((a, b) => (ORDER[a.step.type] ?? 9) - (ORDER[b.step.type] ?? 9) || a.index - b.index)
    .map(({ step }) => step);
  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");

  return (
    <div className="space-y-10">
      <HeroSection showCollage={false} title={path.title} tagline={path.tagline} intro={path.intro} />

      <section aria-labelledby="path-about" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 id="path-about" className="text-eyebrow">{labels.overview}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed md:text-lg">{path.description}</p>
          <p className="text-eyebrow mt-4 flex flex-wrap gap-x-4">
            <span>{fmt(path.stepCount)} {labels.steps}</span>
            {path.modes.includes("beginner") ? <span>{labels.beginner}</span> : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {steps[0] ? (
            <Link href={steps[0].href} className="btn-ink">
              {labels.start}
              <span className="arrow">→</span>
            </Link>
          ) : null}
          <Link href={`/${locale}/topics/${path.slug}`} className="btn-vintage">
            {labels.topicHub}
          </Link>
        </div>
      </section>

      <section aria-labelledby="path-steps">
        <h2 id="path-steps" className="text-display text-3xl font-semibold md:text-4xl">{labels.sequence}</h2>
        <p className="theme-muted mt-2 text-sm md:text-base">{labels.sequenceNote}</p>
        {steps.length > 0 ? (
          <ol className="relative ml-4 mt-8 space-y-4 border-l-2 pl-8 md:ml-5 md:pl-10" style={{ borderColor: "var(--sepia)" }}>
            {steps.map((step, index) => (
              <li key={`${step.type}-${step.id}-${index}`} className="relative">
                <span
                  aria-hidden="true"
                  className="text-display absolute left-[calc(-2rem-1px)] top-3 inline-flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 text-base font-semibold md:left-[calc(-2.5rem-1px)]"
                  style={{ background: "var(--paper)", borderColor: "var(--sepia)", color: "var(--sepia-deep)" }}
                >
                  {fmt(index + 1)}
                </span>
                <Link href={step.href} className="theme-surface group block rounded-xl border p-4 hover:border-[color:var(--gold)] md:p-5">
                  <p className="text-eyebrow">
                    {labels.step} {fmt(index + 1)} · {getLearningPathStepTypeLabel(locale as Locale, step.type)}
                    {step.eyebrow ? ` · ${step.eyebrow}` : ""}
                  </p>
                  <h3 className="text-display mt-2 text-xl font-semibold leading-snug group-hover:text-accent md:text-2xl">{step.label}</h3>
                  {step.reason ? <p className="theme-muted mt-2 text-sm leading-relaxed">{step.reason}</p> : null}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="theme-surface mt-4 rounded-xl border p-6 theme-muted">{labels.noSteps}</div>
        )}
      </section>

      <div>
        <Link href={`/${locale}/paths`} className="link-underline inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
          ← {labels.allPaths}
        </Link>
      </div>
    </div>
  );
}
