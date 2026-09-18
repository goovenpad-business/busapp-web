import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json' with { type: 'json' };
import en from './locales/en.json' with { type: 'json' };

export const languages = ['fr', 'en'] as const;
export type Language = (typeof languages)[number];
export const resources = { fr: { translation: fr }, en: { translation: en satisfies typeof fr } };
export const languagePath = (language: Language) => (language === 'en' ? '/en/' : '/');
export const languageFromPath = (path: string): Language =>
  /^\/en(?:\/|$)/.test(path) ? 'en' : 'fr';
export const isLanguage = (value: unknown): value is Language => value === 'fr' || value === 'en';

export async function createI18n(language: Language) {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    resources,
    lng: language,
    supportedLngs: [...languages],
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof fr };
  }
}
