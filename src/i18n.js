
import { createI18n } from 'vue-i18n'

import esLogin from './locales/es/login.json'
import enLogin from './locales/en/login.json'
import esRegister from './locales/es/register.json'
import enRegister from './locales/en/register.json'
import esPresupuesto from './locales/es/presup.json'
import enPresupuesto from './locales/en/presup.json'
import esHome from './locales/es/home.json'
import enHome from './locales/en/home.json'
import esCuentas from './locales/es/cuentas.json'
import enCuentas from './locales/en/cuentas.json'
import enCategorias from './locales/en/categorias.json'
import esCategorias from './locales/es/categorias.json'
import esCategoriaBanco from './locales/es/categoriaBanco.json'
import enCategoriaBanco from './locales/en/categoriaBanco.json'
import esCategoriaTipoCuenta from './locales/es/categoriaTipoCuenta.json'
import enCategoriaTipoCuenta from './locales/en/categoriaTipoCuenta.json'
import esTransacciones from './locales/es/transacciones.json'
import enTransacciones from './locales/en/transacciones.json'

const messages = {
  es: {
    login: esLogin,
    register: esRegister,
    home: esHome,
    presup:esPresupuesto,
    cuentas: esCuentas,
    categorias: esCategorias,
    categoriaBanco:esCategoriaBanco,
    categoriaTipoCuenta:esCategoriaTipoCuenta,
    transacciones:esTransacciones
  },
  en: {
    login: enLogin,
    register: enRegister,
    home: enHome,
    presup:enPresupuesto,
    cuentas: enCuentas,
    categorias: enCategorias,
    categoriaBanco:enCategoriaBanco,
    categoriaTipoCuenta:enCategoriaTipoCuenta,
    transacciones: enTransacciones
  }
}

export const i18n = createI18n({
  legacy: false, // 👈 necesario
  locale: 'es',
  fallbackLocale: 'en',
  messages
})