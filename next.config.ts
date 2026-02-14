import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(`https://ecommerce.routemisr.com/*/**`),
      new URL(`https://img.icons8.com/**`),
    ],
  },
};

export default nextConfig;
