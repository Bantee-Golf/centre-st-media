import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.footballfanatics.com" },
      { protocol: "https", hostname: "shop.gopsusports.com" },
    ],
  },
};

export default nextConfig;
