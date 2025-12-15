<div align="center">

# Lovinsp

**Click any DOM element → Jump to source code in your IDE**

[![npm version](https://img.shields.io/npm/v/lovinsp.svg)](https://www.npmjs.com/package/lovinsp)
[![npm downloads](https://img.shields.io/npm/dm/lovinsp.svg)](https://www.npmjs.com/package/lovinsp)
[![MIT License](https://img.shields.io/npm/l/lovinsp.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Features

- **Click-to-Code**: Hold hotkey + click any element to open its source in your IDE
- **Copy Path Mode**: Copy file paths for AI-assisted coding workflows
- **Multi-Framework**: Vue, React, Svelte, Solid, Astro, Preact, Qwik
- **Multi-Bundler**: Vite, Webpack, Rspack, Esbuild, Turbopack, Farm, Mako
- **IDE Support**: VSCode, Cursor, WebStorm, and more

## Installation

```bash
npm install lovinsp
# or
pnpm add lovinsp
```

## Quick Start

### Vite

```js
// vite.config.js
import { lovinspPlugin } from 'lovinsp';

export default {
  plugins: [
    lovinspPlugin({ bundler: 'vite' })
  ]
};
```

### Webpack

```js
// webpack.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = {
  plugins: [
    lovinspPlugin({ bundler: 'webpack' })
  ]
};
```

### Next.js (Turbopack)

```js
// next.config.js
import { lovinspPlugin } from 'lovinsp';

export default {
  turbopack: {
    rules: lovinspPlugin({ bundler: 'turbopack' })
  }
};
```

## Usage

1. Start your dev server
2. Hold `Option+Shift` (Mac) or `Alt+Shift` (Windows)
3. Click any element
4. Your IDE opens at the exact source location

### Hotkeys

| Mode | Mac | Windows |
|------|-----|---------|
| Copy Path | `Shift+Option` | `Shift+Alt` |
| Open IDE | `Shift+Option+Cmd` | `Shift+Alt+Ctrl` |

### Configuration

```js
lovinspPlugin({
  bundler: 'vite',           // Required: 'vite' | 'webpack' | 'rspack' | 'esbuild' | 'turbopack' | 'mako'
  editor: 'vscode',          // IDE to open (auto-detected)
  behavior: {
    defaultAction: 'copy',   // 'copy' | 'locate' | 'target' | 'all'
    copy: true,              // Enable copy mode
    locate: true,            // Enable IDE opening
  },
  hotKeys: ['shiftKey', 'altKey'],  // Custom hotkeys
  hideConsole: false,        // Hide console hints
})
```

## Bundler Support

<details>
<summary><b>All bundler configurations</b></summary>

### Rspack / Rsbuild

```js
// rspack.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = {
  plugins: [lovinspPlugin({ bundler: 'rspack' })]
};
```

### Esbuild

```js
const { lovinspPlugin } = require('lovinsp');

esbuild.build({
  plugins: [lovinspPlugin({ bundler: 'esbuild', dev: () => true })]
});
```

### Nuxt

```js
// nuxt.config.js
import { lovinspPlugin } from 'lovinsp';

export default defineNuxtConfig({
  vite: {
    plugins: [lovinspPlugin({ bundler: 'vite' })]
  }
});
```

### Astro

```js
// astro.config.mjs
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  vite: {
    plugins: [lovinspPlugin({ bundler: 'vite' })]
  }
});
```

### UmiJS (with Mako)

```js
// .umirc.ts
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  mako: {
    plugins: [lovinspPlugin({ bundler: 'mako' })]
  }
});
```

### Vue CLI

```js
// vue.config.js
const { lovinspPlugin } = require('lovinsp');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('lovinsp').use(lovinspPlugin({ bundler: 'webpack' }));
  }
};
```

### Farm

```js
// farm.config.js
import { lovinspPlugin } from 'lovinsp';

export default defineConfig({
  vitePlugins: [lovinspPlugin({ bundler: 'vite' })]
});
```

</details>

## Packages

| Package | Description |
|---------|-------------|
| [`lovinsp`](https://www.npmjs.com/package/lovinsp) | Main plugin (use this) |
| [`@lovinsp/core`](https://www.npmjs.com/package/@lovinsp/core) | Core logic |
| [`@lovinsp/vite`](https://www.npmjs.com/package/@lovinsp/vite) | Vite adapter |
| [`@lovinsp/webpack`](https://www.npmjs.com/package/@lovinsp/webpack) | Webpack adapter |
| [`@lovinsp/esbuild`](https://www.npmjs.com/package/@lovinsp/esbuild) | Esbuild adapter |
| [`@lovinsp/turbopack`](https://www.npmjs.com/package/@lovinsp/turbopack) | Turbopack adapter |
| [`@lovinsp/mako`](https://www.npmjs.com/package/@lovinsp/mako) | Mako adapter |

## Credits

Based on [code-inspector](https://github.com/zh-lx/code-inspector) by [@zh-lx](https://github.com/zh-lx).

## License

MIT
