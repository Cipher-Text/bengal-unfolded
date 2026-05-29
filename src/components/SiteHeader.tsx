import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeaderScroll } from "@/components/HeaderScroll";
import type { Locale } from "@/types/content";

export function SiteHeader({ locale, pathAfterLocale }: { locale: Locale; pathAfterLocale?: string }) {
  const navItems: Array<{ href: string; label: string }> = [
    { href: `/${locale}/topics`, label: locale === "bn" ? "টপিকস" : "Topics" },
    { href: `/${locale}/paths`, label: locale === "bn" ? "পথ" : "Paths" },
    { href: `/${locale}/compare`, label: locale === "bn" ? "তুলনা" : "Compare" },
    { href: `/${locale}/figures`, label: locale === "bn" ? "ব্যক্তিত্ব" : "Figures" },
    { href: `/${locale}/creators`, label: locale === "bn" ? "স্রষ্টা" : "Creators" },
    { href: `/${locale}/resources`, label: locale === "bn" ? "রিসোর্স" : "Resources" },
    { href: `/${locale}/glossary`, label: locale === "bn" ? "গ্লসারি" : "Glossary" },
  ];

  return (
    <>
      <HeaderScroll />
      <header
        data-site-header
        className="theme-header sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: "var(--sepia)", borderBottomWidth: "2px" }}
      >
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3.5 transition-all duration-300 md:px-8 data-[shrunk=true]:py-2"
          data-shrunk="false"
        >
          <Link href={`/${locale}`} className="group flex items-center gap-3" aria-label="Bengal Unfolded">
            <span
              aria-hidden="true"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #d8b166, #8a5c00 80%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-display text-lg italic text-[color:var(--paper)]">B</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-semibold tracking-tight sm:text-base md:text-lg">Bengal Unfolded</span>
              <span className="text-eyebrow text-[9px] sm:text-[10px] mt-0.5">A Bilingual Gazette</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-ink inline-flex min-h-[44px] items-center px-3 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-type), monospace" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} pathAfterLocale={pathAfterLocale} />
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-1 md:hidden">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-ink inline-flex min-h-[36px] items-center text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-type), monospace" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
