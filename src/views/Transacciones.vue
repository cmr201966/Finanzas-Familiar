<template>
  <NavBar />
  <div class="fondo">
      <div class="header-inline">
          <img class="img-nombreT" src="../assets/img/tarjetas/Transaccion.png" alt="">
          <h2 class="titulo-transacciones">{{ $t('transacciones.titulo-transacciones' )}}</h2>
      </div>
      <hr class="mi-barra-transaccion" />

      <!-- Radio botoom de Ingreso y Gasto en fila -->
      <div class="radio-opciones">
        <label class="radio-label">
          <input
            type="radio"
            name="tipo"
            value="true"
            v-model="form.ingreso"
          />
          {{ $t('categorias.ingreso') }}
        </label>

        <label class="radio-label">
          <input
            type="radio"
            name="tipo"
            value="false"
            v-model="form.ingreso"
          />
          {{ $t('categorias.gastos') }}
        </label>
      </div>


      <!-- Seleccion de categorias -->
      <v-row class="seccion-campos">
        <v-col cols="12" md="12">
          <v-select
            v-model="form.categoria_id"
            :items="categoria"
            item-title="name"
            item-value="id"
            :label="$t('transacciones.placeholdertransaccion')"
            prepend-inner-icon="mdi-tag"
            dense
            outlined
            class="custom-height white-rounded"
            color="primary"
            density="compact"
            hide-details
            width="100%"
          />
        </v-col>
      </v-row>

      <!-- Importe -->
      <v-row class="seccion-campos">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.importe"
            :placeholder="$t('transacciones.placeholderimporte')"
            prepend-inner-icon="mdi-cash"
            type="number"
            min="0"
            dense
            outlined
            color="primary"
            density="compact"
            class=" custom-height white-rounded"
            hide-details
            width="95%"
          />
        </v-col>

        <!-- Fecha -->

        <v-col cols="12" md="6">
          <v-menu
            v-model="menuFecha"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="form.fechaApertura"
                v-bind="props"
                :placeholder="$t('transacciones.date')"
                dense
                outlined
                hide-details
                color="primary"
                density="compact"
                class="white-rounded custom-height"
                type="text"
                readonly
                prepend-inner-icon="mdi-calendar"
              />
            </template>

            <v-date-picker
              v-model="form.fechaApertura"
              color="primary"
              @update:model-value="menuFecha = false"
            />
          </v-menu>
        </v-col>
      </v-row>

      <!-- Cuenta seleccionada asociada -->
      <v-row class="seccion-campos">
        <v-col cols="12" md="12">
          <v-select
            v-model="form.cuentas"
            :items="cuentas"
            item-title="name"
            item-value="id"
            :label="$t('transacciones.seleccion-cuenta')"
            prepend-inner-icon="mdi-bank"
            dense
            outlined
            hide-details
            density="compact"
            color="primary"
            class="white-rounded custom-height"
            width="100%"
          />
        </v-col>
      </v-row>

      <!-- Descripcion -->
      <v-row class="seccion-campos">
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.descripcion"
            :placeholder="$t('transacciones.descripcionT')"
            prepend-inner-icon="mdi-text"
            dense
            hide-details
            outlined
            color="primary"
            density="compact"
            class="white-rounded custom-height"
            width="100%"
          />
        </v-col>
      </v-row>

      <hr class="mi-barra-transaccion" />

      <!-- Botones de  Aceptar y cancelar -->

      <div class="form-buttons">

        <!-- Botón Aceptar (verde) -->
        <v-btn  @click="guardarTransaccion"
                class="btn btn-aceptar">{{ $t("transacciones.submit") }}
        </v-btn>

        <!-- Botón Cancelar (rojo) -->
        <v-btn  @click="cancelar"
                color="error"
                class="btn btn-cancelar"> {{ $t("transacciones.cancel") }}
        </v-btn>
      </div>

      <!-- Tabla de transacciones -->
      <v-card
        class="mx-auto pa-2"
        elevation="8"
        style="max-width: 100%;  border-radius: 12px; background-color: #fafafa;"
      >
        <v-data-table
          :headers="headersTransacciones"
          :items="transacciones"
          item-value="id"
          class="tabla-transacciones-pequena"
          :items-per-page="-1"
          hide-default-footer
          dense
          fixed-header
          height="150"

        >
          <template #item.categoria="{ item }">
            {{ getCategoryName(item.category_id) || 'Sin categoría' }}
          </template>

          <template #item.cuenta="{ item }">
            {{ getAccountName(item.account_id) || 'Sin cuenta' }}
          </template>

          <template #item.acciones="{ item }">
            <div class="d-flex align-center justify-start" style="gap: 2px">
                <v-btn icon variant="text" color="primary" @click="editarTransaccion(item)">
                    <v-icon size="16">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="error" @click="eliminarTransaccion(item)">
                    <v-icon size="16">mdi-delete</v-icon>
                </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>



      <!--<div class="entrada-transacciones">
              <select
              class="in-transacciones"
              v-model="form.categoria_id"
            >
              <option disabled value="">{{ $t('transacciones.placeholdertransaccion') }}</option>
              <option
                v-for="cat in categoria"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>

          </div>
      <div class="entrada-importe">
        <input
          class="in-descripcion"
          type="number"
          min="0"
          v-model="form.importe"
          :placeholder="$t('transacciones.placeholderimporte')"
        />
      </div>
      <div class="entrada-fecha-importe">
          <input type="date" v-model="form.fechaApertura" />
        </div>
        <div class="selecciona-cuentas">
          <select
          class="in-transacciones"
          v-model="form.cuentas"
        >
          <option disabled value="">{{ $t('transacciones.seleccion-cuenta') }}</option>
          <option
            v-for="cuenta in cuentas"
            :key="cuenta.id"
            :value="cuenta.id"
          >
            {{ cuenta.name }}
          </option>
        </select>
      </div>-->

      <!--<p class="transaccion-ingreso">{{ $t('categorias.ingreso') }}</p>
        <div class="entrada-ingresoT-check">
          <input
            type="checkbox"
            :checked="form.ingreso"
            disabled
          />
        </div>

        <p class="transaccion-gastos">{{ $t('categorias.gastos') }}</p>
        <div class="entrada-gastosT-check">
          <input
            type="checkbox"
            :checked="!form.ingreso"
            disabled
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
          <v-btn class="save" color="primary" @click="guardarTransaccion">
            Guardar
          </v-btn>

          <v-btn class="cancelar" color="error" @click="cancelar">
            Cancelar
          </v-btn>
          </div>

          <div class="lista-categoria">
        <h3>{{ $t('transacciones.transaccionesG') }}</h3>
        <ul>
        <li v-for="(trans, index) in transacciones" :key="index">
        <span class="texto-categoria">{{ trans.date }}-{{ trans.type }}-{{ getCategoryName(trans.category_id) || 'Sin categoría' }}-
          {{ getAccountName(trans.account_id) || 'Sin cuenta' }}-{{ trans.amount }}
        </span>
        <span class="botones-categoria">
          <v-btn small icon color="blue" @click="editarTransaccion(index)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn small icon color="red" @click="eliminarTransaccion(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </span>
      </li>
        </ul>
      </div>-->
  </div>
  <Footer />
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive, watch , computed} from 'vue'
import { getAllExpenses } from '@/services/expensesService.js' // Ajusta la ruta si es necesario
import { getAllAccounts } from '@/services/accountService.js'
import { getAllTransactions, createTransaction, deleteTransaction, updateTransaction } from '@/services/transaccionesService.js'
import { useI18n } from "vue-i18n";


