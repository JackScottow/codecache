/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  // Add custom SSL configuration for Supabase
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          tls: false,
          net: false,
          fs: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
