import api from './api'

export const login = async (param) => {
    try {
      // el /api ya esta en api.js en este caso queda /api/auth/login
      const response = await api.post('/auth/login', param)

    // Si el login fue exitoso, guarda el token
      const token = response.data.data.token
      localStorage.setItem('token', token)

    return response.data
  } catch (error) {
//    throw error.response?.data || { message: 'Error inesperado' }
    throw {
      status: error.response?.status,
      ...error.response?.data
    } || { message: 'Error inesperado' };

  }
}