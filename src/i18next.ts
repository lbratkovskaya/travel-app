import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_translation from './i18next/en/translation.json';
import de_translation from './i18next/de/translation.json';
import ru_translation from './i18next/ru/translation.json';

export const resources = {
  en: { translation: en_translation },
  de: { translation: de_translation },
  ru: { translation: ru_translation },
};


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    // ns: ['special', 'common'],
    // defaultNS: 'special',
    resources,
    supportedLngs: ['de','en','ru']
  });


export default i18n;
