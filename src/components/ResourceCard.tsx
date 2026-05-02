import Link from "next/link";
import type { EventResource, Locale } from "@/types/content";

const CATEGORY_LABELS = {
  en: { read: "Read", watch: "Watch", explore: "Explore", understand: "Understand" },
  bn: { read: "পড়ুন", watch: "দেখুন", explore: "অন্বেষণ", understand: "বোঝুন" },
} as const;

const SUBCATEGORY_LABELS = {
  en: {
    "historical-literature": "Historical Literature",
    novel: "Novel",
    memoir: "Memoir",
    movie: "Movie",
    documentary: "Documentary",
    drama: "Drama",
    archive: "Archive",
    documents: "Documents",
    photos: "Photos",
    research: "Research",
    papers: "Papers",
  },
  bn: {
    "historical-literature": "ঐতিহাসিক সাহিত্য",
    novel: "উপন্যাস",
    memoir: "স্মৃতিকথা",
    movie: "চলচ্চিত্র",
    documentary: "ডকুমেন্টারি",
    drama: "নাটক",
    archive: "আর্কাইভ",
    documents: "ডকুমেন্টস",
    photos: "ছবি",
    research: "গবেষণা",
    papers: "পেপারস",
  },
} as const;

export function ResourceCard({ resource, locale }: { resource: EventResource; locale: Locale }) {
  const isExternal = typeof resource.href === "string" && resource.href.startsWith("http");
  return (
    <article className="theme-surface rounded-xl border p-4">
      <h3 className="text-base font-semibold">{resource.title}</h3>
      <p className="theme-muted mt-1 text-sm">{resource.attribution}</p>
      <p className="mt-1 text-xs tracking-[0.2em] text-accent uppercase">{CATEGORY_LABELS[locale][resource.category]} · {SUBCATEGORY_LABELS[locale][resource.subcategory]}</p>
      {resource.note ? <p className="theme-muted mt-2 line-clamp-3 text-sm">{resource.note}</p> : null}
      {resource.href ? (
        <Link
          href={resource.href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-3 text-sm font-medium text-accent hover:bg-amber-500/10"
        >
          {locale === "bn" ? "বিস্তারিত" : "Details"}
        </Link>
      ) : null}
    </article>
  );
}
