import axios from 'axios'

const API_URL = 'http://192.168.1.103:3000/api/presupuestos'

export const getPresupuestos = async () => {
  try {
    const response = await axios.get(`${API_URL}/}`, {
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
      const response = await axios.get(`${API_URL}/id/${id}`, {
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
      const response = await axios.get(`${API_URL}/username/${username}`, {
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
    try {
      const response = await axios.post(`${API_URL}/`, param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}


export const editarPresupuesto  = async (param) => {
    try {
    const response = await axios.put(`${API_URL}/`, param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarPresupuesto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el presupuesto' }
  }
}