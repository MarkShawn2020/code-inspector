import { CodeOptions } from '@lovinsp/core';
interface Options extends CodeOptions {
    close?: boolean;
    output: string;
}
export declare function MakoLovinspPlugin(options: Options): Record<string, any>;
export {};
