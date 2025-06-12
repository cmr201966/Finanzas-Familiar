// services/tipoCuentaService.js
import api from './api'

export async function getTiposCuenta() {
  const response = await api.get('/tipocuentas')
  return response.data.data.tipocuentas
}


export const crearTipoCuenta  = async (param) => {
    console.log (param)
    try {
      const response = await api.post('/tipocuentas', param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}


export const editarTipoCuenta  = async (param, id) => {
    try {
      const response = await api.put(`${'/tipocuentas'}/${id}`, param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarTipoCuenta = async (id) => {
  try {
    const response = await api.delete(`${'/tipocuentas'}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el tipo de cuenta' }
  }
}