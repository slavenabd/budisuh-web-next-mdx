const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      // Redirect www → apex (avoid duplicate content)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.budisuh.eu" }],
        destination: "https://budisuh.eu/:path*",
        permanent: true,
      },

      // Old WordPress slugs → /blog/...
      {
        source: "/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        destination: "/blog/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        permanent: true,
      },
      {
        source: "/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        destination: "/blog/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        permanent: true,
      },
      {
        source: "/enureza-nocno-mokrenje-ukratko",
        destination: "/blog/enureza-nocno-mokrenje-ukratko",
        permanent: true,
      },
      {
        source: "/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        destination:
          "/blog/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        permanent: true,
      },
      {
        source: "/pretrage-za-nocno-mokrenje-kod-djece",
        destination: "/blog/pretrage-za-nocno-mokrenje-kod-djece",
        permanent: true,
      },
      {
        source: "/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        destination: "/blog/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        permanent: true,
      },
      {
        source: "/rijetki-uzroci-nocnog-mokrenja",
        destination: "/blog/rijetki-uzroci-nocnog-mokrenja",
        permanent: true,
      },
      {
        source: "/uspjesno-lijecenje-nocnog-mokrenja",
        destination: "/blog/uspjesno-lijecenje-nocnog-mokrenja",
        permanent: true,
      },
    ];
  },
};

// Export correctly (only once!)
module.exports = withContentlayer(nextConfig);