import type { NextConfig } from 'next';
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  output: process.env.SITES_STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: false,
  images: { unoptimized: process.env.SITES_STATIC_EXPORT === 'true' },
  poweredByHeader: false,
};
export default config;
