import type { Metadata } from "next";
import Script from "next/script";
import { Hind_Siliguri, Playfair_Display, Special_Elite } from "next/font/google";
import { CANONICAL_ORIGIN, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "600"],
  subsets: ["bengali", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-type",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Bengal Unfolded is a bilingual Bangladesh and Bengal history and cultural learning platform, not a news portal.";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "bn-BD": "/bn",
      "x-default": "/bn",
    },
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: CANONICAL_ORIGIN,
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} historical and cultural learning portal` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-F3LD2MVJY2";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "বেঙ্গল আনফোল্ডেড",
  url: CANONICAL_ORIGIN,
  inLanguage: ["en-US", "bn-BD"],
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    "@id": `${CANONICAL_ORIGIN}#organization`,
    name: SITE_NAME,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${CANONICAL_ORIGIN}#organization`,
  name: SITE_NAME,
  alternateName: "বেঙ্গল আনফোল্ডেড",
  url: CANONICAL_ORIGIN,
  description:
    "Bengal Unfolded is a cultural and historical learning initiative focused on Bengal and Bangladesh, not a news portal.",
  sameAs: ["http://factlensbd.com/", "https://www.ciphertextlabs.com/"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`h-full ${hindSiliguri.variable} ${playfairDisplay.variable} ${specialElite.variable}`}
    >
      <body className="min-h-full">
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const saved=localStorage.getItem("theme");const theme=saved==="light"||saved==="dark"?saved:"light";document.documentElement.dataset.theme=theme}catch(_){document.documentElement.dataset.theme="light"}})();`,
          }}
        />
        <script
          id="lang-init"
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const seg=location.pathname.split("/")[1];if(seg==="bn")document.documentElement.lang="bn"}catch(_){}})();`,
          }}
        />
        <script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script id="organization-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
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
      </body>
    </html>
  );
}
