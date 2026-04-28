import Link from "next/link";
import type { Locale } from "@/types/content";
export function LanguageSwitcher({ locale, pathAfterLocale = "" }: { locale: Locale; pathAfterLocale?: string }) {
  const normalized = pathAfterLocale.startsWith("/") ? pathAfterLocale : `/${pathAfterLocale}`;
  const safePath = normalized === "/" ? "" : normalized;
  return <div className="theme-surface-soft inline-flex rounded-full border p-1 text-sm"><Link className={`rounded-full px-3 py-1 ${locale === "en" ? "bg-amber-500 text-zinc-950" : "theme-muted"}`} href={`/en${safePath}`}>EN</Link><Link className={`rounded-full px-3 py-1 ${locale === "bn" ? "bg-amber-500 text-zinc-950" : "theme-muted"}`} href={`/bn${safePath}`}>BN</Link></div>;
}
