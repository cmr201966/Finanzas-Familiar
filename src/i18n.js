
import { createI18n } from 'vue-i18n'

import esLogin from './locales/es/login.json'
import esRegister from './locales/es/register.json'
import enLogin from './locales/en/login.json'
import enRegister from './locales/en/register.json'

const messages = {
  es: {
    login: esLogin,
    register: esRegister
  },
  en: {
    login: enLogin,
    register: enRegister
  }
}

export const i18n = createI18n({
  legacy: false, // 👈 necesario
  locale: 'es',
  fallbackLocale: 'en',
  messages
})