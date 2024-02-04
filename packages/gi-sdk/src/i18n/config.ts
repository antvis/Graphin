import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocalStore } from '../utils';
import zh from './zh/translation.json';
import en from './en/translation.json';

console.log(LocalStore.get('language'));

i18next.use(initReactI18next).init({
  lng: LocalStore.get('language') || 'zh-CN', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    'zh-CN': {
      translation: zh,
    },
    'en-US': {
      translation: en,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
