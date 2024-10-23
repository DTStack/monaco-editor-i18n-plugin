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

    // use user custom locale file path
    const { customLocalePath } = this.getOptions() || {};
    if (customLocalePath && _content.includes("monaco-editor-i18n-plugin")) {
        _content = _content.replace(/require\("[^"]*"\);/g, `require("${customLocalePath}");`);
    }

    return _content;
};

module.exports = replaceNls;
