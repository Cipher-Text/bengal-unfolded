import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
export function generateStaticParams() { return SUPPORTED_LOCALES.map((locale) => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  return <div className="min-h-screen"><SiteHeader locale={locale as Locale} /><main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">{children}</main></div>;
}
