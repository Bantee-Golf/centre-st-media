import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "www.byustore.com" },
      { protocol: "https", hostname: "images.footballfanatics.com" },
    ],
  },
};

export default nextConfig;
