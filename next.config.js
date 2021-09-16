const basePath = process.env.BASE_PATH || "";

module.exports = {
  async headers() {
    return [
      {
        source: `${basePath}/_next/image(.*)`,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  assetPrefix: basePath,
  env: {
    ENV: process.env.ENV,
    SERVICE_URL: process.env.SERVICE_URL,
    BASE_PATH: process.env.BASE_PATH,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
  },
  target: "serverless",
  images: {
    domains: ["image.tmdb.org", "parintorn.site"],
    path: `${basePath}/_next/image`,
  },
  reactStrictMode: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
