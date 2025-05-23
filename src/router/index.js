import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cuentas from '../views/Cuentas.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/Cuentas', name: 'cuentas', component: Cuentas },
    //{ path: '/Presupuesto', name: 'presupuesto', component: Presupuesto },
]

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL)
  ,
  routes,
});

// Lógica para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Cambia esta variable según la lógica de autenticación (por ejemplo, verificando un token)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Redirige a la página de login si no está autenticado
  } else {
    next();
  }
});

export default router;