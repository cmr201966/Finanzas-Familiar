import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import 'normalize.css'

// Importa el reset global
import './assets/reset.css'

// Cargar todos los JSON de locales dinámicamente
function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*/*.json', { eager: true })
  const messages = {}

  for (const path in locales) {
    const parts = path.split('/')
    const lang = parts[2]
    const file = parts[3].replace('.json', '')

    if (!messages[lang]) messages[lang] = {}
    messages[lang][file] = locales[path]
  }

  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
