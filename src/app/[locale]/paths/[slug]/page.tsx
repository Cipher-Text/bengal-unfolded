import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllTopicSlugs } from "@/lib/content";
import {
  getLearningPath,
  getLearningPathModeLabel,
  getLearningPathStepTypeLabel,
  resolveLearningPathStep,
} from "@/lib/learning-paths";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const LABELS = {
  en: {
    overview: "Path Overview",
    sequence: "Reading Sequence",
    topicHub: "Open topic hub",
    allPaths: "All paths",
    step: "Step",
    steps: "steps",
    difficulty: "Difficulty",
    noSteps: "This path does not have steps yet.",
  },
  bn: {
    overview: "পথের ওভারভিউ",
    sequence: "পড়ার ক্রম",
    topicHub: "টপিক হাব খুলুন",
    allPaths: "সব পথ",
    step: "ধাপ",
    steps: "ধাপ",
    difficulty: "স্তর",
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
  const steps = await Promise.all(
    path.learningPath.map((item) => resolveLearningPathStep(locale as Locale, item)),
  );

  return (
    <div className="space-y-8">
      <HeroSection title={path.title} tagline={path.tagline} intro={path.intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle title={labels.overview} subtitle={path.description} />
        <div className="mt-4 flex flex-wrap gap-2">
          {path.modes.map((mode) => (
            <span
              key={mode}
              className="rounded-full border border-amber-500/30 px-2.5 py-1 text-[11px] font-medium text-accent"
            >
              {getLearningPathModeLabel(locale as Locale, mode)}
            </span>
          ))}
          <span className="rounded-full border border-amber-500/20 px-2.5 py-1 text-[11px] font-medium theme-muted">
            {path.stepCount} {labels.steps}
          </span>
          <span className="rounded-full border border-amber-500/20 px-2.5 py-1 text-[11px] font-medium theme-muted">
            {labels.difficulty}: {path.difficulty}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/${locale}/topics/${path.slug}`} className="btn-ink">
            {labels.topicHub}
            <span className="arrow">→</span>
          </Link>
          <Link
            href={`/${locale}/paths`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/25 px-4 text-sm font-medium theme-muted hover:bg-amber-500/10"
          >
            {labels.allPaths}
          </Link>
        </div>
      </section>

      <section>
        <SectionTitle title={labels.sequence} subtitle={path.beginnerSummary ?? path.advancedSummary ?? path.description} />
        {steps.length > 0 ? (
          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li key={`${step.type}-${step.id}-${index}`} className="relative pl-10">
                <span className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <Link
                  href={step.href}
                  className="theme-surface block rounded-xl border p-4 hover:border-amber-500/40"
                >
                  <p className="text-eyebrow">
                    {labels.step} {index + 1} · {getLearningPathStepTypeLabel(locale as Locale, step.type)} · {step.eyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">{step.label}</h2>
                  {step.reason ? (
                    <p className="theme-muted mt-2 text-sm leading-relaxed">{step.reason}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="theme-surface mt-4 rounded-xl border p-6 theme-muted">
            {labels.noSteps}
          </div>
        )}
      </section>
    </div>
  );
}
