export function getNLSMessages() {
    return globalThis._VSCODE_NLS_MESSAGES;
}

export function getNLSLanguage() {
    const localStorageKey = "dt-locale";
    const locale = window.localStorage.getItem(localStorageKey) || "en-US";
    const nlsLanguageEnum = {
        "en-US": "en",
        "zh-CN": "zh-cn",
    };

    return nlsLanguageEnum[locale];
}
