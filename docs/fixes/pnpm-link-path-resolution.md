# Fix: pnpm link Path Resolution Issue

## Problem

When `code-inspector-plugin` is linked via `pnpm link` for local development, the application fails with `MODULE_NOT_FOUND` error:

```
Error: Cannot find module 'code-inspector-plugin/dist/append-code-5678.js'
```

## Root Cause

### Original Implementation

In `/packages/core/src/server/use-client.ts:376-386`, the code generated an NPM-style import path:

```typescript
function writeWebComponentFile(targetPath: string, content: string, port: number) {
  const webComponentFileName = `append-code-${port}.js`;
  const webComponentNpmPath = `code-inspector-plugin/dist/${webComponentFileName}`; // ❌ Hardcoded
  const webComponentFilePath = path.resolve(targetPath, webComponentFileName);
  fs.writeFileSync(webComponentFilePath, content, 'utf-8');
  return webComponentNpmPath;
}
```

### Why It Failed with pnpm link

1. **File Write Location**: File is written to the plugin's dist directory (follows symlink to real path)
   ```
   /Users/mark/projects/code-inspector/packages/code-inspector-plugin/dist/append-code-5678.js
   ```

2. **Import Resolution**: Generated code tries to import using NPM specifier:
   ```typescript
   import CodeInspectorEmptyElement from 'code-inspector-plugin/dist/append-code-5678.js';
   ```

3. **Resolution Mismatch**: Node.js resolves from consumer project's node_modules:
   ```
   /Users/mark/projects/user-app/node_modules/code-inspector-plugin/dist/append-code-5678.js
   ```

4. **Result**: File exists at write location but not at resolution location → **MODULE_NOT_FOUND**

### Why It Worked with Normal Installation

In normal `npm install`, both locations are the same:
- Write location: `/project/node_modules/code-inspector-plugin/dist/append-code-5678.js`
- Resolution location: `/project/node_modules/code-inspector-plugin/dist/append-code-5678.js`

## Solution

Replace the hardcoded NPM-style path with an absolute file path:

```typescript
function writeWebComponentFile(targetPath: string, content: string, port: number) {
  const webComponentFileName = `append-code-${port}.js`;
  const webComponentFilePath = path.resolve(targetPath, webComponentFileName);
  fs.writeFileSync(webComponentFilePath, content, 'utf-8');

  // Use absolute path for compatibility with pnpm link, npm link, and yarn link
  // This ensures the file can be resolved regardless of symlink configurations
  return normalizePath(webComponentFilePath); // ✅ Absolute path
}
```

### Why This Works

1. **Direct File Reference**: Import uses the exact location where the file was written
2. **Symlink-Agnostic**: Works whether plugin is symlinked or installed normally
3. **Cross-Platform**: `normalizePath()` ensures forward slashes on all platforms
4. **No Resolution Ambiguity**: Absolute paths bypass Node.js module resolution

## Impact

### Positive
- ✅ Works with `pnpm link` for local development
- ✅ Works with `npm link` and `yarn link`
- ✅ Still works with normal package installation
- ✅ No changes needed in consuming projects
- ✅ Cross-platform compatible

### Considerations
- Generated code now contains absolute paths (visible in source maps/debugging)
- Paths are longer but more explicit

## Testing

### Manual Test Scenario

```bash
# Terminal 1: Link the package
cd /path/to/code-inspector
pnpm build
pnpm link --global

# Terminal 2: Use in another project
cd /path/to/your-project
pnpm link --global code-inspector-plugin

# Configure in vite.config.ts
import { CodeInspectorPlugin } from 'code-inspector-plugin';

export default {
  plugins: [
    CodeInspectorPlugin({ bundler: 'vite' })
  ]
}

# Run dev server
pnpm dev

# Expected: No MODULE_NOT_FOUND errors
```

### Verification

The fix generates imports like:
```typescript
// Before (broken with pnpm link):
import CodeInspectorEmptyElement from 'code-inspector-plugin/dist/append-code-5678.js';

// After (works everywhere):
import CodeInspectorEmptyElement from '/Users/mark/projects/user-app/node_modules/code-inspector-plugin/dist/append-code-5678.js';
```

## Alternative Solutions Considered

### 1. Write to Consumer's node_modules
**Rejected**: Complex logic, fails in monorepos, permission issues

### 2. Resolve Symlinks Before Path Construction
**Rejected**: Doesn't solve import vs file location mismatch

### 3. Dynamic Import via Data URL
**Rejected**: Debugging difficulties, bundle size concerns

### 4. Hybrid require.resolve Approach
**Rejected**: Overly complex, mixed path styles

## Files Changed

- `/packages/core/src/server/use-client.ts:376-388` - Changed `writeWebComponentFile` to return absolute paths

## Version

Fixed in: v1.2.11 (pending release)

## Related Issues

- Solves MODULE_NOT_FOUND when using `pnpm link`
- Fixes development workflow for contributors
- Enables testing unpublished changes in real projects

## References

- [pnpm link documentation](https://pnpm.io/cli/link)
- [Node.js Module Resolution](https://nodejs.org/api/modules.html#all-together)
- [Package exports](https://nodejs.org/api/packages.html#subpath-exports)
