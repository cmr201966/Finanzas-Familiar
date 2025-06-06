import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Registrarse from "../views/Registrarse.vue";
import Cuentas from "../views/Cuentas.vue";
import presupuesto from "../views/presupuesto.vue";
import Categorias from "../views/Categorias.vue";
import categoriaBanco from "../views/categoriaBanco.vue";


const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/", name: "Login", component: Login },
  //{ path: "/register", name: "Registrarse", component: Registrarse },

  { path: "/register/:username?", name: "Registrarse", component: Registrarse },
  { path: "/Cuentas", name: "cuentas", component: Cuentas },
  { path: '/presupuesto', name: 'presupuesto', component: presupuesto },
  { path: '/Categorias', name: 'categorias', component: Categorias },
  { path: '/categoriaBanco', name: 'categoriaBanco', component: categoriaBanco},

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
