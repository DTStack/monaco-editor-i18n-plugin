# monaco-editor-i18n-plugin

<a href="https://www.npmjs.com/package/monaco-editor-i18n-plugin"><img alt="NPM Status" src="https://img.shields.io/npm/v/monaco-editor-i18n-plugin.svg?style=flat"></a>

[English](./README.md) | 简体中文

这个插件的作用是在使用 `monaco-editor` 时可以设置界面语言，主要实现思路是通过覆写 `monaco-editor/esm/vs/nls.js` 文件来实现界面语言切换的效果。


## 版本差异

`2.x` 和 `1.x` 的主要区别在于 `monaco-editor` 的版本。

- 2.x 版本：当你的产品需要支持国际化时（产品页面支持切换界面语言），可以使用 [2.x](https://github.com/DTStack/monaco-editor-i18n-plugin/tree/master) 的版本，已验证 monaco-editor `0.52.2` 版本。
- 1.x 版本：当你的产品需要支持国际化时（产品页面支持切换界面语言），请使用 [1.x](https://github.com/DTStack/monaco-editor-i18n-plugin/tree/1.x-stable) 的版本，已验证 monaco-editor `0.30.1` 和 `0.31.1` 版本。
- 0.x 版本：当你的产品只有一种界面语言时（不需要支持国际化，如仅支持中文），请使用 [0.x](https://github.com/DTStack/monaco-editor-i18n-plugin/tree/0.x-stable) 的版本，已验证 monaco-editor `0.30.1` 和 `0.31.1` 版本。


## 安装

- `npm install monaco-editor-i18n-plugin -D`


## 语言

### 简体中文（精简版）

使用到的 `src/locale/dt-zh-hans.json` 是基于 [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/v1.96.2024121109/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json) 精简的。

### 简体中文（完整版）

使用到的 `src/locale/zh-hans.json` 来源为 [vscode-loc/i18n/zh-hans](https://github.com/microsoft/vscode-loc/blob/v1.96.2024121109/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json)。

### 自定义语言

如果你想使用其他语言或者精简后的 `src/locale/dt-zh-hans.json` 文件不能满足要求，你可以在 [vscode-loc/i18n](https://github.com/microsoft/vscode-loc/tree/v1.96.2024121109/i18n) 找到其他语言的 JSON 文件，放入你的工程文件夹下以便使用自定义路径。


## 使用示例

### 配置项

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

### 使用说明

需要在工程代码中将使用到的界面语言内容挂载到 `window` 对象上，key 默认值为 `__DT_LOCALE__`。`en-US` 为 `monaco-editor` 的默认语言，值为空对象即可。后续读取界面语言内容将从 `window` 对象中读取。挂载示例如下：

```js
import dtZhHans from 'monaco-editor-i18n-plugin/out/locale/dt-zh-hans.json';
import zhHant from './zh-hant.json';

// 将界面语言内容挂载到 window 对象上
window.__DT_LOCALE__ = {
    'zh-hant': zhHant?.contents || {},
    'dt-zh-hans': dtZhHans?.contents || {},
    'en-US': {},
};
```

切换界面语言时需要同步将语言名称存到 localStorage 中。切换示例如下：

```js
function setLocale(value: string) {
    window.localStorage.setItem('dt-locale', value);
}

setLocale('dt-zh-hans');
```

> **注意**
>
> - 如果 `monaco-editor` 的界面语言没有随产品页面变化，请注意 `window.__DT_LOCALE__` 的挂载时机应尽可能的早。


## 注意事项

- 目前验证的 `monaco-editor` 版本为 `0.52.2`。
- 对应的 `vscode-loc` 版本为 `1.91.1`。
- 如果自定义语言不生效，可能是上述两个包的版本没有对应，`vscode-loc` 不同版本的 JSON 文件结构是有变化的（如 1.63.3 和 1.91.1），其他版本请自行验证。
