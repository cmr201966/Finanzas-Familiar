import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n } from './i18n' // 👈 Usa el que ya creaste
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import 'normalize.css'
import './assets/reset.css'

const app = createApp(App)
app.use(router)
app.use(i18n) // 👈 Aquí lo usas
app.use(vuetify)
app.mount('#app')