import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeaderScroll } from "@/components/HeaderScroll";
import type { Locale } from "@/types/content";

export function SiteHeader({ locale, pathAfterLocale }: { locale: Locale; pathAfterLocale?: string }) {
  const desktopNavItems: Array<{ href: string; label: string }> = [
    { href: `/${locale}/topics`, label: locale === "bn" ? "টপিকস" : "Topics" },
    { href: `/${locale}/timeline`, label: locale === "bn" ? "টাইমলাইন" : "Timeline" },
    { href: `/${locale}/paths`, label: locale === "bn" ? "পথ" : "Paths" },
    { href: `/${locale}/figures`, label: locale === "bn" ? "ব্যক্তিত্ব" : "Figures" },
    { href: `/${locale}/places`, label: locale === "bn" ? "স্থান" : "Places" },
    { href: `/${locale}/compare`, label: locale === "bn" ? "তুলনা" : "Compare" },
    { href: `/${locale}/resources`, label: locale === "bn" ? "রিসোর্স" : "Resources" },
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
          className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-3 transition-all duration-300 sm:gap-3 sm:px-4 md:px-8 md:py-3.5 data-[shrunk=true]:py-2"
          data-shrunk="false"
        >
          <Link href={`/${locale}`} className="group flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Bengal Unfolded">
            <span
              aria-hidden="true"
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
              style={{
                background: "radial-gradient(circle at 30% 30%, #d8b166, #8a5c00 80%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.25), 0 4px 10px rgba(0,0,0,0.25)",
              }}
            >
              <span className="font-display text-lg italic text-[color:var(--paper)]">B</span>
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-base md:text-lg">Bengal Unfolded</span>
              <span className="text-eyebrow text-[9px] sm:text-[10px] mt-0.5">A Bilingual Gazette</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {desktopNavItems.map((item) => (
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

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} pathAfterLocale={pathAfterLocale} />
            <MobileNav items={desktopNavItems} label={locale === "bn" ? "মেনু" : "Menu"} />
          </div>
        </div>
      </header>
    </>
  );
}
