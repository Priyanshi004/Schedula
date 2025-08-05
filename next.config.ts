/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    turbo: true,
  },
  images: {
    domains: ['localhost'], // Add your image domains here if using next/image
  },
};

module.exports = nextConfig;
