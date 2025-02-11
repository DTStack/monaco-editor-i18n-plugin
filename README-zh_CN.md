# monaco-editor-i18n-plugin

<a href="https://www.npmjs.com/package/monaco-editor-i18n-plugin"><img alt="NPM Status" src="https://img.shields.io/npm/v/monaco-editor-i18n-plugin.svg?style=flat"></a>

[English](./README.md) | 简体中文

这个插件的作用是在使用 `monaco-editor` 时可以设置语言，主要实现思路是通过覆写 `monaco-editor/esm/vs/nls.js` 文件来实现语言切换的效果。

## 安装

`npm install monaco-editor-i18n-plugin -D`

## 使用

### 简体中文（精简版）

使用到的 `src/locale/dt-zh-hans.json` 是基于 [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/release/1.63.3/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json) 精简的。

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
                    locale: "dt-zh-hans",
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
            locale: "dt-zh-hans",
        })
    ],
    ...,
};
```

### 简体中文

使用到的 `src/locale/zh-hans.json` 来源为 [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/release/1.63.3/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json)。

```js
new MonacoEditorI18nPlugin({
    locale: "zh-hans",
});
```

### 自定义语言

如果你想使用其他语言或者精简后的 `src/locale/dt-zh-hans.json` 文件不能满足要求，你可以在 [vscode-loc/i18n](https://github.com/microsoft/vscode-loc/tree/release/1.63.3/i18n) 找到其他语言的 JSON 文件。

```js
new MonacoEditorI18nPlugin({
    customLocalePath: path.join(__dirname, "./zh-hant.json"), // 繁体中文
});
```

## 注意事项

-   目前验证的 `monaco-editor` 版本为 `0.30.1` 和 `0.31.1`
-   `vscode-loc` 的版本为 `1.63.3`
-   如果自定义语言不生效，可能是上述两个包的版本没有对应，`vscode-loc` 后续版本的 JSON 文件结构是有变化的，请自行验证。
