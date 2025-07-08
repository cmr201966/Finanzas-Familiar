<template>
  <div>
    <div class="fondo">
      <div class="header-inline">
        <img class="img-nombre" src="../assets/img/tarjetas/cuentas.png" alt="">
        <p class="crear">{{ $t('cuentas.crear' )}}</p>
      </div>

      <hr class="mi-barra" />

      <v-row class="seccion-campos">

        <v-col cols="12" md="12"  class="pa-0 ma-0 ms-5">
          <v-text-field
            v-model="form.nombreCuenta"
            :placeholder="$t('cuentas.placeholderNombreCuenta')"
            prepend-inner-icon="mdi-credit-card-outline"
            outlined
            dense
            density="compact"
            color="primary"
            width="450"
            type="text"
        />
        </v-col>
        <v-col cols="12" md="12" class="pa-0 ma-0 ms-5" style="max-width: 450px;">
          <v-select
            v-model="form.banco"
            :items="bancos"
            item-text="name"
            item-value="name"
            :label="$t('cuentas.banco')"
            prepend-inner-icon="mdi-bank"
            outlined
            dense
            density="compact"
            clearable
          />
        </v-col>


        <v-col cols="12" md="12" class="pa-0 ma-0 ms-5" style="max-width: 450px;">
          <v-select
            v-model="form.tipoCuenta"
            :items="tiposFiltrados"
            item-text="name"
            item-value="name"
            :label="$t('cuentas.tipo-cuenta')"
            prepend-inner-icon="mdi-wallet"
            outlined
            dense
            density="compact"
            clearable
          />
        </v-col>
      </v-row>

      <!-- Calendario -->
      <v-row>
        <v-col cols="12" md="6" class="pa-0 ma-0">
          <v-menu
            v-model="menuFecha"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="250px"
            min-width="auto"
            >
            <template #activator="{ props }">
              <v-text-field
                v-model="form.fechaApertura"
                label="Fecha de apertura"
                prepend-inner-icon="mdi-calendar"
                type="date"
                readonly
                v-bind="props"
                outlined
                dense
                density="compact"
                color="primary"
                class="custom-height"
              />
            </template>
            <v-date-picker
                v-model="fechaSeleccionada"
                @update:model-value="onFechaSeleccionada"
              />
          </v-menu>
        </v-col>

        <!-- Saldo inicial -->
        <v-col cols="12" md="6" class="pa-0 ma-0">
          <v-text-field
            v-model.number="form.saldoInicial"
            :label="$t('cuentas.placeholdersaldo')"
            class="custom-height"
            type="number"
            min="0"
            step="0.01"
            @keypress="soloNumerosDecimal"
            :rules="[
              v => v !== null && v !== '' || $t('presup.required'),
              v => !isNaN(v) || $t('presup.only_numbers'),
              v => parseFloat(v) >= 0 || $t('presup.no_negative')
            ]"
            dense
            outlined
            density="compact"
            prepend-inner-icon="mdi-currency-usd"
          />
        </v-col>
      </v-row>

      <!-- Checkboxes Cuenta principal y Notificaciones-->

        <v-row class="checkbox-row" justify="center" align="center">
          <!-- Checkbox de cuenta principal -->
          <v-col cols="6" class="d-flex align-center justify-center">
            <p class="checkbox-label">{{ $t('cuentas.cuentaP') }}</p>
            <v-checkbox
              v-model="form.cuentaPrincipal"
              color="white"
              hide-details
              class="checkbox-label"
              density="compact"
            />
          </v-col>

          <!-- Checkbox de notificaciones -->
          <v-col cols="6" class="d-flex align-center justify-center">
            <p class="checkbox-label">{{ $t('cuentas.notifica') }}</p>
            <v-checkbox
              v-model="form.recibirNotificaciones"
              color="white"
              hide-details
              class="checkbox-label"
              density="compact"
            />
          </v-col>
        </v-row>

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
        <v-btn  @click="guardarCuenta"
          class="btn btn-aceptar" >{{ $t("categorias.submit") }}
        </v-btn>

        <!-- Botón Cancelar (rojo) -->
        <v-btn  @click="cancelar"
                class="btn btn-cancelar"> {{ $t("categorias.cancel") }}
        </v-btn>
      </div>


      <!-- Tabla de cuentas bancaria -->
      <v-card
        class="mx-auto pa-2 mt-4"
        elevation="8"
        style="max-width: 800px; border-radius: 16px; background-color: #f9f9f9;"
      >
        <v-data-table
          :headers="headers"
          :items="cuentas"
          item-value="id"
          class="tabla-cuentas font-tabla"
          :items-per-page="-1"
          hide-default-footer
          dense
          height="150"
        >
        <template #item.actions="{ index }">
          <div class="acciones-cuenta">
            <v-btn icon size="small" @click="editarCuenta(index)" variant="text" color="primary">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" @click="eliminarCuenta(index)" variant="text" color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
  </v-card>

    <!--<img class="img-nombre-c" src="../assets/img/icono/cuenta.png" alt="">
      <div class="entrada-nombre">
        <input class="in-nombre"
        type="text" v-model="form.nombreCuenta"
        :placeholder="$t('cuentas.placeholderNombreCuenta')" />
      </div>


      <img class="img-banco" src="../assets/img/icono/banco.png" alt="">
      <div class="entrada-banco">
  <select v-model="form.banco">
    <option disabled value="">{{ $t('cuentas.banco') }}</option>
    <option v-for="b in bancos" :key="b.id" :value="b.name">{{ b.name }}</option>
  </select>
