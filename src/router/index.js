import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Registrarse from '../views/Registrarse.vue';
//import Home from '../views/Home.vue';

const routes = [
  //  { path: '/', name: 'home', component: Home },
    { path: '/', name: 'Login', component: Login },
    { path: '/', name: 'Registrarse', component: Registrarse },

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