const menuFecha = ref(false)
const { locale, t } = useI18n();

const form = ref({
  categoria_id: '',
  importe: '',
  fechaApertura: '',
  descripcion: '',
  ingreso: true,
  gastos:false,
  cuentas: '',
  nombreCuenta: '',
})
const categoria = ref([])
const cuentas = ref ([])
const transacciones = ref ([])
const isEditMode = ref(false)
const selectedId = ref(null)
const id = ref(null)
const indiceEditando = ref(null)
const router = useRouter()
const fechaActual = new Date().toISOString().split('T')[0]

onMounted(async () => {
  await cargarCategoria()
  await cargarCuentas()
  await cargarTransacciones()
})

watch(() => form.value.categoria_id, (nuevoId) => {
  const catSeleccionada = categoria.value.find(cat => cat.id === nuevoId)
  if (catSeleccionada) {
    form.value.ingreso = catSeleccionada.type === 'ingreso'
  }
})

watch(() => form.value.fechaApertura, (nuevaFecha) => {
  if (nuevaFecha instanceof Date) {
    const d = nuevaFecha
    const dia = d.getDate().toString().padStart(2, '0')
    const mes = (d.getMonth() + 1).toString().padStart(2, '0')
    const anio = d.getFullYear()
    form.value.fechaApertura = `${anio}-${mes}-${dia}` // o cambia al formato que prefieras
  }
})

async function cargarCategoria() {
  try {
    const data = await getAllExpenses()
    categoria.value = data
    console.log('Categorías cargadas:', categoria.value)
  } catch (error) {
    console.error('Error al cargar gastos:', error)
  }
}

