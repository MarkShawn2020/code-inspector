import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { lovinspPlugin } from 'lovinsp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    lovinspPlugin({
      bundler: 'vite'
    }),
    qwikVite({
      csr: true,
    }),
  ],
})
