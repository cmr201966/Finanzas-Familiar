import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//import Expenses from '../views/Expenses.vue'

	const routes = [
    { path: '/', name: 'Home', component: Home },
	//{ path: '/expenses', name: 'expenses', component: Expenses },
	  // más rutas...
	]

	const router = createRouter({
	history: createWebHistory(),
	routes,
	})

	export default router
