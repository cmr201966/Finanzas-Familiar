import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Registrarse from "../views/Registrarse.vue";
import Cuentas from "../views/Cuentas.vue";
import presupuesto from "../views/presupuesto.vue";
import Categorias from "../views/Categorias.vue";
import categoriaBanco from "../views/categoriaBanco.vue";
import categoriaTipoCuentas from "../views/categoriaTipoCuentas.vue";
import Transacciones from "../views/Transacciones.vue";
import transferencias from "../views/transferencias.vue";
import Resumen_General from "../views/Resumen_General.vue"
import informeTransferencias from "../views/informeTransferencias.vue";
import InformeMA from "../views/InformeMA.vue"

import informePresupuesto from "../views/informePresupuesto.vue";

const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/", name: "Login", component: Login },
  //{ path: "/register", name: "Registrarse", component: Registrarse },

  { path: "/register/:username?", name: "Registrarse", component: Registrarse },
  { path: "/Cuentas", name: "cuentas", component: Cuentas },
  { path: '/presupuesto', name: 'presupuesto', component: presupuesto },
  { path: '/Categorias', name: 'categorias', component: Categorias },
  { path: '/categoriaBanco', name: 'categoriaBanco', component: categoriaBanco},
  { path: '/categoriaTipoCuentas', name: 'categoriaTipoCuentas', component: categoriaTipoCuentas},
  { path: '/Transacciones', name: 'Transacciones', component: Transacciones},
  { path: '/transferencias', name: 'transferencias', component: transferencias},
  { path: '/Resumen_General', name: 'Resumen_General', component: Resumen_General},
  {path: '/informeTransferencias', name: 'informeTransferencias', component: informeTransferencias},
  { path: '/informePresupuesto', name: 'informePresupuesto', component: informePresupuesto},
  { path: '/informe-anual', name: 'informeMA', component: InformeMA},

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Lógica para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Cambia esta variable según la lógica de autenticación (por ejemplo, verificando un token)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/"); // Redirige a la página de login si no está autenticado
  } else {
    next();
  }
});

export default router;
