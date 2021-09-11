module.exports = {
  target: "serverless",
  images: {
    domains: ["image.tmdb.org"],
  },
  reactStrictMode: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
