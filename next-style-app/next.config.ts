import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Experimental Features */
  experimental: {
    // Enable React Server Components optimizations
    reactCompiler: true,
    // Enable PPR (Partial Prerendering)
    ppr: true,
    // Type-safe environment variables
    typedRoutes: true,
  },

  /* TypeScript */
  typescript: {
    // Strict TypeScript checking during build
    ignoreBuildErrors: false,
  },

  /* ESLint */
  eslint: {
    ignoreDuringBuilds: false,
  },

  /* Images */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  /* Headers for better security and performance */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  /* Webpack customization for better builds */
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

export default nextConfig
