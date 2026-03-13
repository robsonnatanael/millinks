import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  },
};

export default nextConfig;
