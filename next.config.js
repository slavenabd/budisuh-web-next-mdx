const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);

module.exports = {
  async redirects() {
    return [
      {
        source: '/:path((?!blog/).*)',
        destination: '/blog/:path*',
        permanent: true,
      },
    ]
  },
}