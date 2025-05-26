import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Registrarse from "../views/Registrarse.vue";
//import Cuentas from "../views/Cuentas.vue";

const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Registrarse", component: Registrarse },
  //{ path: "/Cuentas", name: "cuentas", component: Cuentas },
  //{ path: '/Presupuesto', name: 'presupuesto', component: Presupuesto },
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
