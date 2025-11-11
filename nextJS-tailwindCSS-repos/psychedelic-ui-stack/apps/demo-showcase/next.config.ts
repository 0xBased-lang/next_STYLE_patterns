import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@psychedelic-ui/core-components',
    '@psychedelic-ui/conspiracy-establishment',
    '@psychedelic-ui/organic-harmony',
  ],
}

export default nextConfig
