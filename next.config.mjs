/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.simpleicons.org', 'localhost', 'paddle-billing.vercel.app'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.fly.dev'],
    },
  },
};

export default nextConfig;
