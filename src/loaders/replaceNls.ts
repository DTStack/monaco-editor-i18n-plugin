import type { PitchLoaderDefinitionFunction } from "webpack";
import { MonacoEditorI18nPlugin } from "..";

const fs = require("fs");
const nls = require.resolve("../nls");

const replaceNls: PitchLoaderDefinitionFunction<MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts> = function (
    content: string
) {
    const pathRegExp = /monaco-editor[\\\/]esm[\\\/]vs[\\\/]nls\.js$/;
    if (!pathRegExp.test(this.resourcePath)) return content;

    let _content = fs.readFileSync(nls, { encoding: "utf8" });

    if (_content.includes("monaco-editor-i18n-plugin")) {
        // use locale or customLocalePath
        const { locale, customLocalePath } = this.getOptions() || {};

        let filePath = "monaco-editor-i18n-plugin/out/locale/dt-zh-hans.json";
        if (customLocalePath) {
            filePath = customLocalePath;
        } else if (locale === "zh-hans") {
            filePath = "monaco-editor-i18n-plugin/out/locale/zh-hans.json";
        } else {
            // locale default value is dt-zh-hans
            filePath = "monaco-editor-i18n-plugin/out/locale/dt-zh-hans.json";
        }
        _content = _content.replace(/require\("[^"]*"\);/g, `require("${filePath}");`);
    }

    return _content;
};

module.exports = replaceNls;
