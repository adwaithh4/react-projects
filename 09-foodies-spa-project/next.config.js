/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional, recommended
  experimental: {
    serverActions: true,      // enable server actions
    appDir: true,             // if using App Router
  },
}

module.exports = nextConfig;