    import axios from 'axios'

    const API_URL = 'http://192.168.1.103:3000/api/categorias'

    // Invocar el endpoint desde /services no desde la vista
    export const getCategorias = async () => {
        try {
          const response = await axios.get(`${API_URL}/search/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          return response.data
        } catch (error) {
          throw error.response?.data || { message: 'Error obteniendo categorias' }
        }
      }

      export const getCategoriasByType = async (type, iduser) => {
        try {
            console.log(`${API_URL}/search/typeiduser/${type}/${iduser}`)
            const response = await axios.get(`${API_URL}/search/typeiduser/${type}/${iduser}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          return response.data.data
        } catch (error) {
          throw error.response?.data || { message: 'Error obteniendo categorias segun tipo' }
        }
      }
