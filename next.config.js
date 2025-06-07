/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  // Improve production performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable static optimization where possible
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
