"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/content";

const LOCALE_PREFIX_PATTERN = /^\/(en|bn)(?=\/|$)/;

function normalizePathAfterLocale(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? "" : normalized;
}

export function LanguageSwitcher({ locale, pathAfterLocale }: { locale: Locale; pathAfterLocale?: string }) {
  const pathname = usePathname();
  const currentPathAfterLocale = pathname.replace(LOCALE_PREFIX_PATTERN, "");
  const safePath = normalizePathAfterLocale(pathAfterLocale ?? currentPathAfterLocale);

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
