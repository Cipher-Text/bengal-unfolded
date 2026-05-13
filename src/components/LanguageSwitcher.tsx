import Link from "next/link";
import type { Locale } from "@/types/content";

export function LanguageSwitcher({ locale, pathAfterLocale = "" }: { locale: Locale; pathAfterLocale?: string }) {
  const normalized = pathAfterLocale.startsWith("/") ? pathAfterLocale : `/${pathAfterLocale}`;
  const safePath = normalized === "/" ? "" : normalized;
  return (
    <div
      aria-label="Switch language"
      className="inline-flex items-stretch overflow-hidden rounded-sm border"
      style={{ borderColor: "var(--sepia)", boxShadow: "2px 2px 0 var(--sepia)", fontFamily: "var(--font-type), monospace" }}
    >
      <Link
        href={`/en${safePath}`}
        className="inline-flex min-h-[36px] items-center px-3 text-[11px] font-semibold tracking-[0.22em] transition-colors"
        style={
          locale === "en"
            ? { background: "var(--ink)", color: "var(--paper)" }
            : { background: "var(--paper)", color: "var(--ink)" }
        }
      >
        EN
      </Link>
      <span aria-hidden="true" style={{ width: 1, background: "var(--sepia)", opacity: 0.5 }} />
      <Link
        href={`/bn${safePath}`}
        className="inline-flex min-h-[36px] items-center px-3 text-[11px] font-semibold tracking-[0.22em] transition-colors"
        style={
          locale === "bn"
            ? { background: "var(--ink)", color: "var(--paper)" }
            : { background: "var(--paper)", color: "var(--ink)" }
        }
      >
        BN
      </Link>
    </div>
  );
}
