import type { PitchLoaderDefinitionFunction } from "webpack";
import { MonacoEditorI18nPlugin } from "..";

const fs = require("fs");
const pathModule = require("path");

// replace monaco-editor/esm/vs/nls.messages.js
const replaceNlsMessages: PitchLoaderDefinitionFunction<MonacoEditorI18nPlugin.IMonacoEditorI18nPluginOpts> = function (
    content: string
) {
    const pathRegExp = /monaco-editor[\\\/]esm[\\\/]vs[\\\/]nls\.messages\.js$/;
    if (!pathRegExp.test(this.resourcePath)) return content;

    // Resolve nls.keys.json from monaco-editor package
    const esmDir = this.resourcePath.split(/[\\\/]vs[\\\/]nls\.messages\.js$/)[0];
    const nlsKeysPath = pathModule.join(esmDir, "nls.keys.json");
    const nlsKeys: [string, string[]][] = JSON.parse(fs.readFileSync(nlsKeysPath, "utf8"));

    // Build flat entries: [[modulePath, key, index], ...]
    // nls.keys.json may have duplicate keys (same key at multiple indices),
    // so we must track every index, not just the last one.
    const entries: [string, string, number][] = [];
    let idx = 0;
    for (const [modulePath, keys] of nlsKeys) {
        for (const key of keys) {
            entries.push([modulePath, key, idx++]);
        }
    }

    const { windowKey = "__DT_LOCALE__", localStorageKey = "dt-locale" } = this.getOptions() || {};

    return `
const _nlsEntries = ${JSON.stringify(entries)};

export function getNLSMessages() {
    if (typeof window === "undefined") return undefined;
    const locale = window.localStorage.getItem("${localStorageKey}") || "en-US";
    const localeData = window["${windowKey}"]?.[locale] || {};
    const messages = [];
    for (const [modulePath, key, index] of _nlsEntries) {
        const val = (localeData[modulePath] || {})[key];
        if (val !== undefined) messages[index] = val;
    }
    return messages;
}

export function getNLSLanguage() {
    if (typeof window === "undefined") return undefined;
    const locale = window.localStorage.getItem("${localStorageKey}") || "en-US";
    const map = { "en-US": "en", "zh-CN": "zh-cn" };
    return map[locale];
}
`;
};

module.exports = replaceNlsMessages;
