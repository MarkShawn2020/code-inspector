import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { LovinspPlugin } from 'lovinsp';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    LovinspPlugin({
      bundler: 'vite',
      behavior: {
        copy: '{file}',
      },
      // pathFormat: ['-g', '-r', '{file}:{line}:{column}']
    }),
    vueJsx(),
  ],
});
