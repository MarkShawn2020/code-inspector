<div align="center">
<img src="https://github.com/MarkShawn2020/lovinsp/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="160px" style="margin-bottom: 12px;" />

<p align="center">
  <h2>code-inspector</h2>
  <a href="https://inspector.fe-dev.cn">中文文档</a> | <a href="https://inspector.fe-dev.cn/en">Documentation</a>
</p>

[![NPM version](https://img.shields.io/npm/v/lovinsp.svg)](https://www.npmjs.com/package/lovinsp)
[![GITHUB star](https://img.shields.io/github/stars/MarkShawn2020/lovinsp?style=flat&label=%E2%AD%90%EF%B8%8F%20stars)](https://github.com/MarkShawn2020/lovinsp)
[![NPM Downloads](https://img.shields.io/npm/dm/lovinsp.svg)](https://npmcharts.netlify.app/compare/lovinsp?minimal=true)
[![MIT-license](https://img.shields.io/npm/l/code-inspector.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/MarkShawn2020/lovinsp?logoColor=purple&color=purple)](https://github.com/MarkShawn2020/lovinsp)

</div>

<hr />

## 📖 Introduction

Click the element on the page, it can automatically open the code editor and position the cursor to the source code of the element.

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

## 💻 Try it out online

- [vue online demo](https://stackblitz.com/edit/vitejs-vite-4pseos?file=vite.config.ts)
- [react online demo](https://stackblitz.com/edit/vitejs-vite-svtwrr?file=vite.config.ts)
- [preact online demo](https://stackblitz.com/edit/vitejs-vite-iyawbf?file=vite.config.ts)
- [solid online demo](https://stackblitz.com/edit/solidjs-templates-6u76jn?file=vite.config.ts)
- [qwik online demo](https://stackblitz.com/edit/vitejs-vite-antzds?file=vite.config.ts)
- [svelte online demo](https://stackblitz.com/edit/vitejs-vite-zoncqr?file=vite.config.ts)
- [astro online demo](https://stackblitz.com/edit/withastro-astro-f5xq1t?file=astro.config.mjs)

## 🎨 Support

The following are which compilers, web frameworks and editors we supported now:

- The following bundlers are currently supported:<br />
  ✅ webpack<br />
  ✅ vite<br />
  ✅ rspack / rsbuild<br />
  ✅ farm<br />
  ✅ esbuild<br />
  ✅ turbopack<br />
  ✅ mako<br />
- The following Web frameworks are currently supported:<br />
  ✅ vue2 / vue3 / nuxt<br />
  ✅ react / nextjs / umijs<br />
  ✅ preact<br />
  ✅ solid<br />
  ✅ qwik<br />
  ✅ svelte<br />
  ✅ astro<br />
- The following code editors are currently supported:<br />
  [VSCode](https://code.visualstudio.com/) | [Cursor](https://www.cursor.com/) | [Windsurf](https://codeium.com/windsurf) | [WebStorm](https://www.jetbrains.com/webstorm/) | [Atom](https://atom.io/) | [HBuilderX](https://www.dcloud.io/hbuilderx.html) | [PhpStorm](https://www.jetbrains.com/phpstorm/) | [PyCharm](https://www.jetbrains.com/pycharm/) | [IntelliJ IDEA](https://www.jetbrains.com/idea/) | [and Others](https://inspector.fe-dev.cn/en/guide/ide.html)

## 🚀 Install

```perl
npm i lovinsp -D
# or
yarn add lovinsp -D
# or
pnpm add lovinsp -D
```

## 🌈 Usage

Please check here for more usage information: [lovinsp configuration](https://inspector.fe-dev.cn/en/guide/start.html#configuration)

- 1.Configuring Build Tools

  <details>
    <summary>Click to expand configuration about: <b>webpack</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>vite</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>rspack</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>rsbuild</b></summary>

  ```js
  // rsbuild.config.js
  const { lovinspPlugin } = require('lovinsp');

  module.exports = {
    // other config...
    tools: {
      rspack: {
        plugins: [
          lovinspPlugin({
            bundler: 'rspack',
          }),
        ],
      },
    },
  };
  ```

  </details>

  <details>
    <summary>Click to expand configuration about: <b>esbuild</b></summary>

  ```js
  // esbuild.config.js
  const esbuild = require('esbuild');
  const { lovinspPlugin } = require('lovinsp');

  esbuild.build({
    // other configs...
    // [注意] esbuild 中使用时，dev 函数的返回值需自己根据环境判断，本地开发的环境返回 true，线上打包返回 false
    plugins: [lovinspPlugin({ bundler: 'esbuild', dev: () => true })],
  });
  ```

  </details>

  <details>
    <summary>Click to expand configuration about: <b>farm</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>vue-cli</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>nuxt</b></summary>

  - For nuxt3.x :

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

  - For nuxt2.x :

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>next.js</b></summary>

  - For next.js(<= 14.x):

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

  - For next.js(15.0.x ~ 15.2.x):

    ```js
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

  - For next.js(>= 15.3.x):

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>umi.js</b></summary>

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

  </details>

  <details>
    <summary>Click to expand configuration about: <b>astro</b></summary>

  ```js
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  import { lovinspPlugin } from 'lovinsp';

  export default defineConfig({
    vite: {
      plugins: [lovinspPlugin({ bundler: 'vite' })],
    },
  });
  ```

  </details>

- 2.Using the function

  Now you can enjoy using it!~

  When pressing the combination keys on the page, moving the mouse over the page will display a mask layer on the DOM with relevant information. Clicking will automatically open the IDE and position the cursor to the corresponding code location. (The default combination keys for Mac are `Option + Shift`; for Windows, it's `Alt + Shift`, and the browser console will output related combination key prompts)

  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png" width="700px" />

## 👨‍💻 Contributors

Special thanks to the contributors of this project:<br />

<img src="https://contrib.rocks/image?repo=MarkShawn2020/lovinsp" height="40" />

## 📧 Communication and Feedback

For any usage issues, please leave a message below my [Twitter](https://twitter.com/zhulxing312147) post or [submit an issue](https://github.com/MarkShawn2020/lovinsp/issues) on Github.

For Chinese users, you can join the QQ group `769748484` or add the author's WeiXin account `zhoulx1688888` for consultation and feedback:

<div style="display: flex; column-gap: 16px; row-gap: 16px; flex-wrap: wrap;">
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/qq-group.png" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-group.jpg" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-qrcode.jpg" width="200" height="272" />
</div>

## 💖 Sponsor

Sponsoring this project can help the author create better. If you are willing, thanks for sponsoring me through [here](https://inspector.fe-dev.cn/en/more/sponsor.html).
