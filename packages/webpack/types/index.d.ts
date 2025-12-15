import { CodeOptions } from '@lovinsp/core';
interface Options extends CodeOptions {
    close?: boolean;
    output: string;
}
declare class WebpackLovinspPlugin {
    options: Options;
    constructor(options: Options);
    apply(compiler: any): Promise<void>;
}
export default WebpackLovinspPlugin;
