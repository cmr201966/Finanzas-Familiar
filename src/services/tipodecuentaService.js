// services/tipoCuentaService.js
import api from './api'

import axios from 'axios'
const API_URL = 'http://192.168.1.103:3000/api/tipocuentas'

export async function getTiposCuenta() {
  const response = await api.get('/tipocuentas')
  return response.data.data.tipocuentas
}


export const crearTipoCuenta  = async (param) => {
    console.log (param)
    try {
      const response = await axios.post(`${API_URL}/`, param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}


export const editarTipoCuenta  = async (param, id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarTipoCuenta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el tipo de cuenta' }
  }
}