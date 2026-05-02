import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
