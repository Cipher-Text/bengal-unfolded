import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
export const metadata: Metadata = { title: "Bengal Unfolded", description: "Bilingual historical storytelling journey through major Bengal and Bangladesh turning points." };
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-F3LD2MVJY2";
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
const langInitScript = `
(() => {
  try {
    const seg = location.pathname.split('/')[1];
    if (seg === 'bn') document.documentElement.lang = 'bn';
  } catch (_) {}
})();
`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wdth,wght@100,400;100,600&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
        {children}
      </body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </html>
  );
}
