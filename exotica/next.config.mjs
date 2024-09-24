/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
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
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Removes all console.* statements
              },
            },
            extractComments: false, // Avoid extracting comments to separate files
          }),
        ],
      };
    }
    return config;
  },

};

export default nextConfig;
