import axios from 'axios'

const API_URL = 'http://192.168.1.103:3000/api/Banco'


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