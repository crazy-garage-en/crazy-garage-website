/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/crazy-garage-website',
  assetPrefix: '/crazy-garage-website/',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
      },
    ],
  },
}

module.exports = nextConfig 