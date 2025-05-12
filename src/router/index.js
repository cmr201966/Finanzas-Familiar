import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Expenses from '../views/Expenses.vue'

	const routes = [
    { path: '/', name: 'dashboard', component: Dashboard },
	{ path: '/expenses', name: 'expenses', component: Expenses },
	  // más rutas...
	]

	const router = createRouter({
	history: createWebHistory(),
	routes,
	})

	export default router
