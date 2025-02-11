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
    if (_content.includes("windowKey") && _content.includes("localStorageKey")) {
        const { windowKey, localStorageKey } = this.getOptions() || {};

        _content = _content.replace(/const windowKey = \("[^"]*"\);/g, `${windowKey};`);
        _content = _content.replace(/const localStorageKey = \("[^"]*"\);/g, `${localStorageKey};`);
    }

    return _content;
};

module.exports = replaceNls;
