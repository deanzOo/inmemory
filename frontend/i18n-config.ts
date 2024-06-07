export const i18n = {
    locales: ["en", "he"],
    defaultLocale: "he",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
