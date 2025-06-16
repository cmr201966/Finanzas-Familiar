   import api from './api'

    // Invocar el endpoint desde /services no desde la vista
    export const getCategorias = async () => {
        try {
          const response = await api.get(`/categorias/search/`, {
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
            const response = await api.get(`/categorias/search/typeiduser/${type}/${iduser}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          return response.data.data
        } catch (error) {
          throw error.response?.data || { message: 'Error obteniendo categorias segun tipo' }
        }
      }
