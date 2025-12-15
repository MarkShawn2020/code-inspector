<div align="center">
<img src="https://github.com/MarkShawn2020/lovinsp/assets/73059627/842c3e88-dca7-4743-854c-d61093d3d34f" width="160px" style="margin-bottom: 12px;" />

<p align="center">
  <h2>code-inspector (AI-Enhanced Fork)</h2>
  <b>Fork of <a href="https://github.com/MarkShawn2020/lovinsp">MarkShawn2020/lovinsp</a> with AI-first workflow enhancements</b>
</p>

[![Original Repo](https://img.shields.io/badge/upstream-zh--lx%2Fcode--inspector-blue)](https://github.com/MarkShawn2020/lovinsp)
[![Fork Version](https://img.shields.io/badge/fork-v1.4.4-green)](https://github.com/MarkShawn2020/code-inspector)
[![MIT-license](https://img.shields.io/npm/l/code-inspector.svg)](https://opensource.org/licenses/MIT)

</div>

<hr />

## 🎯 Why This Fork?

This is an enhanced fork of [lovinsp](https://github.com/MarkShawn2020/lovinsp) with **AI-first workflow improvements**.

The original plugin is excellent for traditional IDE workflows (click → open in VSCode/Cursor). But if you're doing **Vibe Coding** (living in Claude Code, Cursor Composer, or any AI chat interface), you need a different workflow:

> **"I don't want to open my IDE. I want to copy the file path and paste it to my AI assistant."**

### 🆕 What's New in This Fork (v1.4.4)

- **📋 Copy Mode**: Click to copy file paths instead of opening IDE
  - Visual toast notifications when copying
  - Perfect for `@`-mentioning files in AI chats
  - Format: `src/components/Button.tsx:42:10`

- **⌨️ Mode Switching**: Press `Shift+Alt+C` / `Shift+Opt+C` to cycle through modes:
  - Copy Path (AI workflow)
  - Open in IDE (traditional workflow)
  - Copy + Open (hybrid workflow)
  - Open Target (custom URL)

- **🔄 Dynamic Context Menu**: Right-click shows component hierarchy, all actions respect current mode

- **🎨 Polished UX**: Toast notifications, dynamic panel titles, unified interaction model

- **🧹 Simplified UI (v1.4.4)**: Removed floating switch button for cleaner interface

**In short**: Give AI your exact code context in 3 seconds, not 3 minutes of screenshot describing.

📚 **For original features** (framework support, IDE support, core functionality), see [upstream docs](https://inspector.fe-dev.cn/en)

## 🚀 Installation

Since this is a fork, you need to install from our private registry (Cloudsmith) instead of npm.

### Step 1: Configure Registry for Scoped Packages

Create or update `.npmrc` in your project root:

```ini
@code-inspector:registry=https://npm.cloudsmith.io/mark/code-inspector/
```

This tells npm/pnpm to fetch `@code-inspector/*` packages from Cloudsmith instead of npm.

### Step 2: Install Main Package

```bash
pnpm add lovinsp@https://npm.cloudsmith.io/mark/code-inspector/lovinsp/-/lovinsp-1.4.4.tgz
```

> **Why both steps?** The main package `lovinsp` uses direct URL. But it depends on scoped packages like `@lovinsp/core`, `@lovinsp/vite`, etc. The `.npmrc` config ensures these dependencies are also fetched from Cloudsmith.

> **Why Cloudsmith?** We use the same package name as upstream, so we need a private registry. Cloudsmith automatically proxies other npm packages, so only `code-inspector` related packages come from our registry.

## 🎮 Usage

### Quick Start (AI Workflow)

```js
// vite.config.js
import { lovinspPlugin } from 'lovinsp';

export default {
  plugins: [
    lovinspPlugin({
      bundler: 'vite',
      behavior: {
        defaultAction: 'copy',  // 👈 Copy mode for AI workflow
      },
    }),
  ],
};
```

Now:
1. Run your dev server
2. Hold `Option+Shift` (Mac) or `Alt+Shift` (Windows)
3. Click any element → path copied!
4. Paste to Claude: `@src/components/Button.tsx:42:10 fix this`

### Traditional IDE Workflow

```js
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    defaultAction: 'locate',  // Opens IDE instead of copying
  },
})
```

### Hybrid Workflow

```js
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    defaultAction: 'copy',
    copy: true,
    locate: true,
  },
})
```

Press `Shift+Alt+C` / `Shift+Opt+C` to switch between copy and IDE modes on the fly.

### All Options

```js
lovinspPlugin({
  bundler: 'vite',              // Required: 'vite' | 'webpack' | 'rspack' | etc.
  behavior: {
    defaultAction: 'copy',      // 'copy' | 'locate' | 'target' | 'all'
    copy: true,                 // Enable copy mode
    locate: true,               // Enable IDE opening
    target: 'custom-url-{file}', // Custom URL template
  },
  editor: 'vscode',             // IDE (auto-detected if not specified)
})
```

📚 **For framework-specific setup** (Next.js, Nuxt, etc.), **bundler options**, and **advanced configs**, see [upstream docs](https://inspector.fe-dev.cn/en/guide/start.html)

## 🎬 Demo

![](https://the-dummy.oss-cn-beijing.aliyuncs.com/undefinedCC%E4%B8%8A%E4%B8%8B%E6%96%87%E6%9C%BA%E5%88%B6-2025-11-05-140011.png)

**Left**: Traditional workflow - taking screenshots, describing bugs
**Right**: AI-enhanced workflow - 3 seconds, exact context

## 🤝 Upstream & Contributing

This fork tracks [MarkShawn2020/lovinsp](https://github.com/MarkShawn2020/lovinsp). We maintain compatibility with upstream and contribute improvements back when possible.

**Upstream PRs**:
- ✅ [#409 - Mode switching features](https://github.com/MarkShawn2020/lovinsp/pull/409) - **MERGED!** 🎉
- 🔄 [#420 - Right-click mode support + notifications](https://github.com/MarkShawn2020/lovinsp/pull/420) - Under review

If you want these features in the official version, please 👍 the PRs or leave comments!

## 📖 Documentation

- **Upstream Docs**: [inspector.fe-dev.cn](https://inspector.fe-dev.cn/en) - Full feature list, all framework configs
- **This Fork**: Focus on AI-enhanced features above
- **Maintenance**: See [MAINTENANCE.md](./docs/MAINTENANCE.md) for development workflow

<details>
<summary><b>🔧 For Reference: Detailed Framework Configs (from upstream)</b></summary>

> **Note**: These are reference configs from upstream. Our fork works exactly the same way, just install from Cloudsmith instead of npm.

### Webpack

  <details>
    <summary>Click to expand</summary>

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

</details>

## 🔧 Development & Maintenance

- **Fork Maintainer**: [@MarkShawn2020](https://github.com/MarkShawn2020)
- **Maintenance Guide**: [MAINTENANCE.md](./docs/MAINTENANCE.md) - Publishing, releases, development setup
- **Issues**: Report fork-specific issues [here](https://github.com/MarkShawn2020/code-inspector/issues)
- **Upstream Issues**: Report general issues to [MarkShawn2020/lovinsp](https://github.com/MarkShawn2020/lovinsp/issues)

## 🌟 Credits

- **Original Author**: [@zh-lx](https://github.com/zh-lx) - Huge thanks for creating this amazing tool!
- **Original Repo**: [MarkShawn2020/lovinsp](https://github.com/MarkShawn2020/lovinsp)
- **Contributors**: <img src="https://contrib.rocks/image?repo=MarkShawn2020/lovinsp" height="20" />

## 📧 Support

- **Fork Questions**: Open an issue on [this repo](https://github.com/MarkShawn2020/code-inspector/issues)
- **General Questions**: Visit [upstream docs](https://inspector.fe-dev.cn/en) or [upstream repo](https://github.com/MarkShawn2020/lovinsp)
- **Original Author**: Follow [@zh-lx on Twitter](https://twitter.com/zhulxing312147) or [sponsor the project](https://inspector.fe-dev.cn/en/more/sponsor.html)

---

**Love this fork?** Consider:
- ⭐ Starring [this repo](https://github.com/MarkShawn2020/code-inspector)
- ⭐ Starring the [original repo](https://github.com/MarkShawn2020/lovinsp)
- 👍 Supporting [the upstream PR #409](https://github.com/MarkShawn2020/lovinsp/pull/409) to get these features merged!

**Built for developers who believe AI should know exactly where the code is.** 🚀
