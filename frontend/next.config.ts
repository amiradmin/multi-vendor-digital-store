import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost","127.0.0.1"], // Replace with actual domain for external images
    formats: ["image/avif", "image/webp"], // Optimize images
  },
  compiler: {
    styledComponents: true, // Enable for better Styled Components support
  },
  eslint: {
    ignoreDuringBuilds: true, // Prevent ESLint errors from failing builds
  },
};

export default nextConfig;
