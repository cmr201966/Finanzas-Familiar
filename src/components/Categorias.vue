<template>
  <div class="fondo">
    <!-- Título y Encabezado -->
    <div class="header-inline">
      <img class="img-nombre" src="../assets/img/tarjetas/CatIngresosgGastos.png" alt="">
      <h2 class="titulo-categoria">{{ $t('categorias.titulo-categoria' )}}</h2>
    </div>

    <hr class="mi-barra" />

    <!-- Campo: Nombre de Categoría -->
    <v-row >
      <v-col cols="12" md="12">
        <v-text-field
          v-model="form.nombreCategoria"
          :placeholder="$t('categorias.placeholdercategoria')"
          prepend-inner-icon="mdi-tag"
          outlined
          dense
          density="compact"
          color="primary"
          width="390"
          class="white-rounded custom-height"

        />
      </v-col>

      <!-- Campo: Descripción -->
      <v-col cols="12" md="12">
        <v-text-field
          v-model="form.descripcion"
          :placeholder="$t('categorias.placeholderdescripcion')"
          prepend-inner-icon="mdi-text"
          outlined
          dense
          density="compact"
          color="primary"
          width="390"
        />
      </v-col>
</v-row>

  <!-- Checkboxes Ingreso y Gasto en fila -->
    <v-row class="checkbox-row" justify="center" align="center">
      <v-col cols="6" class="d-flex align-center justify-center">
        <p class="categoria-ingreso">{{ $t('categorias.ingreso') }}</p>
        <v-checkbox
          :model-value="form.ingreso"
          @update:model-value="setIngreso(true)"
          color="white"
          hide-details
          density="compact"
        />
      </v-col>

      <v-col cols="6" class="d-flex align-center justify-center">
        <p class="categoria-gastos">{{ $t('categorias.gastos') }}</p>
        <v-checkbox
          :model-value="!form.ingreso"
          @update:model-value="setIngreso(false)"
          color="white"
          hide-details
          density="compact"
        />
      </v-col>
    </v-row>

    <!-- División -->
    <hr class="mi-barra2" />

    <!-- Botones
    <div class="botones">
      <v-btn class="save" color="primary" @click="guardarCategoria">
        {{ $t('categorias.submit') }}
      </v-btn>
      <v-btn class="cancelar" color="error" @click="cancelar">
        {{ $t('categorias.cancel') }}
      </v-btn>
    </div>-->

    <div class="form-buttons">

        <!-- Botón Aceptar (verde) -->
        <v-btn  @click="guardarCategoria" :style="{ backgroundColor: '#196c2c', color: 'white' }"
          class="btn btn-aceptar">{{ $t("categorias.submit") }}
        </v-btn>

        <!-- Botón Cancelar (rojo) -->
        <v-btn  @click="cancelar" :style="{ backgroundColor: '#dc3545', color: 'white' }"
                class="btn btn-cancelar"> {{ $t("categorias.cancel") }}
        </v-btn>
    </div>


    <!-- Lista de Categorías
    <div class="lista-categoria">
      <ul>
        <li v-for="(cat, index) in categoria" :key="index">
          <span class="texto-categoria">
            {{ cat.name }} - {{ cat.description }} - {{ cat.type }}
          </span>
          <span class="botones-categoria">
            <v-btn small icon @click="editarCategoria(index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon @click="eliminarCategoria(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </li>
      </ul>
    </div> -->
    <v-card
      class="pa-2"
      elevation="8"
      style="max-width: 450px; border-radius: 16px; background-color: #f9f9f9; margin-left: 2px;"
    >
      <v-data-table
        :headers="headers"
        :items="categoria"
        item-value="id"
        class="tabla-categorias"
        :items-per-page="-1"
        hide-default-footer
        fixed-header
        dense
        height="150"
      >
      <template #item.actions="{ index }">
          <div class="acciones-categoria">
            <v-btn icon size="small" @click="editarCategoria(index)" variant="text" color="primary">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" @click="eliminarCategoria(index)" variant="text" color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
      </template>
  </v-data-table>
</v-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref,computed, onMounted, reactive } from 'vue'
import { getAllExpenses, getExpenseById, createExpense, updateCategoria, deleteCategoria } from '@/services/expensesService.js' // Ajusta la ruta si es necesario
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const form = ref({
  nombreCategoria: '',
  descripcion: '',
  ingreso:true,
  gastos:false
})
const categoria = ref([])
const isEditMode = ref(false)
const selectedId = ref(null)
const indiceEditando = ref(null)
const router = useRouter()
const fechaActual = new Date().toISOString().split('T')[0]

onMounted(async () => {
  await cargarCategoria()
})

async function cargarCategoria() {
  try {
    categoria.value = await getAllExpenses()
    console.log('Categorías cargadas:', categoria.value)
  } catch (error) {
    console.error('Error al cargar gastos:', error)
  }
}


const headers =computed(() =>  [
  { title: t('categorias.name'), value: 'name' },
  { title: t('categorias.description'), value: 'description' },
  { title: t('categorias.type'), value: 'type' },
  { title: t('categorias.accion'), value: 'actions', sortable: false }
])

