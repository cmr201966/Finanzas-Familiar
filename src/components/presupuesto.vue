<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte derecha con fondo degradado -->
            <div class="form-container">
                <div class="form-gradient-box">

                    <!-- Encabezado con logo y texto en línea -->
                    <div class="header-inline">
                        <img src="../assets/img/tarjetas/presupuesto.png" class="user-icon" alt="Icono opción"  />
                        <h1 class="name-opcion">Definición del presupuesto</h1>
                    </div>

                    <!-- Línea divisoria -->
                    <hr class="divider" />

                    <!-- Lista desplegable para seleccionar una categoría -->
                    <select v-model="form.categoria" id="categoria">

                        <!-- Opción inicial deshabilitada -->
                        <option disabled value="" >Seleccione una categoría</option>

                        <!-- Opciones cargadas dinámicamente desde el backend -->
                        <option
                            v-for="categoria in categorias"
                            :key="categoria.id"
                            :value="categoria.codigo">
                            {{ categoria.nombre }}
                        </option>
                    </select>


                    <!-- Línea divisoria -->
                    <hr class="divider" />
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>

// Importaciones de Vue y librería para peticiones
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios' // Asegúrate de tener axios instalado


// Objeto reactivo del formulario
const form = ref({
  categoria: '' // Aquí se almacenará la categoría seleccionada
})

// Lista de categorías que llega desde el backend
const categorias = ref([])

//para lo referente al selector del mes
const selectedMonth = ref(null)
const month = new Date(selectedMonth.value).getMonth() + 1
const menu = ref(false)
const formattedMonth = ref('')

const updateMonth = (value) => {
  menu.value = false // Cierra el menú al seleccionar
  if (value) {
    const options = { year: 'numeric', month: 'long' }
    formattedMonth.value = new Date(value).toLocaleDateString('es-ES', options)
  }
}

const router = useRouter()

const selectedCategory = ref(null)
const categories = ref([])
const loading = ref(false)

// Al montar el componente, se hace la petición al backend
onMounted(async () => {
  try {
    const response = await axios.get('/api/categorias') // <-- Ajusta este endpoint según tu backend
    categorias.value = response.data // Asignamos las categorías que nos entrega el backend
  } catch (error) {
    console.error('Error al cargar las categorías:', error)
  }
})


</script>

<style scoped>


/* Recuadro con gradiente */


/* Flex horizontal para logo + texto */
.header-inline {
    display: flex;
    align-items: center;
    gap: 10px;
    }

.form-gradient-box {
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
    width: 500px;
    height: 600px;
    }

.form-gradient-box img{
    width: 20%;
    height: 20%;
    margin-top: 5px;
    }

/* Icono de usuario arriba */
.form-gradient-box img.user-icon {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    object-fit: contain;
    }

/* Imagen de la opcion */
.posicion-icon {
    position: absolute;
    object-fit: contain;
    margin-bottom: 20px;
    margin-left: 5px;
    width: 20px;
    height: 20px;
    border-radius: 5px;

    }

    /* Imagen de usuario más pequeña */
.user-icon {
    width:50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 10px;
}

/* Línea divisoria */
.divider {
    width: 80%;
    border: 1px solid black;
    margin-bottom: 20px;
    max-width: 350px;
    }

/* Nombre app */
.name-opcion {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    text-align: center;
    }

/* para tratar la lista */

.custom-select {
   width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  border-radius: 50px;
}

.select-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 400px;

  margin-left: 100px;
  padding: 0;
}


.select-with-icon .icon {
  width: 24px;
  height: 24px;
}

.input-icon {
  margin-left: 10px;
  margin-right: 8px;
  border-radius: 4px;
}

.month-picker-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>