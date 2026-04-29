import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Bengal Unfolded", description: "Bilingual historical storytelling journey through major Bengal and Bangladesh turning points." };
const themeInitScript = `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="dark" suppressHydrationWarning className="h-full"><body className="min-h-full"><script dangerouslySetInnerHTML={{ __html: themeInitScript }} />{children}</body></html>; }
