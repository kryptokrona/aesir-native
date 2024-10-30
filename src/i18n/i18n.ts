import * as RNLocalize from 'react-native-localize';

import en from './translations/en.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import sv from './translations/sv.json';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    const languageTag = locales[0]?.languageTag || 'en';
    callback(languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      sv: { translation: sv },
    },
  });

export default i18next;
