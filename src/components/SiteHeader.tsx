import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Locale } from "@/types/content";
export function SiteHeader({ locale, pathAfterLocale }: { locale: Locale; pathAfterLocale?: string }) {
  return <header className="theme-header sticky top-0 z-40 border-b border-amber-500/20 backdrop-blur"><div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8"><Link href={`/${locale}`} className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Bengal Unfolded</Link><div className="flex items-center gap-2"><ThemeToggle /><LanguageSwitcher locale={locale} pathAfterLocale={pathAfterLocale} /></div></div></header>;
}
