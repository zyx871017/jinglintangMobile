/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports');
const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southest-1.amazonaws.com',
      },
    ],
  }
});

module.exports = nextConfig