</div>

      <img class="img-tipo" src="..\assets\img\icono\TCB.png" alt="">
      <div class="entrada-tipo-cuenta">
      <select v-model="form.tipoCuenta">
  <option disabled value="">{{ $t('cuentas.tipo-cuenta') }}</option>
  <option v-for="t in tiposFiltrados" :key="t.id" :value="t.name">
    {{ t.name }}
  </option>
</select>
      </div>

      <div class="entrada-fecha-apertura">
        <input type="date" v-model="form.fechaApertura" />
      </div>

      <img class="img-saldo" src="../assets/img/icono/dinero.png" alt="">
      <div class="entrada-saldo">
        <input type="number"
        min="0"
        v-model="form.saldoInicial"
        :placeholder="$t('cuentas.placeholdersaldo')" />
      </div>

      <div class="contenedor-p">
        <p class="cuenta-principal">{{ $t('cuentas.cuentaP' )}}</p>
      </div>
      <div class="entrada-cuenta-principal">
        <input type="checkbox" v-model="form.cuentaPrincipal" />
      </div>

        <p class="notificaciones">{{ $t('cuentas.notifica' )}}</p>
      <div class="entrada-notificaciones">
        <input type="checkbox" v-model="form.recibirNotificaciones" />
      </div>



      <div class="botones">
        <v-btn class="save" color="primary" @click="guardarCuenta">
          Guardar
        </v-btn>

        <v-btn class="cancelar" color="error" @click="cancelar">
          Cancelar
        </v-btn>
      </div>

      <div class="lista-cuentas">
      <h3>{{ $t('cuentas.cuentasG' )}}</h3>
      <ul>
        <li v-for="(cuenta, index) in cuentas" :key="index" class="item-cuenta">
  <span class="texto-cuenta">
    {{ cuenta.name }} - {{ cuenta.bank }} - {{ cuenta.type }}
  </span>
  <span class="botones-cuenta">
    <v-btn small icon color="blue" @click="editarCuenta(index)">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn small icon color="red" @click="eliminarCuenta(index)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </span>
</li>
      </ul>
    </div>-->
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted, computed, watch } from 'vue'
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
} from '@/services/accountService.js'
import { getBancos } from '@/services/bancoService.js'
import { getTiposCuenta } from '@/services/tipodecuentaService.js'
import { useI18n } from "vue-i18n";
import { nextTick } from 'vue'


const { t } = useI18n()

const router = useRouter()

const cuentas = ref([])
const bancos = ref([])
const tiposCuenta = ref([])

const menuFecha = ref(false)
const fechaSeleccionada = ref(null)

const form = reactive({
  nombreCuenta: '',
  banco: '',
  tipoCuenta: '',
  fechaApertura: '',
  saldoInicial: 0,
  cuentaPrincipal: false,
  recibirNotificaciones: false
})

