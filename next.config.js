/** @type {import('next').NextConfig} */
const nextConfig = {
  // To allow getting images from external source
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
