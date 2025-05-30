import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'
const API_URL_USERS = 'http://localhost:3000/api/users'

// Registrar nuevo usuario
export const register = async (param) => {
  try {
    console.log(`${API_URL}/register`)
    const response = await axios.post(`${API_URL}/register`, param)

    // Si el registro fue exitoso, guarda el token (si lo devuelve)
    const token = response.data.data?.token
    if (token) {
      localStorage.setItem('token', token)
    }

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL_USERS}/search/}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo usuario' }
  }
}

// Obtener usuario por ID (para editar)
export const getUserById = async (id) => {
  try {
    console.log(`${API_URL_USERS}/search/${id}`)
    const response = await axios.get(`${API_URL_USERS}/search/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo usuario' }
  }
}

export const getUserByUserName = async (username) => {
  try {
    console.log(`${API_URL_USERS}/search/?username=${username}`)
    const response = await axios.get(`${API_URL_USERS}/search/?username=${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo usuario' }
  }
}


// Actualizar usuario
export const updateUser = async (id, param) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, param, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error actualizando usuario' }
  }
}