const selectFecha = (fecha) => {
  const d = new Date(fecha);
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  const anio = d.getFullYear();
  form.value.fecha = `${dia}/${mes}/${anio}`;  // formato completo
  menuFecha.value = false;
};

const isEditMode = ref(false)
const selectedId = ref(null)

onMounted(async () => {
  await cargarCuentas()
  await cargarBancos()
  await cargarTiposCuenta()
})

async function cargarCuentas() {
  try {
    cuentas.value = await getAllAccounts()
  } catch (error) {
    console.error('Error al cargar cuentas:', error)
  }
}

const headers =computed(() =>  [
  { title: t('cuentas.ncuenta'), value: 'name' },
  { title: t('cuentas.nbanco'), value: 'bank' },
  { title: t('cuentas.tcuenta'), value: 'type' },
  { title: t('cuentas.opend'), value: 'created_at' },
  { title: t('cuentas.amount'), value: 'initial_balance' },
  { title: t('cuentas.accion'), value: 'actions', sortable: false }
])


async function cargarBancos() {
  try {
    bancos.value = await getBancos()
  } catch (error) {
    console.error('Error al cargar bancos:', error)
  }
}

function onFechaSeleccionada(fecha) {
  const d = new Date(fecha)
  const dia = d.getDate().toString().padStart(2, '0')
  const mes = (d.getMonth() + 1).toString().padStart(2, '0')
  const anio = d.getFullYear()

  form.fechaApertura = `${anio}-${mes}-${dia}` // o en otro formato que necesites
  menuFecha.value = false
}

async function cargarTiposCuenta() {
  try {
    tiposCuenta.value = await getTiposCuenta()
    console.log("llega esto")
    console.log(tiposCuenta.value)
  } catch (error) {
    console.error('Error al cargar tipos de cuenta:', error)
  }
}
const tiposFiltrados = computed(() => {
  const bancoSeleccionado = form.banco?.toUpperCase() || ''

  if (bancoSeleccionado === 'EFECTIVO') {
    return tiposCuenta.value.filter(tipo => tipo.name.includes('EFECTIVO'))
  } else {
    return tiposCuenta.value.filter(tipo => !tipo.name.includes('EFECTIVO'))
  }
})
watch(() => form.banco, () => {
  const tipoActual = form.tipoCuenta
  const valido = tiposFiltrados.value.some(tipo => tipo.name === tipoActual)
  if (!valido) {
    form.tipoCuenta = ''
  }
})
async function guardarCuenta() {
  const datosTransformados = {
    name: form.nombreCuenta,
    bank: form.banco,
    type: form.tipoCuenta,
    created_at: form.fechaApertura,
    initial_balance: form.saldoInicial,
    main_account: form.cuentaPrincipal,
    notifications: form.recibirNotificaciones,
    user_id: 1
  }

console.log('Datos enviados:', datosTransformados)
  try {
    if (isEditMode.value) {
      await updateAccount(selectedId.value, datosTransformados)
    } else {
      await createAccount(datosTransformados)
    }
    await cargarCuentas()
    resetForm()
  } catch (error) {
    console.error('Error al guardar cuenta:', error)
  }
}

async function editarCuenta(index) {
  try {
    const cuenta = cuentas.value[index]
    form.nombreCuenta = cuenta.name
    form.banco = cuenta.bank
    form.fechaApertura = cuenta.created_at ? cuenta.created_at.split(' ')[0] : ''
    form.saldoInicial = cuenta.initial_balance
    form.cuentaPrincipal = cuenta.main_account || false
    form.recibirNotificaciones = cuenta.notifications || false

    // Esperar un tick para que tiposFiltrados se actualice con el nuevo banco
    await nextTick()
    form.tipoCuenta = cuenta.type

    selectedId.value = cuenta.id
    isEditMode.value = true
  } catch (error) {
    console.error('Error al cargar cuenta para edición:', error)
  }
}

async function eliminarCuenta(index) {
  const cuenta = cuentas.value[index]
  try {
    await deleteAccount(cuenta.id)
    await cargarCuentas()
  } catch (error) {
    console.error('Error al eliminar cuenta:', error)
  }
}

function cancelar() {
  resetForm()
  router.push('/home')
}

