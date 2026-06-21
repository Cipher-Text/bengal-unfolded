"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MobileNavItem = {
  href: string;
  label: string;
};

export function MobileNav({ items, label }: { items: MobileNavItem[]; label: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-all hover:-translate-y-0.5"
        style={{
          borderColor: "var(--sepia)",
          background: open ? "var(--ink)" : "var(--paper)",
          boxShadow: "2px 2px 0 var(--sepia)",
          color: open ? "var(--paper)" : "var(--ink)",
        }}
        aria-label={label}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" className="flex h-4 w-4 flex-col justify-between">
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-full rounded-full bg-current" />
        </span>
      </button>

      <div
        id={menuId}
        className={`absolute right-0 top-[calc(100%+0.75rem)] w-[min(17rem,calc(100vw-2rem))] origin-top-right border p-2 shadow-xl transition-all ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{
          borderColor: "var(--sepia)",
          background: "var(--paper)",
          boxShadow: "0 18px 36px -24px rgba(48, 31, 12, 0.65), 3px 3px 0 var(--sepia)",
        }}
        hidden={!open}
      >
        <nav aria-label={label} className="grid gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-ink inline-flex min-h-[42px] items-center border-b px-3 text-[11px] font-medium uppercase tracking-[0.2em] last:border-b-0"
              style={{ borderColor: "rgba(116, 82, 37, 0.28)", fontFamily: "var(--font-type), monospace" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
