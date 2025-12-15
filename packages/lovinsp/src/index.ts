import { ViteLovinspPlugin } from '@lovinsp/vite';
import WebpackLovinspPlugin from '@lovinsp/webpack';
import { EsbuildLovinspPlugin } from '@lovinsp/esbuild';
import { TurbopackLovinspPlugin } from '@lovinsp/turbopack';
import { MakoLovinspPlugin } from '@lovinsp/mako';
import {
  CodeOptions,
  getEnvVariable,
  resetFileRecord,
} from '@lovinsp/core';
import chalk from 'chalk';
import path from 'path';

export interface LovinspPluginOptions extends CodeOptions {
  /**
   * @zh 设置为 true 时，仅当 .env.local 文件存在且其包含 CODE_INSPECTOR=true 时插件生效；默认值为 false
   * @en When set the value to true, only if the .env.local file exists and it contains CODE_INSPECTOR=true, the plugin takes effect; The default value is false
   */
  needEnvInspector?: boolean;
}

export function LovinspPlugin(options: LovinspPluginOptions): any {
  // 没有 bundler 参数，报错
  if (!options?.bundler) {
    console.log(
      chalk.red(
        'Please specify the bundler in the options of lovinsp.'
      )
    );
    return;
  }
  // 判断是否只在本地启用
  let close = false;
  if (options.needEnvInspector) {
    close = true;
    if (getEnvVariable('CODE_INSPECTOR', process.cwd()) === 'true') {
      close = false;
    }
  }

  // Write generated files to user project's node_modules/.cache directory
  // This ensures relative imports work correctly with pnpm link
  const outputDir = path.resolve(process.cwd(), 'node_modules/.cache/lovinsp');

  const params = {
    ...options,
    close,
    output: outputDir,
  };
  resetFileRecord(params.output);
  if (options.bundler === 'webpack' || options.bundler === 'rspack') {
    // 使用 webpack 插件
    return new WebpackLovinspPlugin(params);
  } else if (options.bundler === 'esbuild') {
    return EsbuildLovinspPlugin(params);
  } else if (options.bundler === 'turbopack') {
    return TurbopackLovinspPlugin(params);
  } else if (options.bundler === 'mako') {
    return MakoLovinspPlugin(params);
  } else {
    // 使用 vite 插件
    return ViteLovinspPlugin(params);
  }
}

export const lovinspPlugin = LovinspPlugin;
