
import { createI18n } from 'vue-i18n'

import esLogin from './locales/es/login.json'
import esRegister from './locales/es/register.json'
import esPresupuesto from './locales/es/presup.json'
import enLogin from './locales/en/login.json'
import enRegister from './locales/en/register.json'
import enPresupuesto from './locales/en/presup.json'
import esHome from './locales/es/home.json'
import enHome from './locales/en/home.json'
import esCuentas from './locales/es/cuentas.json'
import enCuentas from './locales/en/cuentas.json'
import enCategorias from './locales/en/categorias.json'
import esCategorias from './locales/es/categorias.json'

const messages = {
  es: {
    login: esLogin,
    register: esRegister,
    home: esHome,
    presup:esPresupuesto,
    cuentas: esCuentas,
    categorias: esCategorias,
  },
  en: {
    login: enLogin,
    register: enRegister,
    home: enHome,
    presup:enPresupuesto,
    cuentas: enCuentas,
    categorias: enCategorias,
  }
}

export const i18n = createI18n({
  legacy: false, // 👈 necesario
  locale: 'es',
  fallbackLocale: 'en',
  messages
})