async function cargarCuentas() {
  try {
    const data = await getAllAccounts()
    cuentas.value = data
    console.log('Cuentas cargadas:', cuentas.value)
  } catch (error) {
    console.error('Error al cargar cuentas:', error)
  }
}

async function cargarTransacciones() {
  try {
    const data = await getAllTransactions()
    transacciones.value = data.transacciones
    console.log('transacciones cargadas:', transacciones.value)
  } catch (error) {
    console.error('Error al cargar transacciones:', error)
  }
}

const headersTransacciones = computed(() => [
  { title: t('transacciones.date'),  value: 'date' },
  { title: t('transacciones.type'),  value: 'type' },
  { title: t('transacciones.category') , value: 'categoria' },
  { title: t('transacciones.account'),  value: 'cuenta' },
  { title: t('transacciones.amount'),  value: 'amount' },
  { title: t('transacciones.action'), value: 'acciones', sortable: false }
])


function getCategoryName(category_id) {
  const cat = categoria.value.find(c => c.id === category_id)
  return cat ? cat.name : null
}

function getAccountName(account_id) {
  const acc = cuentas.value.find(c => c.id === account_id)
  return acc ? acc.name : null
}

async function guardarTransaccion() {
  if (Number(form.value.importe) <= 0 || isNaN(Number(form.value.importe))) {
    alert('El importe debe ser un número positivo')
    return
  }

  const transaccion = {
  amount: form.value.importe,
  type: form.value.ingreso ? 'ingreso' : 'gasto',
  description: form.value.descripcion,
  date: form.value.fechaApertura,
  category_id: form.value.categoria_id,
  account_id: form.value.cuentas,   // <--- IMPORTANTE
  user_id: 1,      // <--- IMPORTANTE
  created_at: new Date().toISOString().split('T')[0]  // 'YYYY-MM-DD'
}

  console.log('Datos a enviar:', transaccion)

  try {
    if (isEditMode.value) {
      console.log('ID a actualizar:', id.value);  // imprime para verificar qué tiene id
      await updateTransaction(id.value, transaccion)
    } else {
      await createTransaction(transaccion)
    }
    await cargarTransacciones()
    resetForm()
    isEditMode.value = false
  } catch (error) {
    console.error('Error al crear transaccion:', error.response?.data || error)
  }
}

//async function editarTransaccion(index) {
 // try {
 //   const trans = transacciones.value[index]

 //   form.value.categoria_id = trans.category_id || ''
//    form.value.importe = trans.amount || ''
//    form.value.fechaApertura = trans.date || ''
 //   form.value.descripcion = trans.description || ''
//    form.value.ingreso = trans.type === 'ingreso'  // true si es ingreso, false si gasto
//    form.value.cuentas = trans.account_id || ''

//   id.value = trans.id // ✅ usar la variable correcta
 //   isEditMode.value = true
 //   console.log("Datos enviados para actualizar:", form.value)
//  } catch (error) {
//    console.error('Error al cargar transacción para edición:', error)
 // }
//}

async function editarTransaccion(trans) {
  try {
    form.value.categoria_id = trans.category_id || ''
    form.value.importe = trans.amount || ''
    form.value.fechaApertura = trans.date || ''
    form.value.descripcion = trans.description || ''
    form.value.ingreso = trans.type === 'ingreso'
    form.value.cuentas = trans.account_id || ''

    id.value = trans.id
    isEditMode.value = true
    console.log("Datos enviados para actualizar:", form.value)
  } catch (error) {
    console.error('Error al cargar transacción para edición:', error)
  }
}

//async function eliminarTransaccion(index) {
 // const trans = transacciones.value[index]
//  try {
 //   await deleteTransaction(trans.id)
//    await cargarTransacciones() // vuelve a cargar la lista actualizada desde el backend
//  } catch (error) {
//    console.error('Error al eliminar transaccion:', error)
 // }
//}

async function eliminarTransaccion(trans) {
  try {
    await deleteTransaction(trans.id)
    await cargarTransacciones()
  } catch (error) {
    console.error('Error al eliminar transacción:', error)
  }
}

function cancelar() {
  resetForm()
  router.push('/home')
}

function resetForm() {
  form.value = {
    categoria_id: '',
    importe: '',
    fechaApertura: '',
    descripcion: '',
    ingreso: true,
    cuentas: ''
  }
}
</script>

<style>

