# monaco-editor-i18n-plugin

<a href="https://www.npmjs.com/package/monaco-editor-i18n-plugin"><img alt="NPM Status" src="https://img.shields.io/npm/v/monaco-editor-i18n-plugin.svg?style=flat"></a>

English | [简体中文](./README-zh_CN.md)

The purpose of this plugin is to set the interface language when using `monaco-editor`. The main implementation idea is to override the `monaco-editor/esm/vs/nls.js` file to achieve the effect of interface language switching.


## Version difference

- The 0.x: When your product only has one interface language (does not need to support internationalization, such as only supporting Chinese), please use version [0.x](https://github.com/DTStack/monaco-editor-i18n-plugin/tree/0.x-stable).
- The latest: When your product needs to support internationalization (the product page supports switching interface languages), please use the latest version.


## Install

`npm install monaco-editor-i18n-plugin -D`


## Languages

### dt-zh-hans (Simplified version for dtstack)

The used `src/locale/dt-zh-hans.json` is lite based on [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/release/1.63.3/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json).

### Simplified Chinese (Full version)

The used `src/locale/zh-hans.json` is from [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/release/1.63.3/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json)。

### custom languages

If you want to use another language or if the `src/locale/dt-zh-hans.json` doesn't meet your requirements, you can get another's JSON file from [vscode-loc/i18n](https://github.com/microsoft/vscode-loc/tree/release/1.63.3/i18n).


If you want to use another languages or if the simplified `src/scale/dt-zh-hans.json` file does not meet the requirements, you can find JSON files in other languages in [vscode-loc/i18n](https://github.com/microsoft/vscode-loc/tree/release/1.63.3/i18n), modify them, and place them in your project folder for custom path usage.


## Example usage

### configuration item

-   `ko.config.js` [ko - Project toolkit for React Applications](https://github.com/DTStack/ko)

```js
const MonacoEditorI18nPlugin = require('monaco-editor-i18n-plugin');

const plugin = [
    ...,
    {
        key: 'WebpackPlugin',
        action: 'add',
        opts: {
            name: 'MonacoEditorI18nPlugin',
            fn: () => {
                return new MonacoEditorI18nPlugin({
                    windowKey: '__DT_LOCALE__',
                    localStorageKey: 'dt-locale',
                });
            },
        },
    }
]
```

-   `webpack.config.js`

```js
const MonacoEditorI18nPlugin = require('monaco-editor-i18n-plugin');

module.exports = {
    ...,
    plugins: [
        new MonacoEditorI18nPlugin({
            windowKey: '__DT_LOCALE__',
            localStorageKey: 'dt-locale',
        })
    ],
    ...,
};
```

### Instructions

The interface language content used needs to be mounted on the `window` object in the engineering code, with the default key value is `__DT_LOCALE__`. `En US` is the default language for `monaco-editor`, and a value of an empty object is sufficient. The subsequent reading of interface language content will be done from the `window` object. The mounting example is as follows:

```js
import dtZhHans from 'monaco-editor-i18n-plugin/out/locale/dt-zh-hans.json';
import zhHant from './zh-hant.json';

// Mount the interface language content onto the window object
window.__DT_LOCALE__ = {
    'zh-hant': zhHant?.contents || {},
    'dt-zh-hans': dtZhHans?.contents || {},
    'en-US': {},
};
```

When switching interface languages, it is necessary to synchronize the language name to the localStorage. The switching example is as follows:

```js
function setLocale(value: string) {
    window.localStorage.setItem('dt-locale', value);
}

setLocale('dt-zh-hans');
```

> **Important**
>
> - If the interface language of `monaco-editor` does not change with the product page, please note that the mounting timing of `window.__DT_LOCALE__` should be as early as possible.


## Notice

-   The currently verified versions of `monaco-editor` are `0.30.1` and `0.31.1`.
-   The corresponding version of `vscode doc` is `1.63.3`.
-   If custom language doesn't work, it may be due to a mismatch between the versions of the two packages. The JSON file structure in later versions of `vscode-loc` has changed, so please verify it by yourself.
