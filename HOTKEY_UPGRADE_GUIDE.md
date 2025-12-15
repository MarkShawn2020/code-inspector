# 快捷键系统升级指南

## 变更摘要

从 v1.2.12 开始，code-inspector 支持为不同操作配置独立的快捷键，提供更直观的交互体验。

### 主要变更

| 功能 | 旧版本 | 新版本 |
|------|--------|--------|
| 模式切换 | Shift+Alt+C 循环切换 | 已移除 |
| Copy 模式 | Shift+Alt (默认模式) | **Shift+Alt** (默认) |
| IDE 模式 | Shift+Alt (切换后) | **Shift+Alt+Cmd** (Mac) / **Shift+Alt+Ctrl** (Windows) |
| 配置方式 | `defaultAction` | `behavior.keys` |

## 新特性

### 1. 独立快捷键模式

**默认行为（无需配置）：**
```typescript
// Mac
Shift + Alt          → 复制路径到剪贴板
Shift + Alt + Cmd    → 在 IDE 中打开

// Windows/Linux
Shift + Alt          → 复制路径到剪贴板
Shift + Alt + Ctrl   → 在 IDE 中打开
```

### 2. 自定义快捷键

通过 `behavior.keys` 配置不同操作的快捷键：

```typescript
// vite.config.ts
import { lovinspPlugin } from 'lovinsp';

export default {
  plugins: [
    lovinspPlugin({
      bundler: 'vite',
      behavior: {
        copy: true,
        locate: true,
        keys: {
          // 自定义 copy 操作的快捷键
          copy: ['altKey', 'shiftKey'],
          // 自定义 locate 操作的快捷键 (打开 IDE)
          locate: ['metaKey', 'altKey', 'shiftKey'],
          // 可选：配置 target 操作
          target: ['ctrlKey', 'shiftKey'],
        }
      }
    })
  ]
};
```

### 3. 禁用特定操作

设置为 `false` 可禁用某个操作：

```typescript
behavior: {
  copy: true,
  locate: false, // 禁用 IDE 跳转功能
  keys: {
    copy: ['shiftKey', 'altKey'],
    locate: false, // 不配置快捷键
  }
}
```

## 迁移指南

### 场景 1：使用默认配置（推荐）

**旧版本：**
```typescript
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    defaultAction: 'copy'
  }
})
```

**新版本：**
```typescript
lovinspPlugin({
  bundler: 'vite',
  // 不需要配置，默认行为已优化：
  // - Shift+Alt: copy
  // - Shift+Alt+Cmd/Ctrl: locate
})
```

### 场景 2：只需要复制功能

**旧版本：**
```typescript
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    locate: false,
    copy: true,
    defaultAction: 'copy'
  }
})
```

**新版本：**
```typescript
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    locate: false,  // 禁用 IDE 打开
    copy: true,
    keys: {
      copy: ['shiftKey', 'altKey']
    }
  }
})
```

### 场景 3：自定义快捷键

**新版本独有功能：**
```typescript
lovinspPlugin({
  bundler: 'vite',
  behavior: {
    copy: true,
    locate: true,
    keys: {
      // Mac 用户: Cmd+Shift 复制
      copy: ['metaKey', 'shiftKey'],
      // Cmd+Shift+Alt 打开 IDE
      locate: ['metaKey', 'shiftKey', 'altKey']
    }
  }
})
```

## TypeScript 类型定义

```typescript
type HotKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey';

type BehaviorKeys = {
  copy?: HotKey[] | false;
  locate?: HotKey[] | false;
  target?: HotKey[] | false;
};

type Behavior = {
  locate?: boolean;
  copy?: boolean | string;
  target?: string;
  defaultAction?: 'copy' | 'locate' | 'target' | 'all';
  keys?: BehaviorKeys; // 新增
};
```

## UI 变化

### 控制台提示

**旧版：**
```
[lovinsp] Press and hold Shift+Alt to enable. (Mode: Copy · Shift+Alt+C to switch)
```

**新版：**
```
[lovinsp] Press and hold: Shift+Alt to copy path · Shift+Alt+Cmd to open in IDE
```

### 元素信息弹窗

**旧版：**
```
<Component>
Mode: Copy Path · Shift+Opt+C to switch
path/to/file.tsx:10:5
```

**新版：**
```
<Component>
Shift+Opt=Copy · Shift+Opt+Cmd=IDE
path/to/file.tsx:10:5
```

### 右键图层面板

**新功能：实时模式响应**

右键打开图层面板时，标题会实时显示当前按下的快捷键对应的操作模式：

```
默认状态：     🔍️ Click node · Copy Path
按住 Shift+Alt+Cmd： 🔍️ Click node · Open in IDE
```

点击图层面板中的任意节点时，会执行当前按下的快捷键对应的操作，提供与直接点击元素一致的体验。

## 技术实现细节

### 快捷键冲突解决

系统自动按键数降序检测，避免快捷键冲突：

1. 先检测 3 个键的组合 (`Shift+Alt+Cmd`)
2. 再检测 2 个键的组合 (`Shift+Alt`)

这确保了 `Shift+Alt+Cmd` 不会误触发 `Shift+Alt` 的操作。

### 平台检测

系统会自动检测用户的操作系统：
- **Mac/iOS**: `metaKey` = Cmd 键
- **Windows/Linux**: `ctrlKey` = Ctrl 键

默认配置会自动适配平台差异。

## 常见问题

### Q: 旧版的 `defaultAction` 还能用吗？
A: 可以。如果没有配置 `behavior.keys`，系统会回退到旧的 `defaultAction` 模式，保持向后兼容。

### Q: 如何完全禁用快捷键？
A: 设置 `hotKeys: false` 可禁用所有快捷键触发。

### Q: 快捷键冲突怎么办？
A: 系统会按键数从多到少检测，确保长组合键优先。建议不同操作的键数差异至少为 1。

### Q: 可以配置单个修饰键吗？
A: 技术上可以，但不推荐。建议至少使用 2 个修饰键的组合，避免与浏览器/系统快捷键冲突。

## 反馈

如有问题请在 GitHub 提 Issue: https://github.com/MarkShawn2020/lovinsp/issues
