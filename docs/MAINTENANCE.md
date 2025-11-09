# Maintenance Guide

This document contains maintenance and development workflows for code-inspector contributors and maintainers.

## 📦 Publishing to Private Registry (Cloudsmith)

If you want to publish this package to a private npm registry like Cloudsmith, follow these steps:

### Prerequisites

1. **Install Cloudsmith CLI**:
   ```bash
   pip3 install --user cloudsmith-cli
   ```

2. **Get your Cloudsmith API Key**:
   - Login to [Cloudsmith](https://cloudsmith.io/)
   - Navigate to Settings → API Keys
   - Create or copy your API key

### Publishing Packages

**1. Build all packages:**

```bash
cd packages
for dir in core vite webpack esbuild turbopack mako code-inspector-plugin; do
  echo "Building $dir..."
  cd $dir && pnpm build && cd ..
done
```

**2. Pack packages (this resolves `workspace:*` dependencies):**

```bash
for dir in core vite webpack esbuild turbopack mako code-inspector-plugin; do
  echo "Packing $dir..."
  cd $dir && pnpm pack && cd ..
done
```

**3. Publish to Cloudsmith:**

```bash
export CLOUDSMITH_API_KEY=your_api_key_here

for tarball in \
  packages/core/code-inspector-core-*.tgz \
  packages/vite/code-inspector-vite-*.tgz \
  packages/webpack/code-inspector-webpack-*.tgz \
  packages/esbuild/code-inspector-esbuild-*.tgz \
  packages/turbopack/code-inspector-turbopack-*.tgz \
  packages/mako/code-inspector-mako-*.tgz \
  packages/code-inspector-plugin/code-inspector-plugin-*.tgz; do
  echo "Publishing $(basename $tarball)..."
  cloudsmith push npm mark/code-inspector $tarball --republish
done
```

**4. Clean up:**

```bash
find packages -name "*.tgz" -delete
```

### Installing from Private Registry

**Method 1: Using tarball URL (Recommended)**

In your project's `package.json`:

```json
{
  "devDependencies": {
    "code-inspector-plugin": "https://npm.cloudsmith.io/mark/code-inspector/code-inspector-plugin/-/code-inspector-plugin-1.2.12.tgz"
  }
}
```

**Method 2: Using registry configuration**

Create `.npmrc` in your project root:

```ini
@code-inspector:registry=https://npm.cloudsmith.io/mark/code-inspector/
//npm.cloudsmith.io/mark/code-inspector/:_authToken=YOUR_API_KEY
//npm.cloudsmith.io/mark/code-inspector/:always-auth=true
```

Then in `package.json`:

```json
{
  "devDependencies": {
    "code-inspector-plugin": "1.2.12"
  }
}
```

### Important Notes

- **Security**: Never commit `.npmrc` with API keys to git. Add it to `.gitignore`
- **Workspace Dependencies**: Always use `pnpm pack` before publishing - it automatically resolves `workspace:*` dependencies to actual versions
- **Version Consistency**: Ensure all packages are at the same version before publishing
- **Republish**: Use `--republish` flag to overwrite existing versions if needed

### Next.js Integration Example

For Next.js 16 projects, use CommonJS config to avoid ESM compatibility issues:

```javascript
// next.config.js
const { codeInspectorPlugin } = require('code-inspector-plugin');

module.exports = {
  reactStrictMode: true,
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
    }
    return config;
  },
};
```

## 🚀 Release Workflow

### Version Management

```bash
# Bump patch version (1.2.11 → 1.2.12)
pnpm version:patch

# Bump minor version (1.2.12 → 1.3.0)
pnpm version:minor

# Bump major version (1.2.12 → 2.0.0)
pnpm version:major
```

### Building and Publishing

1. **Build all packages:**
   ```bash
   pnpm build
   ```

2. **Publish to npm:**
   ```bash
   pnpm pub
   ```

3. **Publish beta versions:**
   ```bash
   pnpm pub:beta
   ```

### Creating GitHub Releases

After publishing to npm, create a GitHub release:

```bash
gh release create vX.X.X \
  --title "vX.X.X" \
  --notes "Release notes here" \
  packages/core/code-inspector-core-*.tgz \
  packages/vite/code-inspector-vite-*.tgz \
  packages/webpack/code-inspector-webpack-*.tgz \
  packages/esbuild/code-inspector-esbuild-*.tgz \
  packages/turbopack/code-inspector-turbopack-*.tgz \
  packages/mako/code-inspector-mako-*.tgz \
  packages/code-inspector-plugin/code-inspector-plugin-*.tgz
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test
pnpm test -- -t "test name"

# Run specific test file
pnpm test -- path/to/test
```

## 📝 Documentation

### Building Documentation

```bash
# Build documentation site + create ZIP archive
pnpm build:docs

# Deploy documentation
pnpm deploy:docs
```

### Documentation Structure

- `/docs/en/` - English documentation
- `/docs/zh/` - Chinese documentation
- `/docs/fixes/` - Technical troubleshooting guides
- `/docs/MAINTENANCE.md` - This file

## 🔧 Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Build all packages (runs automatically after install)
pnpm build

# Develop specific package
cd packages/core
pnpm dev

# Watch mode for client component
cd packages/core
pnpm build:client:watch
```

### Testing Changes with Demo Projects

```bash
cd demos/vite-react  # or any other demo
pnpm dev
```

## 📊 Project Structure

```
code-inspector/
├── packages/           # Core packages
│   ├── core/          # Core transformation & server logic
│   ├── vite/          # Vite plugin
│   ├── webpack/       # Webpack plugin
│   ├── esbuild/       # Esbuild plugin
│   ├── turbopack/     # Turbopack rules
│   ├── mako/          # Mako plugin
│   └── code-inspector-plugin/  # Main entry point
├── demos/             # Demo projects for testing
├── docs/              # Documentation site
└── test/              # Test files
```

## 🤝 Contributing

When contributing to this project:

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Add tests for new features
4. Update documentation as needed
5. Submit a pull request

### Commit Message Convention

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `test:` - Test updates
- `refactor:` - Code refactoring

## 📧 Support

For maintenance-related questions, contact the maintainers through:
- GitHub Issues: https://github.com/zh-lx/code-inspector/issues
- Twitter: [@zhulxing312147](https://twitter.com/zhulxing312147)
