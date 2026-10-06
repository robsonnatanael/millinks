import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
};

export default nextConfig;
