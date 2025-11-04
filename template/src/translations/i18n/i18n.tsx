import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../languages/en.json';
import tr from '../languages/tr.json';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const LANGUAGE_KEY = '@language';

const initialLng = storage.getString(LANGUAGE_KEY) ?? 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: initialLng,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
