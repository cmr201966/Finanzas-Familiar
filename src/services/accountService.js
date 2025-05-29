// src/services/accountService.js
import api from './api'; // Usa `import api` porque exportaste por defecto

// Obtener todas las cuentas
export async function getAllAccounts() {
  try {
    const response = await api.get('/');
    console.log('Cuentas:', response.data.data.accounts);
    return response.data.data.accounts;
  } catch (error) {
    console.error('Error al obtener cuentas:', error);
    throw error;
  }
}

// Obtener una cuenta por ID
export async function getAccountById(id) {
  try {
    const response = await api.get(`/${id}`);
    console.log('Cuenta:', response.data.data.account);
    return response.data.data.account;
  } catch (error) {
    console.error(`Error al obtener cuenta con ID ${id}:`, error);
    throw error;
  }
}

// Crear una nueva cuenta
export async function createAccount(accountData) {
  try {
    const response = await api.post('/', accountData);
    console.log('Cuenta creada:', response.data.data.account);
    return response.data.data.account;
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    throw error;
  }
}

// Actualizar una cuenta existente
export async function updateAccount(id, updateData) {
  try {
    const response = await api.put(`/${id}`, updateData); // CORREGIDO: uso de template string
    console.log('Cuenta actualizada:', response.data.data.changes);
    return response.data.data.changes;
  } catch (error) {
    console.error(`Error al actualizar cuenta con ID ${id}:`, error); // CORREGIDO: template string
    throw error;
  }
}

// Eliminar una cuenta
export async function deleteAccount(id) {
  try {
    const response = await api.delete(`/${id}`); // CORREGIDO: uso de template string
    console.log('Cuenta eliminada:', response.data.data.changes);
    return response.data.data.changes;
  } catch (error) {
    console.error(`Error al eliminar cuenta con ID ${id}:`, error); // CORREGIDO: template string
    throw error;
  }
}
