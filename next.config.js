/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdnjs.cloudflare.com',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true, // Temporarily ignore TS errors to test if this is the issue
    },
    // Add assetPrefix to handle images correctly with language paths
    assetPrefix: '',
    // Configure base path for static assets
    basePath: '',
    // Add rewrites to handle image paths correctly
    async rewrites() {
        return [
            {
                source: '/:lng/images/:path*',
                destination: '/images/:path*',
            },
        ];
    },
}

module.exports = nextConfig
