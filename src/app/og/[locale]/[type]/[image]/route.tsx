import { ImageResponse } from "next/og";
import { getEventContent, getFigure } from "@/lib/content";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_FIGURE_IDS, SUPPORTED_LOCALES } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => [
    ...SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, type: "event", image: `${slug}.png` })),
    ...SUPPORTED_FIGURE_IDS.map((slug) => ({ locale, type: "figure", image: `${slug}.png` })),
  ]);
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; type: string; image: string }> }) {
  const { locale, type, image } = await params;
  const slug = image.endsWith(".png") ? image.slice(0, -4) : image;
  if (!SUPPORTED_LOCALES.includes(locale as "en" | "bn")) return new Response("Not found", { status: 404 });

  let title: string;
  let subtitle: string;
  if (type === "event" && SUPPORTED_EVENT_SLUGS.includes(slug as (typeof SUPPORTED_EVENT_SLUGS)[number])) {
    const event = await getEventContent(locale, slug);
    title = `${event.meta.year} — ${event.meta.title}`;
    subtitle = event.meta.heroTagline;
  } else if (type === "figure" && SUPPORTED_FIGURE_IDS.includes(slug as (typeof SUPPORTED_FIGURE_IDS)[number])) {
    const figure = await getFigure(locale, slug);
    title = figure.name;
    subtitle = figure.role;
  } else {
    return new Response("Not found", { status: 404 });
  }

  const isBn = locale === "bn";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56, background: "linear-gradient(145deg, rgb(28,20,13) 0%, rgb(56,40,20) 52%, rgb(16,44,38) 100%)", color: "rgb(253, 246, 227)", fontFamily: "Noto Sans, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", border: "1px solid rgba(251,191,36,0.55)", borderRadius: 9999, padding: "8px 16px", fontSize: 24 }}>{isBn ? (type === "figure" ? "ঐতিহাসিক ব্যক্তিত্ব" : "ঐতিহাসিক ঘটনা") : (type === "figure" ? "Historical Figure" : "Historical Event")}</div>
        <div style={{ fontSize: 22, color: "rgb(252,211,77)" }}>{isBn ? "বেঙ্গল আনফোল্ডেড" : "Bengal Unfolded"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 58, lineHeight: 1.12, fontWeight: 700 }}>{title}</div>
        {subtitle ? <div style={{ fontSize: 30, lineHeight: 1.3, color: "rgba(253,246,227,0.88)" }}>{subtitle}</div> : null}
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "rgba(253,246,227,0.8)" }}>bengalunfolded.com</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
