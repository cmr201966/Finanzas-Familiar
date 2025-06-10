<template>
    <NavBar />
    <Footer />
  <div class="fondo">
    <img class="img-nombreT" src="../assets/img/tarjetas/transferencias.png" alt="">
    <h2 class="titulo-transacciones">{{ $t('transacciones.titulo-transacciones' )}}</h2>
    <hr class="mi-barra-transaccion" />
    <div class="entrada-transacciones">
  <select
    class="in-transacciones"
    v-model="form.nombreCategoria"
  >
    <option disabled value="">{{ $t('transacciones.placeholdertransaccion') }}</option>
    <option
      v-for="opcion in opcionesCategorias"
      :key="opcion.value"
      :value="opcion.value"
    >
      {{ opcion.label }}
    </option>
  </select>
</div>
    <div class="entrada-importe">
      <input
        class="in-descripcion"
        type="text"
        v-model="form.descripcion"
        :placeholder="$t('transacciones.placeholderimporte')"
      />
    </div>
    <div class="entrada-fecha-importe">
        <input type="date" v-model="form.fechaApertura" />
      </div>
      <div class="selecciona-cuentas">
  <select
    class="in-transacciones"
    v-model="form.nombreCategoria"
  >
    <option disabled value="">{{ $t('transacciones.seleccion-cuenta') }}</option>
    <option
      v-for="opcion in opcionesCategorias"
      :key="opcion.value"
      :value="opcion.value"
    >
      {{ opcion.label }}
    </option>
  </select>
</div>
    <p class="transaccion-ingreso">{{ $t('categorias.ingreso' )}}</p>
     <div class="entrada-ingresoT-check">
        <input
      type="checkbox"
      :checked="form.ingreso"
      @change="form.ingreso = true"
    />
      </div>
      <p class="transaccion-gastos">{{ $t('categorias.gastos' )}}</p>
     <div class="entrada-gastosT-check">
        <input
      type="checkbox"
      :checked="!form.ingreso"
      @change="form.ingreso = false"
    />
      </div>
      <div class="entrada-descripcionT">
      <input
        class="in-descripcion"
        type="text"
        v-model="form.descripcion"
        :placeholder="$t('transacciones.descripcionT')"
      />
    </div>
      <hr class="mi-barra2-transaccion" />
      <div class="botones-transaccion">
        <v-btn class="save" color="primary" @click="guardarCategoria">
          Guardar
        </v-btn>

        <v-btn class="cancelar" color="error" @click="cancelar">
          Cancelar
        </v-btn>
        </div>
        <div class="lista-categoria">
      <h3>{{ $t('transacciones.transaccionesG') }}</h3>
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
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import { getAllExpenses, getExpenseById, createExpense, updateCategoria, deleteCategoria } from '@/services/expensesService.js' // Ajusta la ruta si es necesario
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
    form.value.ingreso = cat.type === 'income'
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
  background: linear-gradient(#79bef7, #13ac18);
  width: 38%;
  min-height: 82%;
  position: absolute;
  top: 10%;
  left: 32%;
  border-radius: 1%;
  border: 2px solid black;
  padding-bottom: 2vw; /* Añade espacio inferior para la lista */
  overflow-y: auto; /* Habilita scroll si se excede mucho */
}
.img-nombreT{
    position: absolute; left: 8%; top: 2%;
    width: 18%;
    height: 20%;
}
.img-nombre2T{
    position: absolute; left: 15%; top: 35%;
    width: 8%;
    height: 8%;
    z-index:1000;
}
.img-nombre3T{
    position: absolute; left: 15%; top: 45%;
    width: 8%;
    height: 8%;
    z-index:999;
}
.titulo-transacciones{
    font-family: Arial, sans-serif;
    font-size: 2.5vw;
    font-weight: bold;
    position: absolute; top: 7%; left: 38%;
}
.mi-barra-transaccion {
  position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 21%;
  left: 5%;
}
.mi-barra2-transaccion {
 position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 66%;
  left: 5%;
}
.entrada-transacciones select{
    position: absolute; top: 30%; left: 15%;
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 6vw;
    width: 75%;
    height: 8%;
}
.entrada-importe input{
    position: absolute; top: 40%; left: 15%;
    background-color: white;
    border: 2px solid black;
    border-radius: 2vw;
    padding-left: 3vw;
    width: 30%;
    height: 6.7%;
}
.transaccion-ingreso{
    position: absolute; top: 25%; left: 20%;
    font-weight: bold;
}
.entrada-ingresoT-check{
    position: absolute; top: 25.3%; left: 38%;
}
.transaccion-gastos{
    position: absolute; top: 25%; left: 60%;
    font-weight: bold;
}
.entrada-gastosT-check{
    position: absolute; top: 25.3%; left: 80%;
}
.entrada-fecha-importe{
  position: absolute; top: 40%; left: 54.6%;
  background-color: white;
  border-radius: 2vw;
  border: 2px solid #000000;
  width: 35%;
  padding-left: 1.8vw;
  padding-top: 0.5vh;
  height: 5.5vh;
}
.selecciona-cuentas select{
   position: absolute; top: 49%; left: 15%;
   background-color: white;
   border: 2px solid #000000;
   border-radius: 2vw;
   width: 75%;
   height: 5.5vh;
   padding-left: 5vw;
}
.entrada-descripcionT input{
   position: absolute; top: 58%; left: 15%;
   background-color: white;
   border: 2px solid #000000;
   border-radius: 2vw;
   width: 75%;
   height: 5.5vh;
   padding-left: 5vw;
}
.botones-transaccion {
  position: absolute;
  top: 70%;
  left: 47%;
  display: flex;
  gap: 1vw;
  min-width: 0.5vw;
}
.save, .cancelar {
  min-width: 6rem;
  padding: 0.4em 1em;
  height: 2.5rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
.botones-categoria{
  display: flex;
  gap: 1rem;
  justify-content: flex-end; /* Botones a la derecha */
  flex-wrap: wrap; /* Que bajen en pantallas chicas */
  font-size: 5vw;
}

.lista-categoria ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lista-categoria ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5vw 1vw;
  border-bottom: 1px solid #ccc;
  word-break: break-word;
}
.lista-categoria {
    position: absolute;
    top: 80%;
    left: 0%;
    width: 100%;
    background-color: #ffffffdd;
    padding: 1vw;
    border-radius: 0.5vw;
    border: 1px solid black;
    font-size: 1vw;
    height: auto;
    overflow-y: auto; /* por si crece mucho */
}
.texto-categoria {
  flex: 1;               /* ocupa todo el espacio posible */
  font-size: 1vw;
  margin-right: 1rem;    /* espacio a la derecha para los botones */
}
.botones-categoria {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;        /* evita que los botones se encojan */
}
.item-categoria {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 1vw;
  border-bottom: 1px solid #ccc;
  width: 100%;
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