// services/tipoCuentaService.js
import api from './api'

export async function getTiposCuenta() {
  const response = await api.get('/tipocuentas')
  return response.data.data.tipocuentas
}