function resetForm() {
  form.nombreCuenta = ''
  form.banco = ''
  form.tipoCuenta = ''
  form.fechaApertura = ''
  form.saldoInicial = 0
  form.cuentaPrincipal = false
  form.recibirNotificaciones = false
  isEditMode.value = false
  selectedId.value = null
}
</script>



<style scoped>

.acciones-cuenta {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.custom-height {
  height: 40px; /* o el valor que uses en los inputs normales */
  font-size: 12px;
  width: 200px;
  margin-left: 20px;
}

.img-nombre{
  display: block;
  width: 40px;

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
  margin-bottom: 10px;
  margin-top: 10px;
}

.btn-aceptar {
  background-color: #196c2c; /* verde */
  color: white;
}

.btn-cancelar {
  background-color: #dc3545; /* rojo */
  color: white;
}
.checkbox-label {
  font-size: 12px;
  margin-right: 8px;
}

.header-inline {
    display: flex;
    align-items: center;
    gap: 15px;
}

.lista-cuentas ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-cuenta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 0;
  border-bottom: 1px solid #ccc;
}

.texto-cuenta {
  flex: 1;
  font-size: 1vw;
  padding-right: 1vw;
  word-break: break-word;
}

.font-tabla {
    font-size: 12px; /* Puedes ajustar a 12px, 16px, etc. */
}

.font-tabla .v-data-table__td {
  padding: 2px 4px; /* Ajusta vertical y horizontalmente */
}

/* Disminuir alto del header de la tabla */
.v-data-table thead th {
    height: 26px;
    padding-top: 0px;
    padding-bottom: 2px;
}

/* Disminuir el alto de las filas (tr) */
.v-data-table tbody tr {
    height: 20px; /* o el alto que quieras */
}

.botones-cuenta {
  display: flex;
  gap: 0.5vw;
}

