
import { createI18n } from 'vue-i18n'

// Auto-importa todos los archivos JSON de locales
function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/**/!(*.test).json', { eager: true })
  const messages = {}

  for (const path in locales) {
    const pathParts = path.split('/')
    const locale = pathParts[2]        // 'es' o 'en'
    const view = pathParts[3].replace('.json', '') // 'login', 'dashboard'

    if (!messages[locale]) messages[locale] = {}
    messages[locale][view] = locales[path] // namespace: messages.es.login
  }

  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})

export default i18n
