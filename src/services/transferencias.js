import api from './api'

export const getTransferenciasById = async (id) => {
    try {
        const response = await api.get(`${'/transferencias'}/${id}`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data.data.transferencias

    } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo las transferencias de este usuario' }
    }
}


export const guardarTransferencia = async (param) => {
    try {
    const response = await api.post('/transferencias', param);
    return response.data;

    }   catch (error) {
        throw error.response?.data || { message: 'Error inesperado' }
    }
}


export async function updateTransferencia(id, transferencia) {

    console.log("444444")
    console.log(id,transferencia)
    try {
        const res = await api.put(`/transferencias/${id}`, transferencia)
        return res.data
    } catch (error) {
    console.error(`Error al actualizar transferencia con ID ${id}:`, error)
    throw error
    }
}


export const eliminarTransferencia = async (id) => {
    try {
        const response = await api.delete(`${'/transferencias'}/${id}`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Error eliminando la transferencia' }
    }
}