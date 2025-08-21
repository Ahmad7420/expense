import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /\/manifest\.json$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'manifest-cache',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      urlPattern: /\/icons\/.*\.(png|svg)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'icons-cache',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
  ],
});


const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);