# 发布增强版到 npm

## 包信息

- **包名**: `@markshawn2020/code-inspector-plugin`
- **版本**: `1.2.10-enhanced.1`
- **特性**: 支持 Shift+Alt+C 切换 IDE/复制路径模式

## 发布步骤

### 1. 登录 npm

```bash
npm login
# 输入用户名、密码、邮箱和 OTP（如果启用了 2FA）
```

### 2. 发布包

```bash
cd packages/code-inspector-plugin
pnpm publish --access public
```

> **注意**: `--access public` 是必需的，因为 scoped packages 默认是私有的

### 3. 验证发布

```bash
npm view @markshawn2020/code-inspector-plugin
```

## 使用方法（发布后）

### 在新项目中集成（超简单）

```bash
# 1. 安装包
pnpm add -D @markshawn2020/code-inspector-plugin

# 2. 配置 Vite
# vite.config.ts
import { CodeInspectorPlugin } from '@markshawn2020/code-inspector-plugin'

export default defineConfig({
  plugins: [
    CodeInspectorPlugin({ bundler: 'vite' }),
    react(),
  ],
})

# 3. 启动开发服务器
pnpm dev
```

### 功能使用

- **Shift+Alt**: 激活代码检查器
- **Shift+Alt+C**: 切换 📝IDE / 📋复制 模式

## 与官方版本的区别

| 特性 | 官方版 | 增强版 |
|------|--------|--------|
| IDE 打开 | ✅ | ✅ |
| 复制路径 | ❌ | ✅ |
| 模式切换 | ❌ | ✅ (Shift+Alt+C) |
| Toast 提示 | ❌ | ✅ |
| 模式指示器 | ❌ | ✅ |

## 版本说明

- `1.2.10-enhanced.1`: 首个增强版发布
  - 基于官方 1.2.10 版本
  - 添加模式切换功能
  - 添加复制路径功能
