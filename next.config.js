/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  async redirects() {
    return [
      {
        source: "/canceled",
        destination: "/",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
