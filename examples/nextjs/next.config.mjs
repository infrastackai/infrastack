/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'standalone', // For web services/Docker
  experimental: {
    instrumentationHook: true, // To enable instrumentation
  },
};

export default nextConfig;
