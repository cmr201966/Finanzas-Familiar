import axios from 'axios';
import api from './api'

const API_URL = 'http://192.168.1.103:3000/api/transferencias'

export const guardarTransferencia = async (param) => {
    try {

    const response = await axios.post(`${API_URL}/`, param);
    return response.data;

    }   catch (error) {
        throw error.response?.data || { message: 'Error inesperado' }
    }
}
