import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { lovinspPlugin } from 'lovinsp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    lovinspPlugin({
      bundler: 'vite'
    }),
    svelte()
  ],
})
