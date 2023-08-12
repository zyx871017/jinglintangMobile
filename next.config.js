/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports');
const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.dushitiyan.weilaicdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
});

module.exports = nextConfig
