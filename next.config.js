/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Force no cache
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
        ]
      }
    ]
  }
}
