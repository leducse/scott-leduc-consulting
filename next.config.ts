import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Required for AWS Amplify
  },
};

export default nextConfig;
