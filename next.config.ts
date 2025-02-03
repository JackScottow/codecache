/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Add custom SSL configuration for Supabase
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          tls: false,
          net: false,
          fs: false,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