/* === Contenedor principal === */
.fondo {
  border-radius: 16px;
  background: linear-gradient(135deg, #42a5f5, #66bb6a);
  padding: 25px;
  box-sizing: border-box;
  color: white;
  margin: 20px auto;
  max-width: 550px;
  max-height: 650px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* === Encabezado e imagen === */
.img-nombreT {
  width: 60px;
  height: 50px;
  object-fit: contain;
}


.header-inline {
  display: flex;
  align-items: center;
  gap: 5px;
}

.titulo-transacciones {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  color: white;
  text-align: center;
}

.mi-barra-transaccion {
  border: none;
  border-bottom: 2px solid #000;
  width: 100%;
  margin: 10px 0;
  left: 5%;
}

/* === Radio botones ingreso/gasto === */
.radio-opciones {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 200px;
  margin-left: 15%;
  margin-top: 10px;
  color: white;
}

.radio-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 5px;
}

.radio-label input[type="radio"] {
  accent-color: white;
  width: 16px;
  height: 16px;
}

/* === Inputs Vuetify personalizados === */
.white-rounded .v-field {
  border-radius: 10px;
  /*border: 2px solid #818080;*/

}

.custom-height {
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: 15px;
  max-height: 45px;
}

/* === Botones de acción (Guardar / Cancelar) === */
.botones-transaccion {
  display: flex;
  gap: 1vw;
  justify-content: center;
  margin-top: 10px;
}

.save,
.cancelar {
  min-width: 6rem;
  padding: 0.4em 1em;
  height: 2.5rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}


.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* espacio entre botones */
  margin-left: 150px;
}

.btn {
  display: flex; /* ← clave */
  align-items: center; /* centra verticalmente */
  justify-content: center; /* centra horizontalmente */
  padding: 10px 20px;
  font-size: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 75px;
  height: 30px;
  font-style: "popins";
  margin-bottom: 7px;
  margin-top: 0px;
}

.btn-aceptar {
  background-color: #196c2c !important; /* verde */
  color: white !important;
}

.btn-cancelar {
  background-color: #dc3545; /* rojo */
  color: white;
}


/* === Estilo tabla moderna === */
.tabla-transacciones-pequena,
.tabla-transacciones-pequena * {
  font-size: 0.7rem !important;
}

.tabla-transacciones-pequena .v-data-table__wrapper tr {
  height: 30px;
}

.tabla-transacciones-pequena .v-data-table__wrapper {
  font-size: 0.85rem;
}

.tabla-transacciones-pequena .v-data-table-header th,
.tabla-transacciones-pequena .v-data-table__wrapper td {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  font-size: 0.70rem !important;
  font-size: 0.7rem !important;
  line-height: 0.9rem !important;

}

.tabla-transacciones-pequena .v-btn {
  min-width: 24px;
  height: 24px;
  padding: 0;
}

.tabla-transacciones-pequena .v-icon {
  font-size: 16px;
}


.v-input .v-field__field {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.tabla-transacciones-pequena .v-data-table {
  --v-table-header-height: auto !important;
}

::v-deep(.tabla-transacciones-pequena .v-data-table thead th),
::v-deep(.tabla-transacciones-pequena .v-data-table tbody td) {
  height: auto !important;
  padding: 2px 4px !important;
  font-size: 0.7rem !important;
  line-height: 1rem !important;
  vertical-align: middle !important;
}


/* Encabezado (th) y celdas (td) */
.tabla-transacciones-pequena .v-data-table thead th,
.tabla-transacciones-pequena .v-data-table tbody td {
  height: auto !important; /* Anula var(--v-table-header-height) */
  padding: 2px 4px !important;
  font-size: 0.7rem !important;
  line-height: 0.9rem !important;
  height: 24px !important; /* Forzar altura mínima más pequeña */
  vertical-align: middle !important;
  white-space: nowrap; /* Opcional: evita salto de línea */
}


/* === Responsivo === */
@media (max-width: 1115px) {
  .botones-transaccion {
    justify-content: center;
  }

  .img-nombre {
    height: 13%;
  }
}
.seccion-campos {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.seccion-campos .v-col {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

/* Elimina espacios internos de los campos */
.v-input {
  margin: 0 !important;
  padding: 0 !important;
}

.v-input__control {
  margin: 0 !important;
  padding: 0 !important;
}


@media (max-width: 900px) {
  .save,
  .cancelar {
    font-size: 1.5vw !important;
    width: 12vw !important;
    height: 5vh !important;
  }

  .img-nombre {
    height: 13%;
  }
}

@media (max-width: 480px) {
  .fondo {
    width: 90%;
    left: 5%;
    font-size: 3vw;
  }

  .save,
  .cancelar {
    font-size: 1.5vw !important;
    width: 2rem !important;
    height: 1.3rem !important;
  }
  }
</style>