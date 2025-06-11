<template>
    <NavBar />
    <Footer />
    <div class="login-page">
        <div class="login-box">

            <!-- Parte derecha con fondo degradado -->
            <div class="form-container">
                <div class="form-gradient-box">

                        <div class="header-inline">
                            <img src="../assets/img/tarjetas/transf.png" class="transfer-icon" alt="Icono tranferencias" />
                            <h1 class="name-opcion">{{ $t("transferencias.app_option") }}</h1>
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <v-form @submit.prevent="submitForm" class="form-content">

                            <!--Input para seleccionar la cuenta de origen -->

                            <v-autocomplete
                                v-model="form.cuentaOrigen"
                                :items="cuentaOrigen"
                                item-title="name"
                                item-value="id"
                                :label="form.cuentaOrigen_id ? '' : $t('transferencias.source_account')"
                                :search-input.sync="search"
                                :loading="loading"
                                hide-no-data
                                hide-selected
                                required
                                hide-details
                                density="compact"
                                class="custom-white-input"
                                :clearable="false"
                                style="background-color: white"
                                prepend-inner-icon="mdi-format-list-bulleted"
                                border-radios="4px"
                            />

                            <!-- Slot para personalizar cómo se muestra la categoría seleccionada -->
                            <template #selection="{ item, index }">
                                <span v-if="item && typeof item === 'object'">{{ item.name }}</span>
                            </template>


                            <!--Input para seleccionar la cuenta destino -->

                            <v-autocomplete
                                v-model="form.cuentaDestino"
                                :items="cuentaDestino"
                                item-title="name"
                                item-value="id"
                                :label="form.cuentaDestino_id ? '' : $t('transferencias.destination_account')"
                                :search-input.sync="search"
                                :loading="loading"
                                hide-no-data
                                hide-selected
                                required
                                hide-details
                                density="compact"
                                class="custom-white-input"
                                :clearable="false"
                                style="background-color: white"
                                prepend-inner-icon="mdi-format-list-bulleted"
                                border-radios="4px"
                            />

                        <div class="importe-mes">
                            <!-- input importe -->
                            <div class="form-field-horizontal input-with-icon">
                                <img src="../assets/img/icono/dinero.png" class="input-icon-inside" />
                                <input type="number" :placeholder="$t('transferencias.amount')" v-model="form.importe" class="custom-input" />
                            </div>

                            <!--Input para seleccionar el mes -->
                            <v-menu
                                v-model="menuFecha"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="90px"
                                min-width="auto"
                                >

                                <!-- Activador: el input que abre el menú -->

                                <template #activator="{ props }">
                                <v-text-field
                                    v-model="form.fecha"
                                    v-bind="props"
                                    :label="form.fecha ? '' : $t('transferencias.date')"
                                    placeholder="form.fecha ? '' : 'Ej: 10/06/2025'"
                                    readonly
                                    required

                                    density="compact"
                                    class="custom-white-input input-mes-corto largo-reducida ancho-reducido"
                                    prepend-inner-icon="mdi-calendar-month"
                                />
                                </template>

                                <!-- Contenido del menú (picker de mes personalizado) -->

                                <v-date-picker
                                    v-model="pickerMes"
                                    @update:model-value="selectFecha"
                                    color="primary"
                                    show-adjacent-months
                                    hide-header

                                    >

                                    <!-- Header de navegación -->

                                    <template #header="{ togglePreviousMonth, toggleNextMonth }">
                                        <div class="d-flex justify-space-between pa-2">
                                        <v-btn icon @click="goToPreviousMonth">
                                                <v-icon>mdi-chevron-left</v-icon>
                                        </v-btn>
                                        <v-btn icon @click="goToNextMonth">
                                                <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                        </div>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </div>

                        <div>
                          <img src="../assets/img/icono/descripcion.png" class="input-icon-descripcion" />
                          <input  type="text"
                                  :placeholder="$t('transferencias.description')"
                                  v-model="form.descripcion"
                                  class="input-descripcion" />
                        </div>

                            <!-- Raya de división -->
                            <hr class="divider" />

                            <!-- Botones de  Aceptar y cancelar -->

                            <div class="form-buttons">

                                <!-- Botón Aceptar (verde) -->
                                <v-btn @click="submitForm" :disabled="enviando " :loading="enviando" class="btn btn-aceptar">{{ $t("transferencias.submit") }}</v-btn>

                                <!-- Botón Cancelar (rojo) -->
                                <v-btn @click="cancelarFormulario" :disabled="enviando" class="btn btn-cancelar"> {{ $t("transferencias.cancel") }}</v-btn>
                            </div>

                        </v-form>


                    <!-- Tabla de transferencias-->
                    <div style="max-height: 400px; overflow-y: auto;">
                        <v-data-table
                          :headers="headers"
                          :items="transferencias"
                          item-value="id"
                          class="elevation-1 font-tabla"
                          :items-per-page="-1"
                          hide-default-footer
                          style="min-width:300px;"
                          fixed-header
                          height="150"
                        >
                          <template #item.acciones="{ item }">
                            <div class="d-flex align-center">
                              <v-btn icon class="bg-transparent" @click="editarTransferencia(item)">
                                <v-icon size="18">mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn icon class="bg-transparent" @click="eliminarTransferencia(item.id)">
                                <v-icon size="18" color="red">mdi-delete</v-icon>
                              </v-btn>
                                </div>
                          </template>
                        </v-data-table>
                    </div>
                    <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
                        <v-card>
                          <v-card-title class="text-h6">{{ $t("transferencias.message-kill1") }}</v-card-title>
                            <v-card-text>{{ $t("transferencias.message-kill2") }}</v-card-text>
                              <v-card-actions>
                                <v-btn text @click="mostrarDialogoEliminar = false">{{ $t("transferencias.cancel") }}</v-btn>
                                <v-btn color="red" text @click="confirmarEliminacion">{{ $t("transferencias.delete") }}</v-btn>
                              </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUserByUserName } from '@/services/register';
