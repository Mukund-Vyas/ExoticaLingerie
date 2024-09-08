/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'www.exoticalingerie.in',
      },
      {
        protocol: 'https',
        hostname: 'www.api.exoticalingerie.in',
      },
      {
        protocol: 'https',
        hostname: 'api.exoticalingerie.in',
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      const TerserPlugin = require('terser-webpack-plugin');

      // Extend the optimization config with TerserPlugin
      config.optimization = {
        ...config.optimization,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Removes all console.* statements
              },
            },
            extractComments: false, // Optional: avoid extracting comments to separate files
          }),
        ],
      };
    }

    return config;
  },

};

export default nextConfig;
