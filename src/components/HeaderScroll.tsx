"use client";
import { useEffect } from "react";

export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    const inner = header.querySelector<HTMLElement>("[data-shrunk]");
    if (!inner) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const shrunk = window.scrollY > 24;
        inner.dataset.shrunk = String(shrunk);
        header.style.boxShadow = shrunk ? "0 10px 30px -20px rgba(0,0,0,0.5)" : "none";
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
