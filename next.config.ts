import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
