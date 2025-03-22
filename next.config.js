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
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        minimumCacheTTL: 60,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Configure for GitHub Pages
    basePath: '/crazy-garage-website',
    assetPrefix: '/crazy-garage-website',
    // Disable experimental features
    experimental: {
        optimizePackageImports: ['@fortawesome/free-solid-svg-icons'],
    },
    // Disable CSS optimization
    optimizeFonts: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    swcMinify: true,
    poweredByHeader: false,
}

module.exports = nextConfig
