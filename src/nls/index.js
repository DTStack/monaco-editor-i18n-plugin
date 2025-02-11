module.exports["localize"] = module.exports["loadMessageBundle"] = module.exports["config"] = null;

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

    // get locale data from window object
    const windowKey = "__DT_LOCALE__";
    const localStorageKey = "dt-locale";
    const locale = window.localStorage.getItem(localStorageKey) || "en-US";
    const _data = window[windowKey]?.[locale] || {};

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
