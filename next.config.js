/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,  // ✅ Disable SWC minify (Termux friendly)
  output: 'export',  // ✅ Static export untuk TV Box
  images: { unoptimized: true },  // ✅ No image optimization needed
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, net: false, tls: false, crypto: false,
    };
    return config;
  },
}
