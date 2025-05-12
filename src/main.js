// src/main.js
import { createApp } from 'vue'
import App from './App.vue';
import './assets/styles.css';
import router from './router';
//import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import { aliases, mdi } from 'vuetify/iconsets/mdi'
//import '@mdi/font/css/materialdesignicons.css'

localStorage.removeItem('token');


const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
