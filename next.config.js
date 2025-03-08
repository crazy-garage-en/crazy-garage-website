/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
      },
    ],
    domains: ['localhost'],
  },
  basePath: '/crazy-garage-website',
  assetPrefix: '/crazy-garage-website',
}

module.exports = nextConfig 