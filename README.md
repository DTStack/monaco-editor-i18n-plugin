# monaco-editor-i18n-plugin

<a href="https://www.npmjs.com/package/monaco-editor-i18n-plugin"><img alt="NPM Status" src="https://img.shields.io/npm/v/monaco-editor-i18n-plugin.svg?style=flat"></a>

English | [简体中文](./README-zh_CN.md)

The purpose of this plugin is to set the language when using `monaco-editor`. The main implementation idea is to achieve language switching by overriding the `monaco-editor/esm/vs/nls.js`.

## Install

`npm install monaco-editor-i18n-plugin -D`

## Usage

### zh-hans

The default language is Simplified Chinese. The used `src/locale/dt-zh-hans.json` is based on [vscode-loc](https://github.com/microsoft/vscode-loc/blob/release/1.63.3/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json) lite.

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
                return new MonacoEditorI18nPlugin();
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
    plugins: [new MonacoEditorI18nPlugin()],
    ...,
};
```

### custom languages

If you want to use another language or if the `src/locale/dt-zh-hans.json` doesn't meet your requirements, you can get another's JSON file from [vscode-loc/i18n](https://github.com/microsoft/vscode-loc/tree/release/1.63.3/i18n).

```js
new MonacoEditorI18nPlugin({
    locale: "zh-hant", // Traditional Chinese
    customLocalePath: path.join(__dirname, "./zh-hant.json"),
});
```

## Notice

-   The currently verified versions of `monaco-editor` are `0.30.1` and `0.31.1`.
-   The version of `vscode-loc` is `1.63.3`.
-   If custom language doesn't work, it may be due to a mismatch between the versions of the two packages. The JSON file structure in later versions of `vscode-loc` has changed, so please verify it by yourself.
