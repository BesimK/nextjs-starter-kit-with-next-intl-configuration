export type Locale = (typeof locales)[number];

export const locales = ['en', 'de', 'ar', 'fa', 'he', 'tr'] as const;
export const RTL_LANGUAGES = ['ar', 'fa', 'he'];
export const defaultLocale: Locale = 'en';

export function isRTL(locale: string): boolean {
  return RTL_LANGUAGES.includes(locale);
}

export const languageToCountry: {[key: string]: string} = {
  en: 'GB',
  tr: 'TR',
  ar: 'SA',
  he: 'IL',
  de: 'DE',
  fa: 'IR'
};
