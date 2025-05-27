import "@mdi/font/css/materialdesignicons.css";
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n"; // 👈 Usa el que ya creaste
import router from "./router";
// ✅ Importa el archivo .ts como un módulo normal
import vuetify from "./plugins/vuetify";
import "./assets/reset.css";
import "./assets/css/responsive.css";
import "vuetify/styles";
import "./style.css";

const app = createApp(App);
app.use(router);
app.use(i18n); // 👈 Aquí lo usas
app.use(vuetify);
app.mount("#app");
