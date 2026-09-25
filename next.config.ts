import type { NextConfig } from 'next';
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  output: process.env.SITES_STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: false,
  images: { unoptimized: process.env.SITES_STATIC_EXPORT === 'true' },
  poweredByHeader: false,
  ...(process.env.SITES_STATIC_EXPORT === 'true' ? {} : {
    async redirects() {
      return [{source:'/:path*',has:[{type:'host' as const,value:'lastikcienyakin.com'}],destination:'https://www.lastikcienyakin.com/:path*',permanent:true}];
    },
  }),
};
export default config;
