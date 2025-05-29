import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/accounts',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api; // ✅ Exportación por defecto
