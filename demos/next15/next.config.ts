import type { NextConfig } from 'next';
import { lovinspPlugin } from 'lovinsp';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: lovinspPlugin({
        bundler: 'turbopack',
      }),
    },
  },
};

export default nextConfig;
