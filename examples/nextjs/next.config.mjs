/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true, // To enable instrumentation
    serverComponentsExternalPackages: [
      // To utilize node.js specific features in a next.js environment
      "@opentelemetry/auto-instrumentations-node",
      "@opentelemetry/sdk-node",
    ],
  },
};

export default nextConfig;
