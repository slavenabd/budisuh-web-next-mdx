const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/:path((?!blog/).*)",
        destination: "/blog/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
