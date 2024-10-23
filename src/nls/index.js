module.exports["localize"] = module.exports["loadMessageBundle"] = module.exports["config"] = null;

// This file is condensed from vscode-loc 1.63.3
const localeData = require("monaco-editor-i18n-plugin/out/locale/dt-zh-hans.json");

// replace monaco-editor/esm/vs/nls.js _format
function _format(message, args) {
    let result;
    if (args.length === 0) {
        result = message;
    } else {
        result = String(message).replace(/\{(\d+)\}/g, function (match, rest) {
            const index = rest[0];
            return typeof args[index] !== "undefined" ? args[index] : match;
        });
    }
    return result;
}

// replace monaco-editor/esm/vs/nls.js localize
function localize(path, data, defaultMessage) {
    const key = typeof data === "object" ? data.key : data;
    const _data = localeData ? localeData.contents : {};
    let message = (_data[path] || {})[key];
    if (!message) {
        message = defaultMessage;
    }
    const args = [];
    for (let _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return _format(message, args);
}
module.exports["localize"] = localize;

function loadMessageBundle(_file) {
    return localize;
}
module.exports["loadMessageBundle"] = loadMessageBundle;

function config(_opt) {
    return loadMessageBundle;
}
module.exports["config"] = config;

function getConfiguredDefaultLocale() {
    return undefined;
}
module.exports["getConfiguredDefaultLocale"] = getConfiguredDefaultLocale;
