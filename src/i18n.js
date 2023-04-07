import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  //Detect User language
  .use(LanguageDetector)
  //Passes i18n to react-i18next
  .use(initReactI18next)
  //for Loading Backend translation
  .use(HttpApi)

  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    detection: {
      order: [
        'cookie',
        'navigator',
        'htmlTag',
        'localStorage',
        'path',
        'subdomain',
      ],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
