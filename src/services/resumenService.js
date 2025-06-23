import api from '/api'

export async function getAllTransactions() {
  try {
    const res = await api.get('/transacciones')
    console.log("transaccionService")
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    throw error
  }
}
