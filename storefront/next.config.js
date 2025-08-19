const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "backend",
      },
      {
        protocol: "http",
        hostname: process.env.MEDUSA_BACKEND_URL,
      },
      {
        protocol: "https",
        hostname: process.env.MEDUSA_BACKEND_URL,
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_BASE_URL,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],
  },
}

module.exports = nextConfig
