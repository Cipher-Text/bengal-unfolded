"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme;
    const currentTheme: Theme = current === "light" || current === "dark" ? current : theme;
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-control inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-105"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span
        className={`h-4 w-4 rounded-full ${theme === "dark" ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" : "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]"}`}
        aria-hidden="true"
      />
    </button>
  );
}
