import { defineConfig } from 'umi';
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  npmClient: 'pnpm',
  mako: {
    plugins: [
      lovinspPlugin({
        bundler: 'mako',
      }),
    ],
  },
});
