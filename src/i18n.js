import { createI18n } from 'vue-i18n'

//import esLogin from './locales/es/login.json'
//import esRegister from './locales/es/register.json'
//import enLogin from './locales/en/login.json'
//import enRegister from './locales/en/register.json'
import esHome from './locales/es/home.json'
import enHome from './locales/en/home.json'

const messages = {
  es: {
   // login: esLogin,
  //  register: esRegiste,
    home: esHome
  },
  en: {
   // login: enLogin,
   // register: enRegister,
    home: enHome
  }
}

export const i18n = createI18n({
  legacy: false, // 👈 necesario
  locale: 'es',
  fallbackLocale: 'en',
  messages
})