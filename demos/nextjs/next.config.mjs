import { lovinspPlugin } from 'lovinsp';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(lovinspPlugin({ bundler: 'webpack' }));
    return config;
  },
};

export default nextConfig;
