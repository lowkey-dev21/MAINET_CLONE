/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'static.coinstats.app',
      },
    ],
  },
}

module.exports = nextConfig