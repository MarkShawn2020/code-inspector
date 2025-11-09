<div align="center">
<img src="https://github.com/zh-lx/code-inspector/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="160px" style="margin-bottom: 12px;" />

<p align="center">
  <h2>code-inspector</h2>
  <a href="https://inspector.fe-dev.cn">中文文档</a> | <a href="https://inspector.fe-dev.cn/en">Documentation</a>
</p>

[![NPM version](https://img.shields.io/npm/v/code-inspector-plugin.svg)](https://www.npmjs.com/package/code-inspector-plugin)
[![GITHUB star](https://img.shields.io/github/stars/zh-lx/code-inspector?style=flat&label=%E2%AD%90%EF%B8%8F%20stars)](https://github.com/zh-lx/code-inspector)
[![NPM Downloads](https://img.shields.io/npm/dm/code-inspector-plugin.svg)](https://npmcharts.netlify.app/compare/code-inspector-plugin?minimal=true)
[![MIT-license](https://img.shields.io/npm/l/code-inspector.svg)](https://opensource.org/licenses/MIT)
[![GITHUB-language](https://img.shields.io/github/languages/top/zh-lx/code-inspector?logoColor=purple&color=purple)](https://github.com/zh-lx/code-inspector)

</div>

<hr />

## 📖 Introduction

**Stop guessing where the code is. Just click.**

Click any element on the page, instantly open your IDE with the cursor at the exact source code location. No more searching through files, no more "which component renders this button" detective work.

![code-inspector](https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/demo.gif)

### 🎯 The Problem It Solves

You know that feeling when you see a bug on the page and think "where the hell is this in the code?" You inspect the element, see some cryptic class names, grep through files, and 10 minutes later you finally find it.

**This plugin ends that nonsense.**

Hold `Option + Shift` (Mac) or `Alt + Shift` (Windows), hover over any element, and boom - you see exactly where it comes from. Click once, your IDE opens to that exact file and line. That's it.

### ✨ Latest Features (v1.2.12)

For the **Vibe Coding** crowd (you know who you are - Claude Code, Cursor Composer, living in AI chat):

- **📋 Copy Mode**: Don't want to open IDE? Just copy the file path and paste it to your AI assistant
  - Visual feedback with toast notifications
  - Perfect for `@`-mentioning files in AI chats

- **⌨️ Mode Switching**: Press `Shift+Alt+C` / `Shift+Opt+C` to cycle through:
  - **Copy Path** → `src/components/Button.tsx:42:10` → paste to Claude
  - **Open in IDE** → traditional workflow for Cursor/VSCode users
  - **Open Target** → custom URL template (for your internal tools)
  - **Copy + Open** → do both at once

- **🔄 Smart Context Menu**: Right-click any element for a layer panel showing the component hierarchy. Click any layer, it respects your current mode (copy or open).

**Why this matters**: In 2025, we have AI that can fix any code issue instantly. But we're still taking screenshots and describing bugs like it's 2010. This plugin gives AI your exact context in 3 seconds, not 3 minutes.

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

## 🚀 Quick Start

### Installation

```bash
npm i code-inspector-plugin -D
# or
pnpm add code-inspector-plugin -D
```

### Basic Setup

**Most Common: Vite Projects**

```js
// vite.config.js
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default {
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
};
```

**Next.js (with auto-detection)**

```js
// next.config.js
const { codeInspectorPlugin } = require('code-inspector-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
    return config;
  },
};
```

That's it! Press `Option+Shift` (Mac) or `Alt+Shift` (Windows) on your dev server and start clicking.

### Advanced Options

```js
codeInspectorPlugin({
  bundler: 'vite',
  showSwitch: true,      // Show floating toggle button
  defaultAction: 'copy', // 'copy' | 'locate' | 'target' | 'all'
  copy: true,           // Enable copy mode
  locate: true,         // Enable IDE opening
  editor: 'vscode',     // Your IDE (auto-detected by default)
})
```

**For AI-First Workflows**: Set `defaultAction: 'copy'` and `showSwitch: true`. Toggle between copy and IDE modes with the floating button or `Shift+Alt+C`.

📚 **Full documentation**: [Configuration Guide](https://inspector.fe-dev.cn/en/guide/start.html#configuration)

<details>
<summary><b>📦 Framework-Specific Configs (click to expand)</b></summary>

## 🌈 Detailed Setup

- 1.Configuring Build Tools

  <details>
    <summary>Click to expand configuration about: <b>webpack</b></summary>

  ```js
  // webpack.config.js
  const { codeInspectorPlugin } = require('code-inspector-plugin');

  module.exports = () => ({
    plugins: [
      codeInspectorPlugin({
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
  import { codeInspectorPlugin } from 'code-inspector-plugin';

  export default defineConfig({
    plugins: [
      codeInspectorPlugin({
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
  const { codeInspectorPlugin } = require('code-inspector-plugin');

  module.exports = {
    // other config...
    plugins: [
      codeInspectorPlugin({
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
  const { codeInspectorPlugin } = require('code-inspector-plugin');

  module.exports = {
    // other config...
    tools: {
      rspack: {
        plugins: [
          codeInspectorPlugin({
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
  const { codeInspectorPlugin } = require('code-inspector-plugin');

  esbuild.build({
    // other configs...
    // [注意] esbuild 中使用时，dev 函数的返回值需自己根据环境判断，本地开发的环境返回 true，线上打包返回 false
    plugins: [codeInspectorPlugin({ bundler: 'esbuild', dev: () => true })],
  });
  ```

  </details>

  <details>
    <summary>Click to expand configuration about: <b>farm</b></summary>

  ```js
  // farm.config.js
  import { defineConfig } from '@farmfe/core';
  import { codeInspectorPlugin } from 'code-inspector-plugin';

  export default defineConfig({
    vitePlugins: [
      codeInspectorPlugin({
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
  const { codeInspectorPlugin } = require('code-inspector-plugin');

  module.exports = {
    // ...other code
    chainWebpack: (config) => {
      config.plugin('code-inspector-plugin').use(
        codeInspectorPlugin({
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
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    // https://nuxt.com/docs/api/configuration/nuxt-config
    export default defineNuxtConfig({
      vite: {
        plugins: [codeInspectorPlugin({ bundler: 'vite' })],
      },
    });
    ```

  - For nuxt2.x :

    ```js
    // nuxt.config.js
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    export default {
      build: {
        extend(config) {
          config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
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
    const { codeInspectorPlugin } = require('code-inspector-plugin');

    const nextConfig = {
      webpack: (config, { dev, isServer }) => {
        config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
        return config;
      },
    };

    module.exports = nextConfig;
    ```

  - For next.js(15.0.x ~ 15.2.x):

    ```js
    import type { NextConfig } from 'next';
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    const nextConfig: NextConfig = {
      experimental: {
        turbo: {
          rules: codeInspectorPlugin({
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
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    const nextConfig: NextConfig = {
      turbopack: {
        rules: codeInspectorPlugin({
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
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    export default defineConfig({
      chainWebpack(memo) {
        memo.plugin('code-inspector-plugin').use(
          codeInspectorPlugin({
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
    import { codeInspectorPlugin } from 'code-inspector-plugin';

    export default defineConfig({
      // other config...
      mako: {
        plugins: [
          codeInspectorPlugin({
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
  import { codeInspectorPlugin } from 'code-inspector-plugin';

  export default defineConfig({
    vite: {
      plugins: [codeInspectorPlugin({ bundler: 'vite' })],
    },
  });
  ```

  </details>

</details>

## 💡 Real-World Workflows

### Traditional IDE Workflow

```
1. Hold Option+Shift (Mac) or Alt+Shift (Windows)
2. Hover over any element → see its source path
3. Click → IDE opens at exact line
```

Perfect for Cursor, VSCode, WebStorm users who live in their editor.

### AI-First Workflow (Vibe Coding)

```
1. Configure: defaultAction: 'copy', showSwitch: true
2. Hold Option+Shift, click element
3. Path copied: src/components/Button.tsx:42:10
4. Paste to Claude/Cursor: "@src/components/Button.tsx:42:10 fix this bug"
```

**The difference?** Instead of taking screenshots and describing bugs, you give AI the exact context in 3 seconds. This is how you debug in 2025.

### Hybrid Workflow

Press `Shift+Alt+C` / `Shift+Opt+C` to switch modes on the fly:
- Copy mode when working with AI
- IDE mode when you want to edit manually
- Copy+Open to do both

<img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/console-success.png" width="700px" />

## 👨‍💻 Contributors

Special thanks to the contributors of this project:<br />

<img src="https://contrib.rocks/image?repo=zh-lx/code-inspector" height="40" />

## 🔧 For Maintainers

If you're a contributor or maintainer, see the [Maintenance Guide](./docs/MAINTENANCE.md) for:
- Publishing to private registries (Cloudsmith)
- Release workflows
- Development setup
- Testing procedures

## 📧 Communication and Feedback

For any usage issues, please leave a message below my [Twitter](https://twitter.com/zhulxing312147) post or [submit an issue](https://github.com/zh-lx/code-inspector/issues) on Github.

For Chinese users, you can join the QQ group `769748484` or add the author's WeiXin account `zhoulx1688888` for consultation and feedback:

<div style="display: flex; column-gap: 16px; row-gap: 16px; flex-wrap: wrap;">
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/qq-group.png" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-group.jpg" width="200" height="272" />
  <img src="https://cdn.jsdelivr.net/gh/zh-lx/static-img/code-inspector/wx-qrcode.jpg" width="200" height="272" />
</div>

## 💖 Sponsor

Sponsoring this project can help the author create better. If you are willing, thanks for sponsoring me through [here](https://inspector.fe-dev.cn/en/more/sponsor.html).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=zh-lx/code-inspector&type=Date)](https://www.star-history.com/#zh-lx/code-inspector&Date)
