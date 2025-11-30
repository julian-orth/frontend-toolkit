/**
 * i18n Configuration
 *
 * This is a placeholder for future internationalization.
 * Currently, only English is supported, but the structure
 * allows for easy addition of new languages.
 *
 * To add a new language:
 * 1. Create a new file (e.g., de.ts, fr.ts) with translations
 * 2. Import and export it here
 * 3. Update the getTranslations function to support the new locale
 */

import * as en from "./en";

export const defaultLocale = "en";
export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export function getTranslations(locale: Locale = defaultLocale) {
  switch (locale) {
    case "en":
      return en;
    default:
      return en;
  }
}
