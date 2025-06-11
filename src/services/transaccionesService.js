import api from './api'

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

export async function createTransaction(transactionData) {
  try {
    const res = await api.post('/transacciones', transactionData)
    return res.data
  } catch (error) {
    console.error('Error al crear transaccion:', error.response?.data || error)
    throw error
  }
}

export async function updateTransaction(id, transaccion) {
  try {
    const res = await api.put(`/transacciones/${id}`, transaccion)
    return res.data
  } catch (error) {
    console.error(`Error al actualizar transaccion con ID ${id}:`, error)
    throw error
  }
}

export async function deleteTransaction(id) {
  try {
    const res = await api.delete(`/transacciones/${id}`)
    return res.data.data.changes
  } catch (error) {
    console.error(`Error al eliminar transaccion con ID ${id}:`, error)
    throw error
  }
}


