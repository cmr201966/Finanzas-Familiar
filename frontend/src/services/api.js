import axios from 'axios'

	const api = axios.create({
	  baseURL: 'http://localhost:8000/api', // cambia según entorno
	})

	export default api