import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'fr'],
        fallbackLng: 'en',
        debug: false,
        // Options for language detector
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        // react: { useSuspense: false },
        backend: {
            loadPath: process.env.PUBLIC_URL + '/locals/{{lng}}.json',
        },
    })



export default i18n;
