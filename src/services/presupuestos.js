import api from './api'

//const API_URL = 'http://192.168.1.103:3000/api/presupuestos'

export const getPresupuestos = async () => {
  try {
    const response = await api.get('/presupuestos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo los presupuestos' }
  }
}

export const getPresupuestosById = async (id) => {
  try {
      const response = await api.get(`${'/presupuestos'}/id/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo los presupuestos segun usuario' }
  }
}

export const getPresupuestosByUserName = async (username) => {
  try {
     // console.log(`${API_URL}/username/${username}`)
      const response = await api.get(`${'/presupuestos'}/username/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data.data
  } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo los presupuestos segun usuario' }
  }
}

export const crearPresupuesto  = async (param) => {
  console.log("param:", param)
    try {
      const response = await api.post('/presupuestos', param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}


export const editarPresupuesto  = async (param) => {
  console.log("param:", param)

    try {

    const response = await api.put('/presupuestos', param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarPresupuesto = async (id) => {
  try {
    const response = await api.delete(`${'/presupuestos'}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el presupuesto' }
  }
}