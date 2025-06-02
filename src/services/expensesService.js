import api from './api'

// Obtener todas las categorías
export async function getAllExpenses() {
  try {
    const res = await api.get('/categorias/search/{type}/{iduser}')
    return res.data.data.expense
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    throw error
  }
}

// Obtener una categoría por ID
export async function getExpenseById(id) {
  try {
    const res = await api.get(`/categorias/search/{type}/{iduser}/${id}`)
    return res.data.data.expense
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${id}:`, error)
    throw error
  }
}

// Crear una nueva categoría
export async function createExpense(expenseData) {
  try {
    const res = await api.post('/categorias/search/{type}/{iduser}', expenseData)
    return res.data
  } catch (error) {
    console.error('Error al crear categoría:', error.response?.data || error)
    throw error
  }
}

// Actualizar una categoría existente
export async function updateCategoria(id, updateData) {
  try {
    const res = await api.put(`/categorias/${id}`, updateData)
    return res.data.data.changes
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${id}:`, error)
    throw error
  }
}

// Eliminar una categoría
export async function deleteCategoria(id) {
  try {
    const res = await api.delete(`/categorias/${id}`)
    return res.data.data.changes
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${id}:`, error)
    throw error
  }
}
