import type { PitchLoaderDefinitionFunction } from "webpack";
import { MonacoEditorI18nPlugin } from "..";

const replaceLocalize: PitchLoaderDefinitionFunction<MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts> = function (
    content: string
) {
    const pathRegExp = /monaco-editor[\\\/]esm[\\\/]vs.+\.js$/;
    if (!pathRegExp.test(this.resourcePath)) return content;

    const vsPath = this.resourcePath.split(/monaco-editor[\\\/]esm[\\\/]/).pop();
    if (!vsPath) return content;

    // add vscode-loc path to function localize
    const path = vsPath.replace(/\\/g, "/").replace(".js", "");
    return content.replace(/(\bfunction\s+localize\()|(\blocalize\()/g, function (text) {
        if (/function\s+localize/.test(text)) return text;
        return `localize('${path}', `;
    });
};

module.exports = replaceLocalize;
