import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const isBangla = locale === "bn";
  const referenceLinks = [
    { href: `/${locale}/creators`, label: isBangla ? "সূত্রপঞ্জি" : "Sources" },
    { href: `/${locale}/glossary`, label: isBangla ? "গ্লসারি" : "Glossary" },
    { href: `/${locale}/methodology`, label: isBangla ? "পদ্ধতি" : "Methodology" },
    { href: `/${locale}/join`, label: isBangla ? "যোগাযোগ" : "Join" },
  ];
  const discoveryLinks = [
    { href: `/${locale}/timeline`, label: isBangla ? "টাইমলাইন" : "Timeline" },
    { href: `/${locale}/topics`, label: isBangla ? "টপিকস" : "Topics" },
    { href: `/${locale}/figures`, label: isBangla ? "ব্যক্তিত্ব" : "People" },
    { href: `/${locale}/places`, label: isBangla ? "স্থান" : "Places" },
    { href: `/${locale}/methodology`, label: isBangla ? "সম্পাদকীয় পদ্ধতি" : "Editorial method" },
    { href: `/${locale}/join`, label: isBangla ? "সহযোগিতা" : "Contribute" },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale as Locale} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-14">{children}</main>
      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8 md:pb-14">
        <div className="hairline-gold mb-6" />
        <p className="theme-muted text-xs md:text-sm">
          {isBangla ? "সহায়তায় " : "Facilitated by "}
          <a href="http://factlensbd.com/" target="_blank" rel="noopener noreferrer" className="link-underline text-accent">FactLens</a>
          {" · "}
          {isBangla ? "কারিগরি অংশীদার " : "Technical Partner: "}
          <a href="https://www.ciphertextlabs.com/" target="_blank" rel="noopener noreferrer" className="link-underline text-accent">CipherText</a>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-eyebrow theme-muted">{isBangla ? "রেফারেন্স" : "Reference"}</span>
          {referenceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-eyebrow link-underline text-accent">
              {item.label}
            </Link>
          ))}
        </div>
        <nav aria-label={isBangla ? "আর্কাইভের লিংক" : "Archive links"} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {discoveryLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-eyebrow link-underline text-accent">{item.label}</Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
