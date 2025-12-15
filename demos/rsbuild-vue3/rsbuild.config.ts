import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
const { lovinspPlugin } = require('lovinsp');

export default defineConfig({
  plugins: [
    pluginVue()
  ],
  tools: {
    rspack: {
      plugins: [
        lovinspPlugin({
          bundler: "rspack"
        })
      ]
    }
  }
});
