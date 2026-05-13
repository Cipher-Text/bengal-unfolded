import Link from "next/link";
import type { EventResource, Locale } from "@/types/content";

const CATEGORY_LABELS = {
  en: { read: "Read", watch: "Watch", explore: "Explore", understand: "Understand" },
  bn: { read: "পড়ুন", watch: "দেখুন", explore: "অন্বেষণ", understand: "বোঝুন" },
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

const QUALITY_LABELS = {
  en: { primary: "Primary", secondary: "Secondary", archive: "Archive", editorial: "Editorial" },
  bn: { primary: "প্রাথমিক", secondary: "গৌণ", archive: "আর্কাইভ", editorial: "সম্পাদকীয়" },
} as const;

export function ResourceCard({ resource, locale, index = 0 }: { resource: EventResource; locale: Locale; index?: number }) {
  const isExternal = typeof resource.href === "string" && resource.href.startsWith("http");
  const tiltClass = index % 3 === 1 ? "tilt-right" : index % 3 === 2 ? "tilt-left" : "";

  return (
    <article className={`postcard ${tiltClass} relative p-5`}>
      <p className="text-eyebrow">
        {CATEGORY_LABELS[locale][resource.category]} · {SUBCATEGORY_LABELS[locale][resource.subcategory]}
      </p>
      <h3 className="text-display mt-3 text-lg font-semibold leading-snug md:text-xl">
        <Link href={`/${locale}/resources/${resource.id}`} className="link-ink">
          {resource.title}
        </Link>
      </h3>
      <p className="text-eyebrow-script mt-1 text-base">
        <Link href={`/${locale}/creators/${resource.creatorId}`} className="link-ink">
          — {resource.attribution}
        </Link>
      </p>
      {resource.quality ? (
        <div className="mt-3">
          <span className="stamp">{QUALITY_LABELS[locale][resource.quality]}</span>
        </div>
      ) : null}
      {resource.note ? <p className="theme-muted mt-3 line-clamp-3 text-sm leading-relaxed">{resource.note}</p> : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={`/${locale}/resources/${resource.id}`} className="btn-vintage">
          {locale === "bn" ? "রিসোর্স পেজ" : "Resource Page"}
          <span className="arrow">→</span>
        </Link>
        {resource.href ? (
          <Link
            href={resource.href}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn-vintage"
          >
            {locale === "bn" ? "মূল সূত্র" : "Original Source"}
            <span className="arrow">↗</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
