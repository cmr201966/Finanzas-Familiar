<template>
  <div>
    <div class="fondo">
      <p class="crear">{{ $t('cuentas.crear' )}}</p>
      <hr class="mi-barra" />

      <img class="img-nombre" src="../assets/img/icono/cuenta.png" alt="">
      <div class="entrada-nombre">
        <input class="in-nombre" type="text" v-model="form.nombreCuenta" :placeholder="$t('cuentas.placeholderNombreCuenta')" />
      </div>

      <img class="img-banco" src="../assets/img/icono/banco.png" alt="">
      <div class="entrada-banco">
        <select v-model="form.banco">
          <option disabled value="">{{ $t('cuentas.banco' )}}</option>
          <option value="metro">Metro</option>
          <option value="BANDEC">BANDEC</option>
          <option value="bfi">BFI</option>
          <option value="fincimex">FINCIMEX</option>
        </select>
      </div>

      <img class="img-tipo" src="../assets/img/icono/TCB.png" alt="">
      <div class="entrada-tipo-cuenta">
        <select v-model="form.tipoCuenta">
          <option disabled value="">{{ $t('cuentas.tipo-cuenta' )}}</option>
          <option value="efectivo">efectivo</option>
          <option value="mlc">MLC</option>
          <option value="usd">USD</option>
        </select>
      </div>

      <div class="entrada-fecha-apertura">
        <input type="date" v-model="form.fechaApertura" />
      </div>

      <img class="img-saldo" src="../assets/img/icono/dinero.png" alt="">
      <div class="entrada-saldo">
        <input type="number" v-model="form.saldoInicial" :placeholder="$t('cuentas.placeholdersaldo')" />
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

      <hr class="mi-barra2" />

      <div class="botones">
        <v-btn class="save" color="primary" prepend-icon="mdi-plus" @click="guardarCuenta">
          {{ editIndex !== null ? '' : '' }}
        </v-btn>
        <v-btn class="cancelar" color="error" prepend-icon="mdi-close" @click="cancelar">
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
    </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router' // importa el enrutador
import { ref, onMounted } from 'vue'
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
} from '@/services/accountService.js'

const cuentas = ref([])
const form = ref({
  nombreCuenta: '',
  banco: '',
  tipoCuenta: '',
  fechaApertura: '',
  saldoInicial: 0,
  cuentaPrincipal: false,
  recibirNotificaciones: false
})
const isEditMode = ref(false)
const selectedId = ref(null)

onMounted(async () => {
  console.log("1")
  await cargarCuentas()
  console.log("2")
})

async function cargarCuentas() {
  try {
    cuentas.value = await getAllAccounts()
  } catch (error) {
    console.error('Error al cargar cuentas:', error)
  }
}

async function guardarCuenta() {
  console.log("2")
  const datosTransformados = {
    name: form.value.nombreCuenta,
    bank: form.value.banco,
    type: form.value.tipoCuenta,
    created_at: form.value.fechaApertura,
    initial_balance: form.value.saldoInicial,
    main_account: form.value.cuentaPrincipal,
    notifications: form.value.recibirNotificaciones,
    user_id: 1
  }

  try {
    console.log(datosTransformados )
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

    form.value.nombreCuenta = cuenta.name
    form.value.banco = cuenta.bank
    form.value.tipoCuenta = cuenta.type
    form.value.fechaApertura = cuenta.created_at ? cuenta.created_at.split(' ')[0] : ''
    form.value.saldoInicial = cuenta.initial_balance
    form.value.cuentaPrincipal = cuenta.main_account || false
    form.value.recibirNotificaciones = cuenta.notifications || false

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
const router = useRouter()
function cancelar() {
  resetForm()
  router.push('/home') // redirecciona a /home
}

function resetForm() {
  form.value = {
    nombreCuenta: '',
    banco: '',
    tipoCuenta: '',
    fechaApertura: '',
    saldoInicial: 0,
    cuentaPrincipal: false,
    recibirNotificaciones: false
  }
  isEditMode.value = false
  selectedId.value = null
}
</script>



<style scoped>
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
.img-nombre{
  position: absolute;
  top: 14.4% ;
  left: 13%;
  width: 8%;
  height: 8%;
  z-index: 1000;
}
.img-banco{
  position: absolute;
  top: 22.4% ;
  left: 13%;
  width: 8%;
  height: 8%;
  z-index: 1000;
}
.img-tipo{
  position: absolute;
  top: 30.4% ;
  left: 13%;
  width: 8%;
  height: 8%;
  z-index: 1000;
}
.img-cuentaP{
  position: absolute;
  top: 46.4% ;
  left: 13%;
  width: 8%;
  height: 8%;
  z-index: 1000;
}
.img-notificaciones{
  position: absolute;
  top: 46.4% ;
  left: 53%;
  width: 8%;
  height: 8%;
  z-index: 1000;
}
.img-saldo{
  position: absolute;
  top: 38.4% ;
  left: 53%;
  width: 8%;
  height: 8%;
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
  left: 65%;
  display: flex;
  gap: 1vw;
  min-width: 0.5vw;
}
.save{
 width: 3vw !important;
  height: 5vh !important;
}
.editar{
 width: 3vw !important;
  height: 5vh !important;
}

.cancelar{
 width: 3vw !important;
  height: 5vh !important;
}

.entrada-nombre input{
  position: absolute;
  top: 15%;
  left: 13%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  width: 75%;
  padding-left: 8vw;
}
.entrada-banco select{
  position: absolute;
  top: 23%;
  left: 13%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  width: 75%;
  padding-left: 7.5vw;
}
.entrada-tipo-cuenta select{
  position: absolute;
  top: 31%;
  left: 13%;
  background-color: white;
  border-radius: 1vw;
  border: 2px solid #000000;
  width: 75%;
  padding-left: 6.5vw;
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
}
.entrada-cuenta-principal input{
  position: absolute;
  top: 48%;
  left: 43%;
  border-radius: 0.5vw;
}
.entrada-notificaciones input{
  position: absolute;
  top: 48%;
  left: 83%;
  border-radius: 0.5vw;
}
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
.crear {
  position: absolute;
  top: 4%;
  left: 30%;
  font-family: "Popins", arial, sans-serif;
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
  font-size: 1.5vw;
  padding-right: 1vw;
  word-break: break-word;
}

.botones-cuenta {
  display: flex;
  gap: 0.5vw;
}
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
  width: 5vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
.editar{
 width: 5vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
.cancelar{
 width: 5vw !important;
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

@media (max-width: 500px) {
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
  top: 76%;
  left: 40%;
  flex-direction: column;
  gap: 1vw;
}
 .save{
  width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.editar{
 width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.cancelar{
  width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.fondo{
  position: fixed;
}
}
</style>
