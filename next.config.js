/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    cms: process.env.NEXT_PUBLIC_CMS,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMG_PROTOCOL,
        hostname: process.env.IMG_HOSTNAME,
      },
    ],
  },
};
