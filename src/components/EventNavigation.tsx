import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";

export function EventNavigation({ locale, previous, next }: { locale: Locale; previous?: EventMeta; next?: EventMeta }) {
  const labels = locale === "bn"
    ? {
      heading: "আগে / পরে",
      subtitle: "এই অধ্যায়ের আগে-পরে কোন ঘটনাগুলো পড়লে ধারাবাহিকতা পরিষ্কার হয়",
      before: "এর আগে",
      after: "এর পরে",
      earlier: "আগের অধ্যায় পড়ুন",
      later: "পরের অধ্যায় পড়ুন",
      start: "টাইমলাইনের শুরু",
      latest: "সর্বশেষ অধ্যায়",
      firstChapter: "এর আগে আর কোনো অধ্যায় নেই। এখান থেকেই ধারাবাহিক পাঠ শুরু করুন।",
      finalChapter: "এটি বর্তমানে টাইমলাইনের শেষ অধ্যায়। সম্পর্কিত অধ্যায়গুলো থেকে আরও প্রেক্ষাপট পড়ুন।",
    }
    : {
      heading: "Before / After",
      subtitle: "Use the adjacent chapters to keep this event in historical sequence",
      before: "Before this",
      after: "After this",
      earlier: "Read previous chapter",
      later: "Read next chapter",
      start: "Start of timeline",
      latest: "Latest chapter",
      firstChapter: "There is no earlier chapter in the timeline. Start the sequence here.",
      finalChapter: "This is currently the latest chapter in the timeline. Use related chapters for more context.",
    };

  return (
    <nav aria-label={labels.heading} className="paper paper-stained relative overflow-hidden p-4 md:p-6">
      <div className="absolute inset-x-8 top-0 h-px bg-amber-300/60" />
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-eyebrow flex items-center gap-2">
            <span className="ornament">❦</span>
            {labels.heading}
            <span className="ornament">❦</span>
          </p>
          <h2 className="text-display mt-2 text-2xl font-semibold leading-tight md:text-4xl">
            {labels.subtitle}
          </h2>
        </div>
        <div aria-hidden="true" className="hidden min-w-28 items-center justify-center md:flex">
          <div className="h-px w-10 bg-amber-500/45" />
          <div className="mx-2 h-2 w-2 rotate-45 border border-amber-500/60" />
          <div className="h-px w-10 bg-amber-500/45" />
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link href={`/${locale}/events/${previous.slug}`} className="postcard tilt-left group flex min-h-56 flex-col p-4 md:p-5">
            <span className="text-eyebrow">{labels.before}</span>
            <p className="text-display mt-3 text-xl font-semibold leading-tight md:text-2xl">
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> {previous.title}
            </p>
            <p className="mt-2 text-sm font-medium text-accent">{previous.year}</p>
            <p className="theme-muted mt-3 line-clamp-3 text-sm leading-relaxed">{previous.summary}</p>
            <div className="mt-auto pt-4">
              {previous.periodLabel ? <p className="theme-muted mb-3 text-xs">{previous.periodLabel}</p> : null}
              <span className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs font-medium text-accent transition-colors group-hover:bg-amber-500/10">
                {labels.earlier}
              </span>
            </div>
          </Link>
        ) : (
          <div className="theme-surface-soft flex min-h-56 flex-col rounded-xl border border-amber-500/25 p-4 opacity-80 md:p-5">
            <p className="text-eyebrow">{labels.before}</p>
            <p className="text-display mt-3 text-xl font-semibold leading-tight md:text-2xl">{labels.start}</p>
            <p className="theme-muted mt-3 text-sm leading-relaxed">{labels.firstChapter}</p>
          </div>
        )}
        {next ? (
          <Link href={`/${locale}/events/${next.slug}`} className="postcard tilt-right group flex min-h-56 flex-col p-4 text-right md:p-5">
            <span className="text-eyebrow">{labels.after}</span>
            <p className="text-display mt-3 text-xl font-semibold leading-tight md:text-2xl">
              {next.title} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </p>
            <p className="mt-2 text-sm font-medium text-accent">{next.year}</p>
            <p className="theme-muted mt-3 line-clamp-3 text-sm leading-relaxed">{next.summary}</p>
            <div className="mt-auto pt-4">
              {next.periodLabel ? <p className="theme-muted mb-3 text-xs">{next.periodLabel}</p> : null}
              <span className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs font-medium text-accent transition-colors group-hover:bg-amber-500/10">
                {labels.later}
              </span>
            </div>
          </Link>
        ) : (
          <div className="theme-surface-soft flex min-h-56 flex-col rounded-xl border border-amber-500/25 p-4 text-right opacity-80 md:p-5">
            <p className="text-eyebrow">{labels.after}</p>
            <p className="text-display mt-3 text-xl font-semibold leading-tight md:text-2xl">{labels.latest}</p>
            <p className="theme-muted mt-3 text-sm leading-relaxed">{labels.finalChapter}</p>
          </div>
        )}
      </div>
    </nav>
  );
}
