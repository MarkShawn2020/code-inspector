import { defineConfig } from 'astro/config';
import { lovinspPlugin } from 'lovinsp'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      lovinspPlugin({
        bundler: 'vite'
      })
    ]
  }
});
