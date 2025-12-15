import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      formats: ['cjs', 'es'],
      fileName: '[name]',
      name: 'LovinspPlugin',
    },
    minify: true,
    emptyOutDir: false,
    rollupOptions: {
      external: [
        '@lovinsp/core',
        '@lovinsp/vite',
        '@lovinsp/webpack',
        '@lovinsp/esbuild',
        '@lovinsp/turbopack',
        '@lovinsp/mako',
        'chalk',
        'path',
      ],
    },
    target: ['node8', 'es2015'],
  },
});
