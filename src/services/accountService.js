//import api from './api'

import axios from 'axios'
const API_URL = 'http://192.168.1.103:3000/api/accounts'

// Obtener todas las cuentas
export async function getAllAccounts() {
  try {
    const res = await api.get('/accounts')
    console.log(res)
    return res.data.data.accounts
  } catch (error) {
    console.error('Error al obtener cuentas:', error)
    throw error
  }
}

// Obtener una cuenta por ID
export async function getAccountById(id) {
  console.log ("id", id)
  try {
    const res = await api.get(`/accounts/${id}`)
    console.log (res)
    return res.data.data.account
  } catch (error) {
    console.error(`Error al obtener cuenta con ID ${id}:`, error)
    throw error
  }
}

// Crear una nueva cuenta (envía los datos bajo 'account')
export async function createAccount(accountData) {
  try {
    const res = await api.post('/accounts',accountData)
    return res.data
  } catch (error) {
    console.error('Error al crear cuenta:', error.response?.data || error)
    throw error
  }
}

// Actualizar una cuenta existente
export async function updateAccount(id, updateData) {
  try {
    console.log(updateData)
    const res = await api.put(`/accounts/${id}`, updateData) // updateData también debe tener forma { account: {...} }
    return res.data.data.changes
  } catch (error) {
    console.error(`Error al actualizar cuenta con ID ${id}:`, error)
    throw error
  }
}

// Eliminar una cuenta
export async function deleteAccount(id) {
  try {
    const res = await api.delete(`/accounts/${id}`)
    return res.data.data.changes
  } catch (error) {
    console.error(`Error al eliminar cuenta con ID ${id}:`, error)
    throw error
  }
}

