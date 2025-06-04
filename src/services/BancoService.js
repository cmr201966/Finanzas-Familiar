// src/services/bancoService.js
import api from './api'

export async function getBancos() {
  console.log('111111')
  const response = await api.get('/bancos')
  console.log(response)
  return response.data.data.bancos
}