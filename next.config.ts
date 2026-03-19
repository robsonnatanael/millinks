import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
};

export default nextConfig;
