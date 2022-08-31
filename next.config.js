const basePath = process.env.BASE_PATH || "";

module.exports = {
  assetPrefix: basePath,
  env: {
    ENV: process.env.ENV,
    SERVICE_URL: process.env.SERVICE_URL,
    BASE_PATH: process.env.BASE_PATH,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
  reactStrictMode: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
