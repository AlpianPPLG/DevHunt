import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      'ui.shadcn.com',
      'assets.vercel.com',
      'www.datocms-assets.com',
      'kubernetes.io',
      'github.githubassets.com',
      'pytorch.org',
      'huggingface.co',
      'python.langchain.com',
      'cdn.worldvectorlogo.com',
      'www.postgresql.org',
      'upload.wikimedia.org',
      'github.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kubernetes.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
