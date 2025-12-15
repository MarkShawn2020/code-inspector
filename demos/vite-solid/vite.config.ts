import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { LovinspPlugin } from 'lovinsp';

export default defineConfig({
  plugins: [
    // lovinsp need to be used before vite-plugin-solid
    LovinspPlugin({
      bundler: 'vite',
    }),
    solid(),
  ],
});
