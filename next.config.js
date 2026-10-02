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

      // budisuh.eu retired → Croatian BeDRY site. Exact matches only (no
      // wildcards) so a wrong slug 404s visibly. Specific rules come before "/".
      // Blog posts
      {
        source: "/blog/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        destination: "https://home.bedry.app/hr/blog/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        permanent: true,
      },
      {
        source: "/blog/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        destination: "https://home.bedry.app/hr/blog/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        permanent: true,
      },
      {
        source: "/blog/enureza-nocno-mokrenje-ukratko",
        destination: "https://home.bedry.app/hr/blog/enureza-nocno-mokrenje-ukratko",
        permanent: true,
      },
      {
        source: "/blog/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        destination: "https://home.bedry.app/hr/blog/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        permanent: true,
      },
      {
        source: "/blog/pretrage-za-nocno-mokrenje-kod-djece",
        destination: "https://home.bedry.app/hr/blog/pretrage-za-nocno-mokrenje-kod-djece",
        permanent: true,
      },
      {
        source: "/blog/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        destination: "https://home.bedry.app/hr/blog/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        permanent: true,
      },
      {
        source: "/blog/rijetki-uzroci-nocnog-mokrenja",
        destination: "https://home.bedry.app/hr/blog/rijetki-uzroci-nocnog-mokrenja",
        permanent: true,
      },
      {
        source: "/blog/uspjesno-lijecenje-nocnog-mokrenja",
        destination: "https://home.bedry.app/hr/blog/uspjesno-lijecenje-nocnog-mokrenja",
        permanent: true,
      },

      // Pages
      {
        source: "/blog",
        destination: "https://home.bedry.app/hr/blog/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "https://home.bedry.app/hr/o-nama/slaven-abdovic",
        permanent: true,
      },
      {
        source: "/",
        destination: "https://home.bedry.app/hr/",
        permanent: true,
      },

      // Old WordPress root slugs → straight to the new site (no chain via /blog/...)
      {
        source: "/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        destination: "https://home.bedry.app/hr/blog/dijete-i-dalje-mokri-u-krevet-a-probali-smo-sve",
        permanent: true,
      },
      {
        source: "/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        destination: "https://home.bedry.app/hr/blog/dnevnik-mokrenja-pijenja-ispunjavanje-tumacenje",
        permanent: true,
      },
      {
        source: "/enureza-nocno-mokrenje-ukratko",
        destination: "https://home.bedry.app/hr/blog/enureza-nocno-mokrenje-ukratko",
        permanent: true,
      },
      {
        source: "/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        destination: "https://home.bedry.app/hr/blog/nocno-mokrenje-enureza-djeca-dijagnostika-lijecenje",
        permanent: true,
      },
      {
        source: "/pretrage-za-nocno-mokrenje-kod-djece",
        destination: "https://home.bedry.app/hr/blog/pretrage-za-nocno-mokrenje-kod-djece",
        permanent: true,
      },
      {
        source: "/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        destination: "https://home.bedry.app/hr/blog/rezim-pijenja-i-mokrenja-prvi-korak-do-suhoce",
        permanent: true,
      },
      {
        source: "/rijetki-uzroci-nocnog-mokrenja",
        destination: "https://home.bedry.app/hr/blog/rijetki-uzroci-nocnog-mokrenja",
        permanent: true,
      },
      {
        source: "/uspjesno-lijecenje-nocnog-mokrenja",
        destination: "https://home.bedry.app/hr/blog/uspjesno-lijecenje-nocnog-mokrenja",
        permanent: true,
      },
    ];
  },
};

// Export correctly (only once!)
module.exports = withContentlayer(nextConfig);