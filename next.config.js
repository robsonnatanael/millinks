/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    cms: process.env.NEXT_PUBLIC_CMS,
  },
};
