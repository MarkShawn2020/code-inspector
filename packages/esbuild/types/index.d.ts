import { CodeOptions } from '@lovinsp/core';
interface Options extends CodeOptions {
    close?: boolean;
    output: string;
}
export declare function EsbuildLovinspPlugin(options: Options): {
    name: string;
    setup(build: any): void;
};
export {};
