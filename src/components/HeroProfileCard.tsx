import Link from "next/link";
import type { Hero, Locale } from "@/types/content";

export function HeroProfileCard({ hero, locale, featured = false }: { hero: Hero; locale: Locale; featured?: boolean }) {
  return (
    <article className={`rounded-2xl border p-5 ${featured ? "border-amber-500/40 bg-amber-500/10" : "theme-surface theme-border"}`}>
      <h3 className="text-xl font-semibold">{hero.name}</h3>
      <p className="mt-1 text-sm text-amber-400">{hero.role}</p>
      <p className="theme-muted mt-3 text-sm">{hero.bio}</p>
      <p className="mt-3 text-sm font-medium text-emerald-500">{hero.impact}</p>
      <Link href={`/${locale}/heroes/${hero.id}`} className="mt-4 inline-flex rounded-lg border border-amber-500/40 px-3 py-1 text-sm font-medium text-amber-400 hover:bg-amber-500/10">
        {locale === "bn" ? "বিস্তারিত" : "Details"}
      </Link>
    </article>
  );
}
