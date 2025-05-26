import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const register = async (param) => {
  try {
    const response = await axios.post('${API_URL}/register', param)

    const token = response?.data?.data?.token
    if (token) {
      localStorage.setItem('token', token)
    }

    return response.data
  } catch (error) {
    // Lanza error con status y mensaje personalizados si están disponibles
    if (error.response) {
      const { status, data } = error.response
      throw { status, ...data }
    } else {
      // Si no hay respuesta del servidor
      throw { status: 500, message: 'Error inesperado' }
    }
  }
}

