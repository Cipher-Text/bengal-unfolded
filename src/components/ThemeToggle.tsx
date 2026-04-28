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
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    const initial: Theme = current === "light" || current === "dark" ? current : getPreferredTheme();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    window.localStorage.setItem("theme", initial);
  }, []);

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
      className="theme-control rounded-full border px-3 py-1 text-sm font-medium"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
