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
    unoptimized: false,
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
        hostname: new URL(process.env.MEDUSA_BACKEND_URL).hostname,
      },
      {
        protocol: "https",
        hostname: new URL(process.env.MEDUSA_BACKEND_URL).hostname,
      },
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname,
      },
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname,
      },
      {
        protocol: "https",
        hostname: new URL(process.env.S3_FILE_URL).hostname,
      },
    ],
  },
}

module.exports = nextConfig
