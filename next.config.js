const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'components');
    return config;
  },
};

module.exports = nextConfig;
