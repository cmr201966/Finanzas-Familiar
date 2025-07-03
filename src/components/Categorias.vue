<template>
   <!--<div class="fondo">
    <img class="img-nombre" src="../assets/img/tarjetas/CatIngresosgGastos.png" alt="">
    <h2 class="titulo-categoria">{{ $t('categorias.titulo-categoria' )}}</h2>
    <hr class="mi-barra" />
    <img class="img-nombre2" src="../assets/img/icono/DCIngGast.png" alt="">
    <div class="entrada-categoria">
      <input
        class="in-categoria"
        type="text"
        v-model="form.nombreCategoria"
        :placeholder="$t('categorias.placeholdercategoria')"
      />
    </div>
    <img class="img-nombre3" src="../assets/img/icono/NCIngGast.png" alt="">
    <div class="entrada-descripcion">
      <input
        class="in-descripcion"
        type="text"
        v-model="form.descripcion"
        :placeholder="$t('categorias.placeholderdescripcion')"
      />
    </div>
    <p class="categoria-ingreso">{{ $t('categorias.ingreso') }}</p>
<div class="entrada-ingreso-check">
  <input
    type="checkbox"
    :checked="form.ingreso"
    @change="setIngreso(true)"
  />
</div>

<p class="categoria-gastos">{{ $t('categorias.gastos') }}</p>
<div class="entrada-gastos-check">
  <input
    type="checkbox"
    :checked="!form.ingreso"
    @change="setIngreso(false)"
  />
</div>
      <hr class="mi-barra2" />
      <div class="botones">
        <v-btn class="save" color="primary" @click="guardarCategoria">
          Guardar
        </v-btn>

        <v-btn class="cancelar" color="error" @click="cancelar">
          Cancelar
        </v-btn>
        </div>
        <div class="lista-categoria">
      <h3>{{ $t('categorias.categoriaG') }}</h3>
      <ul>
       <li v-for="(cat, index) in categoria" :key="index">
      <span class="texto-categoria">{{ cat.name }} - {{ cat.description }} - {{ cat.type }} </span>
      <span class="botones-categoria">
        <v-btn small icon color="blue" @click="editarCategoria(index)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn small icon color="red" @click="eliminarCategoria(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </span>
    </li>
      </ul>
    </div>
  </div>-->
  <div class="fondo">
    <!-- Título y Encabezado -->
    <div class="header-inline">
      <img class="img-nombre" src="../assets/img/tarjetas/CatIngresosgGastos.png" alt="">
      <h2 class="titulo-categoria">{{ $t('categorias.titulo-categoria' )}}</h2>
    </div>
    <hr class="mi-barra" />

    <!-- Campo: Nombre de Categoría -->
    <v-row class="seccion-campos">
      <v-col cols="12" md="12"  class="pa-0 ma-0 ms-5">
        <v-text-field
          v-model="form.nombreCategoria"
          :placeholder="$t('categorias.placeholdercategoria')"
          prepend-inner-icon="mdi-tag"
          outlined
          dense
          density="compact"
          color="primary"
          width="450"

        />
      </v-col>

      <!-- Campo: Descripción -->
      <v-col cols="12" md="12" class="pa-0 ma-0 ms-5" >
        <v-text-field
          v-model="form.descripcion"
          :placeholder="$t('categorias.placeholderdescripcion')"
          prepend-inner-icon="mdi-text"
          outlined
          dense
          density="compact"
          color="primary"
          width="450"
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

    <!-- Botones -->
    <div class="botones">
      <v-btn class="save" color="primary" @click="guardarCategoria">
        {{ $t('categorias.submit') }}
      </v-btn>
      <v-btn class="cancelar" color="error" @click="cancelar">
        {{ $t('categorias.cancel') }}
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
  class="mx-auto pa-2 mt-4"
  elevation="8"
  style="max-width: 600px; border-radius: 16px; background-color: #f9f9f9;"
>
  <v-data-table
    :headers="headers"
    :items="categoria"
    item-value="id"
    class="tabla-informePresupuesto"
    :items-per-page="-1"
    hide-default-footer
    dense
    height="220"
  >
    <template #item.actions="{ index }">
      <div class="acciones-categoria">
    <v-btn icon size="small" @click="editarCategoria(index)" variant="text">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon size="small" @click="eliminarCategoria(index)" variant="text">
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
    padding: 20px 15px;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
    margin: auto;
    max-width: 500px;
    overflow: hidden;
}

.largo-input {
  margin: 1vw 0;
  margin-left: 2vw; /* o 20px, según lo que necesites */
}

