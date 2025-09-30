/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/banula-portfolio',
  assetPrefix: '/banula-portfolio',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
