import { CodeOptions } from '@markshawn/code-inspector-core';
interface Options extends CodeOptions {
    close?: boolean;
    output: string;
}
export declare function MakoCodeInspectorPlugin(options: Options): Record<string, any>;
export {};