function setIngreso(valor) {
  form.value.ingreso = valor
}

async function guardarCategoria() {
  const datos = {
    name: form.value.nombreCategoria,
    type: form.value.ingreso ? 'ingreso' : 'gasto',
    description: form.value.descripcion,
    user_id: 1,
    created_at: new Date().toISOString().split('T')[0]
  }

  console.log('Datos a enviar:', datos)

  try {
    if (isEditMode.value) {
      await updateCategoria(selectedId.value, datos)
    } else {
    await createExpense(datos)
  }
  await cargarCategoria()
    resetForm()
    isEditMode.value= false
}  catch (error) {
    console.error('Error al crear categoría:', error.response?.data || error)
  }
}

async function editarCategoria(index) {
  try {
    const cat = categoria.value[index]

    form.value.nombreCategoria = cat.name || ''
    form.value.descripcion = cat.description || ''
    form.value.ingreso = cat.type === 'ingreso'
    // Si tienes otro campo que controlar, asigna aquí...

    selectedId.value = cat.id  // si tienes un campo para id de categoría
    isEditMode.value = true
  } catch (error) {
    console.error('Error al cargar categoría para edición:', error)
  }
}

async function eliminarCategoria(index) {
  const cat = categoria.value[index]
  try {
    await deleteCategoria(cat.id)
    await cargarCategoria() // vuelve a cargar la lista actualizada desde el backend
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
  }
}
function cancelar() {
  resetForm()
  router.push('/home')
}

function resetForm() {
  form.value = {
  nombreCategoria: '',
  descripcion: '',
  ingreso:false,
  gastos:false
  }
}
</script>

<style>

.fondo {
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
    width:450px;
    margin: 0 auto;
    padding: 5px;

}

.header-inline {
    display: flex;
    align-items: center;
    gap: 5px;
}

.seccion-campos {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.checkbox-row {
  margin-top: -5px !important; /*  Sube los checkboxes */
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.custom-height {
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: 15px;
  max-height: 45px;
}

.img-nombre{
  display: block;
  width: 40px;
  height: auto;
}

.form-buttons {
  display: flex;
  justify-content: center; /* o flex-end si prefieres */
  align-items: center;
  gap: 8px; /* 🔽 espacio entre botones */
  margin-top: -5px;
}

.btn {
  text-transform: none !important; /* 🔥 evita las mayúsculas automáticas */
  font-size: 12px !important;       /* 🔥 fuerza tu tamaño */
  font-family: 'Poppins', sans-serif !important;
  display: flex; /* ← clave */
  align-items: center; /* centra verticalmente */
  justify-content: center; /* centra horizontalmente */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 75px;
  height: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 10px;


}

.btn-aceptar {
  background-color: #196c2c; /* verde */
  color: white;
}

.btn-cancelar {
  background-color: #dc3545; /* rojo */
  color: white;
  margin-right: 10px;
}

.acciones-categoria {
  display: flex;
  gap: 4px; /* espacio entre botones */
  align-items: center;
  justify-content: center;
}

.titulo-categoria{
  text-align: center;
  font-family: popins, sans-serif;
  font-size: 17px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.mi-barra,
.mi-barra2 {
  border: none;
  border-bottom: 2px solid #000;
  width: 100%;
  margin-bottom: 10px;
  left: 5%;
}

.categoria-ingreso,
.categoria-gastos {
  margin: 0 10px 0 0;
  font-size: 14px;

}

/*kkk*/
.botones-categoria{
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* Botones a la derecha */
  flex-wrap: wrap; /* Que bajen en pantallas chicas */
  font-size:10px;
}


.texto-categoria {
  flex: 1;
  font-size: 0.9rem;
  margin-right: 1rem;  /* espacio a la derecha para los botones */
}

.tabla-categorias .v-data-table-header th {
  background-color: #e3f2fd; /* azul claro */
  color: #0d47a1;
  font-weight: 300;
  font-size: 12px;
}

.tabla-categorias .v-data-table__td {
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #ccc;
}

.tabla-categorias .v-data-table__wrapper {
  border-radius: 10px;
}

.tabla-categorias .v-data-table {
  border-radius: 12px;
}

.v-data-table th,
.v-data-table td {
  padding: 0px 0px;     /* Reduce padding */
  white-space: nowrap;  /* Evita salto de línea dentro de la celda */
  max-width: 100px;     /* Ajusta ancho máximo */
  overflow: hidden;
  text-overflow: ellipsis; /* Agrega "..." si no cabe el texto */
}


@media (max-width: 1115px) {
  .texto-categoria {
    font-size: 1.5vw;
  }

  .img-nombre{
    height: 13%;
  }
}
@media (max-width: 900px) {
  .texto-categoria {
    font-size: 1.5vw;
  }

  .img-nombre{
    height: 13%;
  }
}
@media (max-width: 480px) {
  .fondo {
    position: fixed;
    width: 90%;
    left: 5%;
    font-size: 3vw;
  }

  .texto-categoria {
    font-size: 3vw;
  }

  .botones-categoria {
    justify-content: center; /* Centrar botones en móvil */
  }
}
</style>