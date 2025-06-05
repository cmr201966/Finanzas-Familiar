// api.js
import axios from 'axios'

const api = axios.create({
 // baseURL: 'http://localhost:3000/api' // ✅
  baseURL: 'http://192.168.1.103:3000/api'
})
// Agregar el token automáticamente a cada solicitud
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default api