import { getAccountById } from "@/services/accountService";
import { getAllAccounts } from "@/services/accountService"
import { guardarTransferencia } from '@/services/transferencias';
import { getTransferenciasById } from "@/services/transferencias";



//usuario autentificado
const username = localStorage.getItem('username')

const user_id = ref([]);


// PARA TODO LO REFERENTE AL IDIOMA
const { locale, t } = useI18n();

const router = useRouter();

//PARA TODO LO REFERENTE A LA CATEGORIA
// Cargando las categorias

const editando = ref(false);
const search = ref("");
const loading = ref(false);
const cuentaOrigen = ref([]);
const cuentaDestino = ref([]);
const transferencias = ref([]);
const menuFecha = ref(false);
const pickerMes = ref(null);
const user_id_tmp=ref('');

const form = ref({
  cuentaOrigen: '',
  cuentaDestino: '',
  importe: '',
  descripcion: '',
  fecha: '',
})

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
  { title: t('transferencias.date'), value: 'date' },
  { title: t('transferencias.source'), value: 'from_account_id' },
  { title: t('transferencias.destination'), value: 'to_account_id' },
  { title: t('transferencias.amount'), value: 'amount' },
  { title: t('transferencias.actions'), value: 'acciones', sortable: false },
]);

//PARA EL BOTON ACEPTAR
// Estado para controlar si se está enviando el formulario (usado para el botón loading)

const enviando = ref(false)

const editarTransferencia=(item)=>{

}

const eliminarTransferencia=(item)=>{

}
const submitForm = async () => {
  const origen = form.value.cuentaOrigen;
  const destino = form.value.cuentaDestino;
  const importe = form.value.importe;
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
      description: form.value.descripcion,
      user_id: user_id_tmp.value

    };

    // Guardar en la BD (ajusta según tu servicio real)
    await guardarTransferencia(nuevaTransferencia);

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
      cuentaOrigen: '',
      cuentaDestino: '',
      importe: '',
      descripcion: '',
      fecha: '',
    };
}

</script>


<style scoped>

/* Parte derecha: formulario y fondo */
.form-container {
  max-width: 600px; /* Limita el ancho máximo del formulario */
  margin: auto;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
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
  width: 90%;
  border: 1px solid black;
  margin: 10px 0;
  max-width: 350px;
}

.form-content {
  display: flex;
  flex-direction: column;
  width: 75%;
  gap: 8px;
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
  justify-content: center;
  gap: 10px; /* espacio entre botones */
  margin-left: 150px;
}

.btn {
  display: flex; /* ← clave */
  align-items: center; /* centra verticalmente */
  justify-content: center; /* centra horizontalmente */
  padding: 10px 30px;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 75px;
  height: 30px;
  font-style: "popins";
  margin-bottom: 10px;
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
  font-weight: 700;
  color: #070606;
  text-align: center;
  left: 8px;
}

.input-icon-inside {
  position: absolute;
  left: 10px;
  width: 30px; /* tamaño pequeño del icono */
  height: 30px;
  object-fit: contain;
  pointer-events: none; /* para que no interfiera con el click en el input */
}

.input-icon-descripcion{
  position: absolute;
  margin-left: 10px;
  width: 30px; /* tamaño pequeño del icono */
  height: 30px;

  pointer-events: none; /* para que no interfiera con el click en el input */
}
.custom-input {
  padding-left: 40px; /* espacio para la imagen + margen */
  width: 100%; /* que ocupe el ancho disponible */
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 32px;
  font-size: 14px;
  background-color: white;
  color: black;
  outline: none;
  box-sizing: border-box;
}

.form-field-horizontal {
  position: relative;
  margin-bottom: 16px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 16px;
}

.input-mes-corto {
  max-width: 100px; /* Ajusta según necesites, por ejemplo 140px o 120px */
  max-height: 50px;
}

.largo-reducida :deep(.v-field) {
  min-height: 25px !important;  /* altura reducida */
  height: 25px !important;
}

.ancho-reducido {
  height: 30px; /* reduce la altura del contenedor externo */
  font-size: 12px;
  max-width: 150px; /* opcional: para controlar también el ancho */
}
/* Apunta al input interno con :deep() */
.ancho-reducido :deep(.v-field__input) {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  min-height: 24px !important;
  font-size: 12px !important;
  line-height: 16px !important;
}

/* Opcional: ajusta también el icono si se desalineara */
.ancho-reducido :deep(.v-icon) {
  font-size: 12px !important;
}

.importe-mes{
    display: flex;
    gap: 6px;
}

.input-descripcion{
  padding-left: 40px; /* espacio para la imagen + margen */
  width: 100%; /* que ocupe el ancho disponible */
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 35px;
  font-size: 12px;
  background-color: white;
  color: black;
  outline: none;
  box-sizing: border-box;

}

font-tabla {
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

</style>