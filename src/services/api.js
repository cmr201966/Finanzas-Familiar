// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api


// api.js
//import axios from 'axios'

//export function createApi(baseURL) {
//  const api = axios.create({ baseURL })

//  api.interceptors.request.use(config => {
//    const token = localStorage.getItem('token')
//    if (token) {
//      config.headers.Authorization = `Bearer ${token}`
//    }
//    return config
//  })

//  return api
//}


// api.js
//import axios from 'axios'

//const api = axios.create({
//  baseURL: 'http://localhost:3000/api' // ✅
  //baseURL: 'http://192.168.1.103:3000/api'
//})
// Agregar el token automáticamente a cada solicitud
//api.interceptors.request.use(config => {
//  const token = localStorage.getItem('token')
//  if (token) {
//    config.headers.Authorization = `Bearer ${token}`
//  }
//  return config
//})
//export default api