.lista-cuentas{
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
.img-nombre-c{
  position: absolute;
  top: 18.2% ;
  left: 14%;
  width: 6%;
  height: 6%;
  z-index: 1000;
  transform: translateY(-50%);
}
.img-banco{
  position: absolute;
  top: 26.2% ;
  left: 14%;
  width: 6%;
  height: 6%;
  z-index: 1000;
  transform: translateY(-50%);
}
.img-tipo{
  position: absolute;
  top: 34.2% ;
  left: 14%;
  width: 6%;
  height: 6%;
  z-index: 1000;
  transform: translateY(-50%);
}
.img-cuentaP{
  position: absolute;
  top: 46.4% ;
  left: 13%;
  width: 6%;
  height: 6%;
  z-index: 1000;
}
.img-notificaciones{
  top: 29.4% ;
  left: 53%;
  width: 8%;
  height: 8%;
  z-index: 1000;
  transform: translateY(-50%);
}
.img-saldo{
  position: absolute;
  top: 39.2% ;
  left: 54%;
  width: 6%;
  height: 6%;
  z-index: 1000;
}
.logo-cuentas {
  position: absolute;
  top: 25%;
  margin-left: -40%;
  width: 17.5%;
  height: 35%;
}
.botones {
  position: absolute;
  top: 60%;
  left: 56%;
  display: flex;
  gap: 1vw;
  min-width: 0.5vw;
}
.checks{
  margin-top:5px;

}

.save,
.cancelar {

  padding: 0.4em 1em;
  height: 2.5rem;
  font-size: 10px;
  width: 85px;

}

/*.save{
    width: 7vw !important;
    height: 5vh !important;
    font-size: 1vw;
}

.cancelar{
    width: 7vw !important;
    height: 5vh !important;
    font-size: 1vw;
}*/

.entrada-nombre {
  position: absolute;
  top: 15%;
  left: 13%;
  width: 75%;
}

.entrada-nombre input {
  width: 100%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  padding-left: 8vw;
  height: 5vh;
}
.entrada-banco{
  position: absolute;
  top: 23%;
  left: 13%;
  width: 75%;
}
.entrada-banco select{
  width: 100%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  padding-left: 7.5vw;
  height: 5vh;
}
.entrada-tipo-cuenta{
  position: absolute;
  top: 31%;
  left: 13%;
  width: 75%;
}
.entrada-tipo-cuenta select{
  width: 100%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  padding-left: 6.5vw;
  height: 5vh;
}
.entrada-fecha-apertura input{
  position: absolute;
  top: 39%;
  left: 13%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  width: 35%;
  padding-left: 3vw;
  height: 5vh;
}

.entrada-saldo input{
  position: absolute;
  top: 39%;
  left: 53%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  width: 35%;
  padding-left: 3vw;
  height: 5vh;
}
.entrada-cuenta-principal input{
  position: absolute;
  top: 48%;
  left: 43%;
  border-radius: 0.5vw;
}
.entrada-notificaciones input{
  margin-top: 5px;
  left: 83%;
  border-radius: 0.5vw;
}
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


.crear {
  position: absolute;
  top: 4%;
  left: 30%;
  font-family: "Popins", arial, sans-serif;
}

.mi-barra,
.mi-barra2 {
    height: 2px;
    background-color: #010000;
    border: none;
    margin: 10px auto;
    width: 100%; /* o 100%, o un valor fijo como 300px */
    display: block
}

 /* .mi-barra2 {
 position: absolute;
  border: none;     quita borde default
  border-bottom: 2px solid #000;
  width: 90%;
  margin: 10px 0;
  top: 55%;
  left: 5%;
}*/

.cuenta-principal {
  position: absolute;
  top: 47.5%;
  left: 20%;
  font-size: 1vw;
  font-weight: bold;
}
.notificaciones {
  position: absolute;
  top: 47.5%;
  left: 60%;
  font-size: 1vw;
  font-weight: bold;
}

/* Responsive media queries (solo ajustan tamaños y anchos para móvil y tablet, sin tocar posiciones absolutas) */

@media (max-width: 1024px) {

  .entrada-nombre input{
    top: 15.3%;
    left: 13%;
    width: 75%;
    padding-left: 3vw;
    font-size: 1vw;
    height: 4.5vh;
  }

  .entrada-banco select{
    top: 23.3%;
    left: 13%;
    width: 75%;
    padding-left: 3vw;
    font-size: 1vw;
    height: 4.5vh;
  }

  .entrada-tipo-cuenta select{
    top: 31.3%;
    left: 13%;
    width: 75%;
    padding-left: 3vw;
    font-size: 1vw;
    height: 4.5vh;
  }

  .entrada-fecha-apertura input{
    top: 39%;
    left: 13%;
    width: 35%;
    padding-left: 1vw;
    font-size: 1vw;
    height: 4.5vh;
  }

  .entrada-saldo input {
    top: 39%;
    left: 53%;
    width: 35%;
    font-size: 1vw;
    padding-left: 3vw;
    height: 4.5vh;
  }
  .entrada-cuenta-principal input{
    top: 49.8%;
    left: 44%;
  }
  .entrada-notificaciones input{
    top: 49.8%;
    left: 83%;
  }
.botones {
  position: absolute;
  top: 60%;
  left: 60%;
  display: flex;
  gap: 1vw;
}
 .save{
  width: 6vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
.cancelar{
 width: 6vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
  .crear {
  position: absolute;
  top: 4%;
  left: 20%;
  font-family: "Popins", arial, sans-serif;
  font-size: 2vw;
}
.mi-barra {
  position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 8%;
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

.cuenta-principal {
  position: absolute;
  top: 49%;
  left: 14%;
  font-size: 1.3vw;
}
.notificaciones{
  position: absolute;
  top: 49%;
  left: 53%;
  font-size: 1.3vw;
}
}

@media (max-width: 480px) {
  .entrada-nombre input{
  font-size: 1.5vw;
    width: 75% !important;}
  .entrada-banco select{
  font-size: 1.5vw;
    width: 75% !important;}
  .entrada-tipo-cuenta select{
  font-size: 1.5vw;
    width: 75% !important;}
  .entrada-fecha-apertura input{
  font-size: 1.5vw;
    width: 35% !important;}
  .entrada-saldo input {
    font-size: 1.5vw;
    width: 35% !important;
  }
  .entrada-cuenta-principal input{
        position: absolute;
        top: 47%;
        left: 43%;
        width: 5%;
  }
  .entrada-notificaciones input{
        position: absolute;
        top: 47%;
        left: 80%;
        width: 5%;
  }

.botones {
  top: 60%;
  left: -10%;
  gap: 1vw;
}
 .save{
  width: 10vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.cancelar{
  width: 10vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.fondo{
  position: fixed;
}
}
</style>
