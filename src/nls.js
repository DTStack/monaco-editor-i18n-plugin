export { getNLSLanguage, getNLSMessages } from "./nls.messages.js";

function _format(message, args) {
    let result;
    if (args.length === 0) {
        result = message;
    } else {
        result = message.replace(/\{(\d+)\}/g, (match, rest) => {
            const index = rest[0];
            const arg = args[index];
            let result = match;
            if (typeof arg === "string") {
                result = arg;
            } else if (typeof arg === "number" || typeof arg === "boolean" || arg === void 0 || arg === null) {
                result = String(arg);
            }
            return result;
        });
    }
    return result;
}

export function localize(path, data, defaultMessage) {
    const key = typeof data === "object" ? data.key : data;

    // if not in browser, return default message
    if (typeof window === "undefined") {
        return defaultMessage;
    }

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

/**
 * @skipMangle
 */
export function localize2(path, data, originalMessage) {
    const key = typeof data === "object" ? data.key : data;

    // if not in browser, return default message
    if (typeof window === "undefined") {
        return originalMessage;
    }

    // get locale data from window object
    const windowKey = "__DT_LOCALE__";
    const localStorageKey = "dt-locale";
    const locale = window.localStorage.getItem(localStorageKey) || "en-US";
    const _data = window[windowKey]?.[locale] || {};

    let message = (_data[path] || {})[key];
    if (!message) {
        message = originalMessage;
    }

    // Make sure message is a string
    if (typeof message !== "string") {
        message = originalMessage || key || "";
    }
    if (typeof originalMessage !== "string") {
        originalMessage = key || "";
    }

    const args = [];
    for (let _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    const value = _format(message, args);
    return {
        value,
        original: originalMessage === message ? value : _format(originalMessage, args),
    };
}
