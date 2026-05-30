import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  async redirects() {
    return [
      {
        source: "/:locale/heroes",
        destination: "/:locale/figures",
        permanent: true,
      },
      {
        source: "/:locale/heroes/:id",
        destination: "/:locale/figures/:id",
        permanent: true,
      },
      {
        source: "/:locale/events/:slug/heroes",
        destination: "/:locale/events/:slug/figures",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bengalunfolded.com" }],
        destination: "https://bengalunfolded.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
