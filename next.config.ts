import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public', // Output directory for service worker and PWA assets
  register: true, // Automatically register the service worker
  skipWaiting: true, // Skip waiting phase for service worker updates
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);