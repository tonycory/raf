import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
    },
    fallbackLng: ['ru'],
    supportedLngs: ['en', 'ru'],
    defaultNS: ['translation'],
    ns: ['translation'],
    debug: import.meta.env.DEV,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    returnNull: false,
    returnEmptyString: false,
    returnObjects: false,
    saveMissing: false,
    saveMissingTo: 'fallback',
    missingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    parseMissingKeyHandler: false,
    appendNamespaceToCIMode: false,
    simplifyPluralSuffix: true,
    postProcess: false,
    postProcessPassResolved: false,
    load: 'currentOnly',
    preload: ['ru', 'en'],
  });

export default i18n; 