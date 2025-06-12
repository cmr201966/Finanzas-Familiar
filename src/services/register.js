import api from './api'

// Registrar nuevo usuario
export const register = async (param) => {
  try {
    const response = await api.post('/auth/register', param)

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
    const response = await api.get('/users/search/', {
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
    console.log(id)
    //console.log(`${API_URL_USERS}/search/${id}`)
    const response = await api.get(`${'/users/search/'}${id}`, {
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
    const response = await api.get(`${'/users/search/?username='}${username}`, {
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
    const response = await api.put(`${'/users/'}${id}`, param, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error actualizando usuario' }
  }
}
