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
         * window key which has locale data
         * default value is '__DT_LOCALE__'
         */
        windowKey: string;

        /**
         * get locale from localStorage
         * default value is 'dt-locale'
         */
        localStorageKey: string;
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
        windowKey: "__DT_LOCALE__",
        localStorageKey: "dt-locale",
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
