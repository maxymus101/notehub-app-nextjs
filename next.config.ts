import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "https://ac.goit.global" }],
  },
};

export default nextConfig;
