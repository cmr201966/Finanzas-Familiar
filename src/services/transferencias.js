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
