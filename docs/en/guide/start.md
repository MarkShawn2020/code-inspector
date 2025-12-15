# Quick Start

`lovinsp` supports projects using `webpack/vite/rspack/rsbuild/esbuild/farm/mako` as bundlers, and works with frameworks like `vue/react/preact/solid/qwik/svelte/astro/nextjs/nuxt/umijs`. Please refer to the following integration guide.

## Installation

- Install using npm:

```shell
npm install lovinsp -D
```

- Install using yarn:

```shell
yarn add lovinsp -D
```

- Install using pnpm:

```shell
pnpm add lovinsp -D
```

## Configuration

Complete the corresponding configuration based on your bundler.

::: details Click to view webpack project configuration

```js
// webpack.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = () => ({
  plugins: [
    lovinspPlugin({
      bundler: 'webpack',
    }),
  ],
});
```

:::

::: details Click to view vite project configuration

```js
// vite.config.js
import { defineConfig } from 'vite';
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  plugins: [
    lovinspPlugin({
      bundler: 'vite',
    }),
  ],
});
```

:::

::: details Click to view rspack project configuration

```js
// rspack.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = {
  // other config...
  plugins: [
    lovinspPlugin({
      bundler: 'rspack',
    }),
    // other plugins...
  ],
};
```

:::

::: details Click to view rsbuild project configuration

```js
// rsbuild.config.js
import { defineConfig } from '@rsbuild/core';
const { lovinspPlugin } = require('lovinsp');

export default defineConfig({
  // ...other config
  tools: {
    rspack: {
      plugins: [
        lovinspPlugin({
          bundler: 'rspack',
        }),
      ],
    },
  },
});
```

:::

::: details Click to view esbuild project configuration

```js
// esbuild.config.js
const esbuild = require('esbuild');
const { lovinspPlugin } = require('lovinsp');

esbuild.build({
  // other configs...

  // [Note] When using in esbuild, the dev function's return value needs to be determined based on the environment
  // Return true for local development, false for production build
  plugins: [lovinspPlugin({ bundler: 'esbuild', dev: () => true })],
});
```

:::

::: details Click to view farm project configuration

```js
// farm.config.js
import { defineConfig } from '@farmfe/core';
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  vitePlugins: [
    lovinspPlugin({
      bundler: 'vite',
    }),
    // ...other code
  ],
});
```

:::

::: details Click to view vue-cli project configuration

```js
// vue.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = {
  // ...other code
  chainWebpack: (config) => {
    config.plugin('lovinsp').use(
      lovinspPlugin({
        bundler: 'webpack',
      })
    );
  },
};
```

:::

::: details Click to view nuxt project configuration

- nuxt3.x:

  ```js
  // nuxt.config.js
  import { lovinspPlugin } from 'lovinsp';

  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    vite: {
      plugins: [lovinspPlugin({ bundler: 'vite' })],
    },
  });
  ```

- nuxt2.x:

  ```js
  // nuxt.config.js
  import { lovinspPlugin } from 'lovinsp';

  export default {
    build: {
      extend(config) {
        config.plugins.push(lovinspPlugin({ bundler: 'webpack' }));
        return config;
      },
    },
  };
  ```

:::

::: details Click to view next.js project configuration

- next <= 14.x :

  ```js
  // next.config.js
  const { lovinspPlugin } = require('lovinsp');

  const nextConfig = {
    webpack: (config, { dev, isServer }) => {
      config.plugins.push(lovinspPlugin({ bundler: 'webpack' }));
      return config;
    },
  };

  module.exports = nextConfig;
  ```

- next 15.0.x ~ 15.2.x :

  ```js
  // next.config.js
  import type { NextConfig } from 'next';
  import { lovinspPlugin } from 'lovinsp';

  const nextConfig: NextConfig = {
    experimental: {
      turbo: {
        rules: lovinspPlugin({
          bundler: 'turbopack',
        }),
      },
    },
  };

  export default nextConfig;
  ```

- next >= 15.3.x :

  ```js
  // next.config.js
  import type { NextConfig } from 'next';
  import { lovinspPlugin } from 'lovinsp';

  const nextConfig: NextConfig = {
    turbopack: {
      rules: lovinspPlugin({
        bundler: 'turbopack',
      }),
    },
  };

  export default nextConfig;
  ```

:::

::: details Click to view umi.js project configuration

- With webpack:

  ```js
  // umi.config.js or umirc.js
  import { defineConfig } from '@umijs/max';
  import { lovinspPlugin } from 'lovinsp';

  export default defineConfig({
    chainWebpack(memo) {
      memo.plugin('lovinsp').use(
        lovinspPlugin({
          bundler: 'webpack',
        })
      );
    },
    // other config
  });
  ```

- With mako:

  ```ts
  // .umirc.ts
  import { defineConfig } from 'umi';
  import { lovinspPlugin } from 'lovinsp';

  export default defineConfig({
    // other config...
    mako: {
      plugins: [
        lovinspPlugin({
          bundler: 'mako',
        }),
      ],
    },
  });
  ```

:::

## Usage

There are currently two ways to use the DOM source code location feature:

### Method 1 (Recommended)

Hold down the keyboard shortcut while moving the mouse over the page, and an overlay will appear on the DOM showing relevant information. Click once to automatically open the IDE and position the cursor at the corresponding code location. (The default shortcut for Mac is `Option + Shift`; for Windows, it's `Alt + Shift`. The browser console will display relevant shortcut hints)
![image](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png)

### Method 2 (Recommended for Mobile)

When `showSwitch: true` is configured in the plugin parameters, a `Code Inspector Switch` button will be displayed on the page. Click to toggle the `Code Inspection Mode` on/off. When the mode is enabled, it works the same way as holding down the shortcut keys in Method 1. When the switch is colored, it indicates that `Code Inspection Mode` is enabled <img src="https://github.com/MarkShawn2020/lovinsp/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="20" style="display: inline-block;" />; when the switch is black and white, it indicates that `Code Inspection Mode` is disabled <img src="https://user-images.githubusercontent.com/73059627/230129864-e2813188-8d49-4a8e-a6bc-dda19c79b491.png" width="20" style="display: inline-block;" />.

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)
