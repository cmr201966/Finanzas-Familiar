// src/services/bancoService.js
import api from './api'
const API_URL = 'http://192.168.1.103:3000/api/Bancos'
import axios from 'axios'

export async function getBancos() {
  const response = await api.get('/bancos')
  console.log(response)
  return response.data.data.bancos
}

export const crearBanco  = async (param) => {
    try {
      const response = await axios.post(`${API_URL}/`, param)
      return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}


export const editarBanco  = async (param, id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, param)

    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' }
  }
}

export const eliminarBanco = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Error eliminando el banco' }
  }
}