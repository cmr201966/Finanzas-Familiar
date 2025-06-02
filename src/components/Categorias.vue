<template>
  <div class="fondo">
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
    <p class="categoria-ingreso">{{ $t('categorias.ingreso' )}}</p>
     <div class="entrada-ingreso-check">
        <input
      type="checkbox"
      :checked="form.ingreso"
      @change="form.ingreso = true"
    />
      </div>
      <p class="categoria-gastos">{{ $t('categorias.gastos' )}}</p>
     <div class="entrada-gastos-check">
        <input
      type="checkbox"
      :checked="!form.ingreso"
      @change="form.ingreso = false"
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
       {{ cat.name }} - {{ cat.type }}
      <span class="texto-categoria">{{ categoria.name }} - {{ categoria.type }}</span>
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import { getAllExpenses, getExpenseById, createExpense } from '@/services/expensesService.js' // Ajusta la ruta si es necesario
const form = ref({
  nombreCategoria: '',
  descripcion: '',
  ingreso:true,
  gastos:false
})
const categoria = ref([])
const modoEdicion = ref(false)
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

async function guardarCategoria() {
  const datos = {
    name: form.nombreCategoria,
    type: form.tipo,
    user_id: 1,
    created_at: new Date().toISOString().split('T')[0]
  }

  console.log('Datos a enviar:', datos)

  try {
    await createExpense(datos)
  } catch (error) {
    console.error('Error al crear categoría:', error.response?.data || error)
  }
}


function editarCategoria(index) {
  form.value = { ...categoria.value[index] }
  modoEdicion.value = true
  indiceEditando.value = index
}

function eliminarCategoria(index) {
  categoria.value.splice(index, 1)
  if (modoEdicion.value && indiceEditando.value === index) {
    resetForm()
    modoEdicion.value = false
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
  background: linear-gradient(#79bef7, #13ac18);
  width: 38%;
  min-height: 70%;
  position: absolute;
  top: 10%;
  left: 32%;
  border-radius: 1%;
  border: 2px solid black;
  padding-bottom: 2vw; /* Añade espacio inferior para la lista */
  overflow-y: auto; /* Habilita scroll si se excede mucho */
}
.img-nombre{
    position: absolute; left: 4%; top: 4%;
    width: 15%;
    height: 18%;
}
.img-nombre2{
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
}
.titulo-categoria{
    font-family: Arial, sans-serif;
    font-size: 1.7vw;
    font-weight: bold;
    position: absolute; top: 8%; left: 22%;
}
.mi-barra {
  position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 23%;
  left: 5%;
}
.mi-barra2 {
 position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 55%;
  left: 5%;
}
.entrada-categoria input{
    position: absolute; top: 28%; left: 15%;
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 6vw;
    width: 75%;
    height: 8%;
}
.entrada-descripcion input{
    position: absolute; top: 37%; left: 15%;
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 6vw;
    width: 75%;
    height: 8%;
}
.categoria-ingreso{
    position: absolute; top: 50%; left: 20%;
    font-weight: bold;
}
.entrada-ingreso-check{
    position: absolute; top: 50.3%; left: 38%;
}
.categoria-gastos{
    position: absolute; top: 50%; left: 60%;
    font-weight: bold;
}
.entrada-gastos-check{
    position: absolute; top: 50.3%; left: 80%;
}
.botones {
  position: absolute;
  top: 60%;
  left: 47%;
  display: flex;
  gap: 1vw;
  min-width: 0.5vw;
}
.save{
    width: 6rem !important;
    height: 2rem !important;
    font-size: 1vw !important;
}
.cancelar{
    width: 6rem !important;
    height: 2rem !important;
    font-size: 1vw !important;
}
.botones-categoria{
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* Botones a la derecha */
  flex-wrap: wrap; /* Que bajen en pantallas chicas */
  font-size: 5vw;
}

.lista-categoria{
    position: absolute;
    top: 69%;
    left: 0%;
    width: 100%;
    background-color: #ffffffdd;
    padding: 1vw;
    border-radius: 0.5vw;
    border: 1px solid black;
    font-size: 1vw;
    height: auto;
}
.texto-categoria{
 flex: 1;
  font-size: 1vw;
  word-break: break-word;
}
.item-categoria {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 1vw;
  border-bottom: 1px solid #ccc;
  width: 100%;
}
@media (max-width: 768px) {
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