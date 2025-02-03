import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable React's experimental features if needed
    reactRoot: true,  // If using React 18's root API
  },
};

export default nextConfig;
