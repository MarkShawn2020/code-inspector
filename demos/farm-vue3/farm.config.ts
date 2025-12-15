import { defineConfig } from '@farmfe/core';
import vue from '@vitejs/plugin-vue';
import { lovinspPlugin } from 'lovinsp'

export default defineConfig({
  vitePlugins: [
    vue(),
    lovinspPlugin({
      bundler: 'vite'
    })
  ]
});
