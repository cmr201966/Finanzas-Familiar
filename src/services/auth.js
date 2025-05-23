import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const login = async (form) => {
  try {
    const response = await axios.post(`${API_URL}/login`, form)

    // Si el login fue exitoso, guarda el token
    const token = response.data.data.token
    localStorage.setItem('token', token)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}