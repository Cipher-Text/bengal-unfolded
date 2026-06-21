import { ImageResponse } from "next/og";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "bn" ? "bn" : "en";
  const type = searchParams.get("type") ?? "event";
  const title = (searchParams.get("title") ?? "Bengal Unfolded").slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 160);

  const labels = locale === "bn"
      ? {
        site: "বেঙ্গল আনফোল্ডেড",
        event: "ঐতিহাসিক ঘটনা",
        figure: "ঐতিহাসিক ব্যক্তিত্ব",
      }
    : {
        site: "Bengal Unfolded",
        event: "Historical Event",
        figure: "Historical Figure",
      };

  const typeLabel = type === "figure" ? labels.figure : labels.event;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(145deg, rgb(28,20,13) 0%, rgb(56,40,20) 52%, rgb(16,44,38) 100%)",
          color: "rgb(253, 246, 227)",
          fontFamily: "Noto Sans, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(251,191,36,0.55)",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: 24,
              letterSpacing: "0.08em",
            }}
          >
            {typeLabel}
          </div>
          <div style={{ fontSize: 22, color: "rgb(252,211,77)" }}>{labels.site}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700 }}>{title}</div>
          {subtitle ? (
            <div style={{ fontSize: 32, lineHeight: 1.3, color: "rgba(253,246,227,0.88)" }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(253,246,227,0.8)" }}>
          bengalunfolded.com
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
