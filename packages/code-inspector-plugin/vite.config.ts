import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      formats: ['cjs', 'es'],
      fileName: '[name]',
      name: 'CodeInspectorPlugin',
    },
    minify: true,
    emptyOutDir: false,
    rollupOptions: {
      external: [
        '@markshawn/code-inspector-core',
        '@markshawn/code-inspector-vite',
        '@markshawn/code-inspector-webpack',
        '@markshawn/code-inspector-esbuild',
        '@markshawn/code-inspector-turbopack',
        '@markshawn/code-inspector-mako',
        'chalk',
        'path',
      ],
    },
    target: ['node8', 'es2015'],
  },
});