.header-inline {
    display: flex;
    align-items: center;
    gap: 15px;
}

.img-nombre{
  display: block;
  width: 60px;
  height: auto;
}
/*.img-nombre2{
    position: absolute; left: 15%; top: 28%;
    width: 8%;
    height: 8%;
    z-index:1000;
}
.img-nombre3{
    position: absolute; left: 15%; top: 37%;
    width: 8%;
    height: 8%;
    z-index:999;
}*/

.acciones-categoria {
  display: flex;
  gap: 4px; /* espacio entre botones */
  align-items: center;
  justify-content: center;
}

.v-btn {
  box-shadow: none !important; /* quita cualquier sombra */
  border: none !important;     /* asegura que no hay bordes */
  padding: 0 !important;       /* elimina padding extra */
  min-width: 32px;             /* o más pequeño si deseas */
}

.titulo-categoria{
  text-align: center;
  font-family: popins, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1vw;
  margin-bottom: 1vw;
}
.mi-barra,
.mi-barra2 {
  border: none;
  border-bottom: 2px solid #000;
  width: 100%;
  margin: 1vw 0;
}

/*.mi-barra2 {
 position: absolute;
  border: none;      /* quita borde default
  border-bottom: 2px solid #000;  /* línea negra de 2px
  width: 90%;       /* o el ancho que quieras
  margin: 10px 0;    /* espacio arriba y abajo
  top: 55%;
  left: 5%;
}*/

.seccion-campos {
  margin-top: 10px;

}

.entrada-categoria input{
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 6vw;
    width: 75%;
    height: 8%;
}
.entrada-descripcion input{
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 6vw;
    width: 75%;
    height: 8%;
}


.categoria-ingreso,
.categoria-gastos {
  font-weight: bold;
  margin-right: 1vw;
}

/*.categoria-ingreso{
    position: absolute; top: 50%; left: 20%;
    font-weight: bold;
}*/

.entrada-ingreso-check{
    position: absolute; top: 50.3%; left: 38%;
}

/*.categoria-gastos{
    position: absolute; top: 50%; left: 60%;
    font-weight: bold;
}*/

.entrada-gastos-check{
    position: absolute; top: 50.3%; left: 80%;
}

.botones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 3%;
}

.save,
.cancelar {
  padding: 0.4em 1em;
  height: 2.5rem;
  font-size: 10px;
  width: 85px;

}

.botones-categoria{
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* Botones a la derecha */
  flex-wrap: wrap; /* Que bajen en pantallas chicas */
  font-size: 1rem;
}


.lista-categoria {
  top: 5px; /* para subirla */
  bottom: 15px;
  height: 90px; /* reducir altura */
  overflow-y: auto;
  background-color: #ffffffdd;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 10px;

}

.texto-categoria {
  flex: 1;
  font-size: 0.9rem;
  margin-right: 1rem;  /* espacio a la derecha para los botones */
}

.botones-categoria {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.item-categoria {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  width: 90%;
}

@media (max-width: 1115px) {
  .texto-categoria {
    font-size: 1.5vw;
  }
  .botones {
    position: absolute; left: 24%;
  }
  .entrada-categoria input,
  .entrada-descripcion input {
    width: 80%;
    font-size: 1.5vw;
  }
  .entrada-gastos-check{
    position: absolute; left: 85%;
  }
  .entrada-ingreso-check{
   position: absolute; left: 45%;
  }
  .img-nombre{
    height: 13%;
  }
}
@media (max-width: 900px) {
  .texto-categoria {
    font-size: 1.5vw;
  }
  .botones {
    position: absolute; left: 24%;
  }
    .save, .cancelar {
    font-size: 1.5vw !important;
    width: 12vw !important;
    height: 5vh !important;
    position: fixed; left: -10%;
  }
  .entrada-categoria input,
  .entrada-descripcion input {
    width: 80%;
    font-size: 1.5vw;
  }
  .entrada-gastos-check{
    position: absolute; left: 85%;
  }
  .entrada-ingreso-check{
   position: absolute; left: 45%;
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

  .entrada-categoria input,
  .entrada-descripcion input {
    width: 80%;
    font-size: 3vw;
  }

  .texto-categoria {
    font-size: 3vw;
  }

  .save, .cancelar {
    font-size: 1.5vw !important;
    width: 2rem !important;
    height: 1.3rem !important;
    position: fixed; left: 70%;
  }

  .botones-categoria {
    justify-content: center; /* Centrar botones en móvil */
  }
}
</style>