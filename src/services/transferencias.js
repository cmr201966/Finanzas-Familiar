import axios from 'axios';
import api from './api'

const API_URL = 'http://192.168.1.103:3000/api/transferencias'

export const getTransferenciasByUserName = async (username) => {
    try {
     // console.log(`${API_URL}/username/${username}`)
        const response = await axios.get(`${API_URL}/username/${username}`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data.data

    } catch (error) {
    throw error.response?.data || { message: 'Error obteniendo las transferencias de este usuario' }
    }
}


export const guardarTransferencia = async (param) => {
    try {

    const response = await axios.post(`${API_URL}/`, param);
    return response.data;

    }   catch (error) {
        throw error.response?.data || { message: 'Error inesperado' }
    }
}
