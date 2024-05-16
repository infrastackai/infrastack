/** @type {import('next').NextConfig} */

// import { createContentlayerPlugin } from "next-contentlayer"

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: 'infrastack.dev.s3-website-us-west-2.amazonaws.com',
        port: '',
        // pathname: '/infrastack.dev/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === "production") {
  //nextConfig.output = 'export';
}

export default nextConfig;

// export default withContentlayer(nextConfig)
