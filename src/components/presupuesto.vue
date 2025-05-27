<template>
    <!-- Parte derecha -->
        <div class="form-gradient-box">
            <img src="../assets/img/tarjetas/presupuesto.png" class="user-icon" alt="Icono de presupuesto" />
            <h1 class="app-opcion">{{ $t('presup.app_opcion') }}</h1>

            <!-- Raya divisoria -->
            <hr class="divider" />

            <!-- Lista desplegable de categorias -->
                <v-form>
                    <v-select
                        v-model="selectedCategory"
                        :items="categories"
                        label="Seleccione una categoría"
                        item-title="name"
                        item-value="id"
                        outlined
                        dense
                        required
                    ></v-select>
                </v-form>

            <!-- Importe -->
                <div class="form-field-horizontal input-with-icon">
                    <img src="../assets/img/icono/dinero.png" class="input-icon-inside" />
                    <input type="tel" :placeholder="$t('register.importe')" v-model="phone" class="custom-input" />
                </div>
        </div>

</template>

<script setup>
import { ref } from 'vue'

const selectedCategory = ref(null)

const categories = [
    { id: 1, name: 'Alimentación' },
    { id: 2, name: 'Transporte' },
    { id: 3, name: 'Vivienda' },
    { id: 4, name: 'Salud' },
    { id: 5, name: 'Educación' },
    ]
</script>

<style scoped>

/* Recuadro con gradiente */
.form-gradient-box {
    max-width: 500px; /* Limita el ancho interno */
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;

}

.form-gradient-box img{
    width: 20%;
    height: 20%;
    margin-top: 20px;
}

/* Icono de usuario arriba */
.form-gradient-box img.user-icon {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    object-fit: contain;
}

/* Imagen de la opcion */
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

</style>