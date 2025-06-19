<template>
    <NavBar />

                <div class="form-gradient-box">

                        <div class="header-inline">

                            <img  src="../assets/img/tarjetas/transf.png"
                                  class="transfer-icon"
                                  alt="Icono tranferencias"
                            />

                            <h1 class="name-opcion">{{ $t("transferencias.app_option") }}</h1>
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider " />

                        <div class="transferencias-container">

                          <!-- Formulario de transferencia -->
                          <form @submit.prevent="submitForm">
                            <!-- Cuenta Origen -->
                          <v-row>
                            <v-col cols="12" md="12">
                              <v-autocomplete
                                v-model="form.from_account_id"
                                :items="cuentasOrigenFiltradas"
                                item-title="name"
                                item-value="id"
                                :label="form.from_account_id ? '' : $t('transferencias.source_account')"
                                class="custom-height white-rounded"
                                dense
                                outlined
                                density="compact"
                                prepend-inner-icon="mdi-arrow-up-bold-circle"
                              />
                            </v-col>
                            <!-- Cuenta Destino -->
                            <v-col cols="12" md="12">
                              <v-autocomplete
                                v-model="form.to_account_id"
                                :items="cuentasDestinoFiltradas"
                                item-title="name"
                                item-value="id"
                                :label= "$t('transferencias.destination_account')"
                                class="custom-height"
                                dense
                                outlined
                                density="compact"
                                prepend-inner-icon="mdi-arrow-down-bold-circle"
                              />
                            </v-col>
                          </v-row>

                          <!-- Importe y Fecha (alineados horizontalmente)
                          <div class="d-flex flex-row" style="gap: 16px;">-->
                          <v-row>
                            <!-- Importe -->
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="form.amount"
                                :label="$t('transferencias.amount')"
                                type="number"
                                dense
                                outlined
                                density="compact"
                                class="custom-height"
                                prepend-inner-icon="mdi-currency-usd"
                              />
                              </v-col>
                              <!-- Fecha con Calendario -->
                              <v-col cols="12" md="6">
                                <v-menu
                                  v-model="menuFecha"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                >
                                  <template #activator="{ props }">
                                    <v-text-field
                                      v-model="form.fecha"
                                      :label="$t('transferencias.date')"
                                      readonly
                                      v-bind="props"
                                      density="compact"
                                      class="custom-heigt white-rounded"
                                      prepend-inner-icon="mdi-calendar-month"
                                    />
                                  </template>

                                    <v-date-picker
                                      @update:model-value="selectFecha"
                                      color="primary"
                                    />
                                </v-menu>
                              </v-col>

                              <!-- Descripción -->

                                <v-col cols="12" md="12">
                                  <v-text-field
                                    v-model="form.description"
                                    :placeholder="$t('transferencias.description')"
                                    dense
                                    outlined
                                    density="compact"
                                    prepend-inner-icon="mdi-note-outline"
                                  />
                                </v-col>
                            </v-row>

                            <hr class="divider" />

                            <!-- Botones de  Aceptar y cancelar -->

                            <div class="form-buttons">

                                <!-- Botón Aceptar (verde) -->
                                <v-btn  @click="submitForm"
                                        :disabled="enviando "
                                        :loading="enviando"
                                        class="btn btn-aceptar">{{ $t("transferencias.submit") }}
                                </v-btn>

                                <!-- Botón Cancelar (rojo) -->
                                <v-btn  @click="cancelarFormulario"
                                        :disabled="enviando"
                                        class="btn btn-cancelar"> {{ $t("transferencias.cancel") }}
                                </v-btn>
                            </div>
                          </form>


                          <!-- Tabla de transferencias -->
                          <v-card
                            class="mx-auto pa-2"
                            elevation="8"
                            style="max-width: 600px; border-radius: 16px; background-color: #f9f9f9;"
                          >
                            <v-data-table
                              :headers="headers"
                              :items="transferencias"
                              item-value="id"
                              class="tabla-transferencias"
                              :items-per-page="-1"
                              hide-default-footer
                              fixed-header
                              height="150"
                              dense
                            >
                              <!-- Acciones -->
                              <template #item.acciones="{ item }">
                                <div class="d-flex align-center justify-start" style="gap: 8px">
                                  <v-btn icon variant="text" color="primary" @click="editarTransferenciaVista(item)">
                                    <v-icon size="18">mdi-pencil</v-icon>
                                  </v-btn>
                                  <v-btn icon variant="text" color="error" @click="eliminarTransferenciaVista(item.id)">
                                    <v-icon size="18">mdi-delete</v-icon>
                                  </v-btn>
                                </div>
                              </template>
                            </v-data-table>
                          </v-card>

                          <!-- Diálogo de confirmación para eliminar -->
                          <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
                            <v-card>
                              <v-card-title class="text-h6">
                                {{ $t("transferencias.message-kill1") }}
                              </v-card-title>
                              <v-card-text>
                                {{ $t("transferencias.message-kill2") }}
                              </v-card-text>
                              <v-card-actions>
                                <v-btn text @click="mostrarDialogoEliminar = false">
                                  {{ $t("transferencias.cancel") }}
                                </v-btn>
                                <v-btn color="red" text @click="confirmarEliminacion">
                                  {{ $t("transferencias.delete") }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>

                </div>

  <Footer />
</template>


<script setup>

import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

import { ref, watch, onMounted } from "vue";
//import axios from "axios";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUserByUserName } from '@/services/register';
import { getAccountById } from "@/services/accountService";
import { getAllAccounts } from "@/services/accountService"
import { guardarTransferencia } from '@/services/transferencias';
import { getTransferenciasById } from "@/services/transferencias";
import { eliminarTransferencia } from "@/services/transferencias";
import { updateTransferencia } from "@/services/transferencias";




//usuario autentificado
const username = localStorage.getItem('username')

const user_id = ref([]);


// PARA TODO LO REFERENTE AL IDIOMA
const { locale, t } = useI18n();

const router = useRouter();

//PARA TODO LO REFERENTE A LA CATEGORIA
// Cargando las categorias

//const editarsn = ref(false);
const editando = ref(false)
const transferenciaSeleccionado = ref('')

const search = ref("");
const cuentaOrigen = ref([]);
const cuentaDestino = ref([]);
const menuFecha = ref(false);
const user_id_tmp=ref('');


// Este array contendrá todos los bancos mostrados en la tabla
//const bancos = ref([])
const transferencias = ref([]);


// Para que el Formulario sea reactivo
const form = ref({
  from_account_id: '',
  to_account_id: '',
  amount: '',
  date: '',
  description: '',
})

// Para filtrar que las cuentas de origen y destino no coincidan

const cuentasOrigenFiltradas = computed(() => {
  return cuentaOrigen.value.filter(
    (cuenta) => cuenta.id !== form.value.to_account_id
  );
});

const cuentasDestinoFiltradas = computed(() => {
  return cuentaDestino.value.filter(
    (cuenta) => cuenta.id !== form.value.from_account_id
  );
});

watch(() => form.value.from_account_id, (nuevoOrigen) => {
  if (nuevoOrigen && nuevoOrigen === form.value.to_account_id) {
    form.value.to_account_id = '';  // limpia destino si coincide con origen
  }
});

watch(() => form.value.to_account_id, (nuevoDestino) => {
  if (nuevoDestino && nuevoDestino === form.value.from_account_id) {
    form.value.from_account_id = '';  // limpia origen si coincide con destino
  }
});
//ES PARA CARGAR LA VISTA

onMounted(async () => {

  const user_id = await getUserByUserName(username)
  user_id_tmp.value=user_id.data.id

  cuentaOrigen.value = await getAccountById(user_id.data.id);
  cuentaDestino.value = await getAllAccounts();
  transferencias.value= await getTransferenciasById(user_id_tmp.value);
});

const selectFecha = (fecha) => {
  const d = new Date(fecha);
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  const anio = d.getFullYear();
  form.value.fecha = `${dia}/${mes}/${anio}`;  // formato completo
  menuFecha.value = false;
};

// Columnas para tabla
import { computed } from 'vue';

const headers = computed(() => [
  { title: t('transferencias.date'), value: 'date', width: '90px' },
  { title: t('transferencias.source'), value: 'from_account_id', width: '40px' },
  { title: t('transferencias.destination'), value: 'to_account_id' },
  { title: t('transferencias.amount'), value: 'amount' },
  { title: t('transferencias.actions'), value: 'acciones', sortable: false },
]);

//PARA EL BOTON ACEPTAR
// Estado para controlar si se está enviando el formulario (usado para el botón loading)

const enviando = ref(false)


function editarTransferenciaVista(item) {
  editando.value = true;

// Formatea la fecha si viene como ISO (yyyy-mm-dd) u objeto Date
const fecha = new Date(item.date);
const dia = fecha.getDate().toString().padStart(2, '0');
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
const anio = fecha.getFullYear();
const fechaFormateada = `${dia}/${mes}/${anio}`;


form.value = {
  from_account_id: item.from_account_id || '',
  to_account_id: item.to_account_id || '',
  amount: item.amount || '',
  fecha: fechaFormateada,  // usar el campo correcto
  description: item.description || '',  // si tu input usa form.descripcion

}
  transferenciaSeleccionado.value = item;
}

const mostrarDialogoEliminar = ref(false)
const transferenciaAEliminarId = ref(null);


function eliminarTransferenciaVista(id) {

    transferenciaAEliminarId .value = id;
    mostrarDialogoEliminar.value = true;
}


async function confirmarEliminacion() {

    if (!transferenciaAEliminarId.value) return;

    try {
    enviando.value = true;

    // Aquí se hace la petición para eliminar el registro desde la base de datos

    await eliminarTransferencia(transferenciaAEliminarId.value);

  // Recargando la tabla de transferencias
    transferencias.value= await getTransferenciasById(user_id_tmp.value);

   // Cerrar el diálogo

    mostrarDialogoEliminar.value = false;
    transferenciaAEliminarId.value = null;

    } catch (error) {
        console.error("Error eliminando transferencia:", error);
    // Aquí mostrar mensaje de error si quieres
    } finally {
    enviando.value = false;
    }
}

const submitForm = async () => {

  console.log("11111")
  console.log(form.value.fecha)

const origen = form.value.from_account_id;
const destino = form.value.to_account_id;
const importe = form.value.amount;
const fecha = form.value.fecha;



  if (!origen) {
    alert("La cuenta de origen no puede estar vacía");
    return;
  }
  if (!destino) {
    alert("La cuenta de destino no puede estar vacía");
    return;
  }
  if (!importe) {
    alert("El importe no puede estar vacío");
    return;
  }
  if (!fecha) {
    alert("La fecha no puede estar vacía");
    return;
  }

  try {
    enviando.value = true;

    const nuevaTransferencia = {
      from_account_id: origen,
      to_account_id: destino,
      amount: importe,
      date: fecha,
      description: form.value.description,
      user_id: user_id_tmp.value

    };
    console.log("2222")
    console.log(editando.value)

    if (editando.value && transferenciaSeleccionado.value?.id) {

      //  Editar transferencia
        console.log("33333")
        console.log (transferenciaSeleccionado.value.id)
        console.log("nueva transferencia", nuevaTransferencia)
      await updateTransferencia(transferenciaSeleccionado.value.id, nuevaTransferencia);

      console.log("Transferencia actualizada:", nuevaTransferencia);
    } else {

      // Crear nueva transferencia
      //
      // await guardarTransferencia(nuevaTransferencia);
      await guardarTransferencia(nuevaTransferencia);

      console.log("Transferencia creada:", nuevaTransferencia);
    }


    // Guardar en la BD (ajusta según tu servicio real)

    //await guardarTransferencia(nuevaTransferencia);
    //console.log("loque guarde:", nuevaTransferencia)

    // Agregar a la tabla
   //transferencias.value.push(nuevaTransferencia);
    transferencias.value = await  getTransferenciasById(user_id_tmp.value);

    limpiarFormulario();

    menuFecha.value = false;

    } catch (error) {
    console.error("Error guardando la transferencia:", error);
    alert("Ocurrió un error al guardar la transferencia.");

  } finally {

    enviando.value = false;
  }
};


//PARA LOS BOTONES DE LA VISTA

// Para el boton Cancelar
const cancelarFormulario = () => {
  form.value = {
    cuentaOrigen: '',
    cuentaDestino: '',
    importe: '',
    descripcion: '',
    fecha: ''
  };

  menuFecha.value = false;
  search.value = "";
  router.push("/home"); // ← Redirige al home
};

//PARA LOS COMPONENTES DEL FORMULARIO
 //limpiar formulario

function limpiarFormulario() {
  form.value = {
    from_account_id: '',
    to_account_id: '',
    amount: '',
    date: '',
    description: '',
  };
}

</script>


<style scoped>

.font-tabla {
  font-size: 0.85rem;
  font-family: 'Roboto', sans-serif;
}

.tabla-transferencias .v-data-table-header th {
  background-color: #e3f2fd; /* azul claro */
  color: #0d47a1;
  font-weight: 600;
  font-size: 0.9rem;
}

.tabla-transferencias .v-data-table__td {
  font-size: 0.85rem;
  color: #333;
  border-bottom: 1px solid #ccc;
}

.tabla-transferencias .v-data-table__wrapper {
  border-radius: 10px;
}

.tabla-transferencias .v-data-table {
  border-radius: 12px;
}

.v-data-table th,
.v-data-table td {
  padding: 0px 2px;     /* Reduce padding */
  white-space: nowrap;  /* Evita salto de línea dentro de la celda */
  max-width: 100px;     /* Ajusta ancho máximo */
  overflow: hidden;
  text-overflow: ellipsis; /* Agrega "..." si no cabe el texto */
}

.custom-height {
  height: 40px; /* o el valor que uses en los inputs normales */
  font-size: 12px;
}



.white-rounded .v-field {
  background-color: white;
  border-radius: 10px;
}

.v-input__control,
.v-input input,
.v-field__input {
  color: black !important;
}


.custom-height .v-field__input {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
}

.transferencias-container {
  max-width: 600px;
  margin: auto;
  padding: 10px;
}

.form-gradient-box {
  border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
    margin: auto;

}

.bg-transparent {
    background-color: transparent !important;
    box-shadow: none !important;
}

.header-inline {
  display: flex;
  align-items: center;
  gap: 5px;
}

.transfer-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.divider {
  border: 1px solid black;
  margin: 5px 0;
  width: 100%;
}

/* Fondo blanco y texto oscuro para inputs */
.custom-white-input :deep(.v-input),
.custom-white-input :deep(.v-input__control),
.custom-white-input :deep(.v-field__field),
.custom-white-input :deep(.v-field__input),
.custom-white-input :deep(input),
.white-input :deep(.v-input),
.white-input :deep(.v-input__control),
.white-input :deep(.v-field__field),
.white-input :deep(.v-field__input),
.white-input :deep(input) {
  background-color: #ffffff !important;      /* Fondo blanco */
  color: #000000 !important;                 /* Texto negro */
  border-radius: 10px;                         /* Bordes redondeados */
  box-shadow: none !important;                          /* Sin sombra */
  width: 100%;
}

/* Oculta el recuadro negro flotante del label */
.custom-white-input :deep(.v-field__label) {
  display: none !important;
}

/* Corrige el padding si quieres más limpieza */
.custom-white-input :deep(.v-input__control) {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
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

.name-opcion {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  color: #070606;
  text-align: center;
  left: 8px;
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
    height: 10px; /* o el alto que quieras */
}

/* RESPONSIVE DESIGN */

/* Tablets (max-width: 991.98px) */
@media (max-width: 991.98px) {
  .transferencias-container {
    max-width: 100%;
    padding: 15px 10px;
  }

  .form-buttons {
    justify-content: center !important;
    margin-left: 0 !important;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    width: 90px;
    height: 30px;
    font-size: 12px;
  }

  .name-opcion {
    font-size: 18px;
  }

  .form-gradient-box {
    width: 100%;
    padding: 20px 10px;
  }

  /* Tabla: permitir que ocupe todo el ancho */
  .tabla-transferencias .v-data-table,
  .tabla-transferencias .v-data-table__wrapper {
    width: 100% !important;
    overflow-x: auto;
  }

  .v-data-table th,
  .v-data-table td {
    max-width: 80px;
    white-space: nowrap;
  }
}

/* Móviles grandes (max-width: 767.98px) */
@media (max-width: 767.98px) {
  .transferencias-container {
    padding: 10px 5px;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    margin-left: 0 !important;
    gap: 12px;
  }

  .btn {
    width: 100%;
    max-width: 160px;
    height: 35px;
    font-size: 13px;
  }

  .name-opcion {
    font-size: 16px;
  }

  .form-gradient-box {
    padding: 15px 10px;
  }

  /* Tabla: reducir padding y fuente para mejor ajuste */
  .tabla-transferencias .v-data-table__td {
    font-size: 0.75rem;
    padding: 1px 3px;
  }

  .v-data-table thead th {
    font-size: 0.8rem;
    height: 24px;
    padding: 0 4px;
  }

  .v-data-table tbody tr {
    height: 18px;
  }
}

/* Móviles pequeños (max-width: 575.98px) */
@media (max-width: 575.98px) {
  .transferencias-container {
    padding: 8px 3px;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    margin-left: 0 !important;
    gap: 10px;
  }

  .btn {
    width: 100%;
    max-width: 140px;
    height: 35px;
    font-size: 11px;
  }

  .name-opcion {
    font-size: 14px;
  }

  .form-gradient-box {
    padding: 12px 8px;
  }

  /* Tabla: permitir scroll horizontal */
  .tabla-transferencias .v-data-table,
  .tabla-transferencias .v-data-table__wrapper {
    width: 100% !important;
    overflow-x: auto;
  }

  .v-data-table th,
  .v-data-table td {
    max-width: 70px;
    font-size: 0.7rem;
    white-space: nowrap;
  }

  .v-data-table thead th {
    height: 20px;
    padding: 0 3px;
  }

  .v-data-table tbody tr {
    height: 16px;
  }
}

</style>