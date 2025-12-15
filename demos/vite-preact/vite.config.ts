import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { LovinspPlugin } from 'lovinsp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // lovinsp need to be used before @preact/preset-vite
    LovinspPlugin({
      bundler: 'vite',
    }),
    preact(),
  ],
});
