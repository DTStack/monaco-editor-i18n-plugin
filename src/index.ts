/**
 * monaco-editor-i18n-plugin
 * This plugin is referenced from https://github.com/microsoft/monaco-editor/tree/main/webpack-plugin
 */

import type * as webpack from "webpack";

const replaceNls = require.resolve("./loaders/replaceNls");
const replaceLocalizeLoader = require.resolve("./loaders/replaceLocalize");

export declare namespace MonacoEditorI18nPlugin {
    interface IMonacoEditorI18nPluginOpts {
        /**
         * default is en-US
         */
        locale: "en-US" | "zh-hans" | "dt-zh-hans";

        /**
         * custom locale file path
         * eg: path.join(__dirname, './zh-hant.json')
         */
        customLocalePath?: string;
    }
}

// create rules loader
function createLoaderRules(options: MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts): webpack.RuleSetRule[] {
    return [
        {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            enforce: "pre",
            include: /[\\\/]monaco-editor[\\\/]esm/,
            use: [
                {
                    loader: replaceNls,
                    options,
                },
                {
                    loader: replaceLocalizeLoader,
                },
            ],
        },
    ];
}

// add webpack rules to webpack config
function addCompilerRules(compiler: webpack.Compiler, rules: webpack.RuleSetRule[]): void {
    const compilerOptions = compiler.options;
    if (!compilerOptions.module) {
        compilerOptions.module = <any>{ rules };
    } else {
        const moduleOptions = compilerOptions.module;
        moduleOptions.rules = (moduleOptions.rules || []).concat(rules);
    }
}

class MonacoEditorI18nPlugin {
    options: MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts = {
        locale: "en-US",
    };

    constructor(options: MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts) {
        this.options = options;
    }

    apply(compiler: webpack.Compiler): void {
        const rules = createLoaderRules(this.options);
        addCompilerRules(compiler, rules);
    }
}

module.exports = MonacoEditorI18nPlugin;
