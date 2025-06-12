import api from './api'

export async function getBancos() {
  const response = await api.get('/bancos')
  console.log(response)
  return response.data.data.bancos
}

export const crearBanco  = async (param) => {
    try {
      const response = await api.post('/bancos', param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const editarBanco  = async (param, id) => {
    try {
      const response = await api.put(`${'/bancos'}/${id}`, param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarBanco = async (id) => {
  try {
    const response = await api.delete(`${'/bancos'}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el banco' }
  }
}