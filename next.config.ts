import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Client-side router cache durations (seconds)
  experimental: {
    staleTimes: {
      dynamic: 30,  // cache dynamic pages for 30s on the client
      static: 180,  // cache static pages for 3 min on the client
    },
  },
}

export default nextConfig
