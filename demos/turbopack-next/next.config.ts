import { lovinspPlugin } from 'lovinsp';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    rules: lovinspPlugin({
      bundler: 'turbopack',
    }),
  },
};

export default withMDX(nextConfig);
