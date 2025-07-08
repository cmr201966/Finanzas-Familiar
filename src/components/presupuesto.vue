<template>
  <div class="login-page">
        <div class="login-box">
            <div class="form-container">
                <div class="form-gradient-box">
                    <!-- Encabezado con logo y texto -->
                    <div class="header-inline">
                        <img src="../assets/img/tarjetas/presupuesto.png" class="user-icon" alt="Icono opción" />
                        <h1 class="name-opcion">{{ $t("presup.app_option") }}</h1>
                    </div>

                    <hr class="divider" />

                    <!-- Formulario directamente sobre fondo de gradiente -->
                    <div class="presupuesto-container"></div>
                      <v-form @submit.prevent="submitForm">

                        <!--Input para seleccionar la categoria  :placeholder="$t('presup.category')" :label="$t('presup.category')"-->

                        <v-row>
                            <v-col cols="12" md="12">
                              <v-autocomplete
                                v-model="form.categoria_id"
                                :items="categorias"
                                item-title="name"
                                item-value="id"
                                :label="form.categoria_id ? '' : $t('presup.category')"
                                class="mb-3 custom-height"
                                :loading="loading"
                                density="compact"
                                dense
                                outlined
                                prepend-inner-icon="mdi-tag-multiple"
                              />
                            </v-col>
                          </v-row>

                        <!-- Slot para personalizar cómo se muestra la categoría seleccionada-->
                        <template #selection="{ item, index }">
                            <span v-if="item && typeof item === 'object'">{{ item.name }}</span>
                        </template>

                        <!-- Importe y Fecha (alineados horizontalmente)-->

                            <v-row>
                                  <!-- Importe -->
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    v-model.number="form.monto"
                                    :label="$t('presup.amount')"
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
                                <!--Input para seleccionar el mes -->

                                    <v-col cols="12" md="6">
                                      <v-menu
                                        v-model="menuMes"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y

                                      >
                                      <template #activator="{ props }">
                                        <v-text-field
                                          v-model="form.mes"
                                          :label="$t('presup.month')"
                                          density="compact"
                                          readonly
                                          v-bind="props"
                                          class="custom-heigt white-rounded "
                                          prepend-inner-icon="mdi-calendar-month"
                                        />
                                      </template>

                                      <v-date-picker
                                          type="month"
                                          @update:model-value="selectMes"
                                          :min="fechaMinima"
                                          color="primary"
                                      />
                                    </v-menu>
                                  </v-col>
                            </v-row>

                        <hr class="divider1" />

                        <!-- Botones de  Aceptar y cancelar -->

                        <div class="form-buttons">

                            <!-- Botón Aceptar (verde) -->

                            <v-btn
                                @click="submitForm"
                                :loading="enviando"
                                :disabled="!formValido"
                                class="btn btn-aceptar">{{ $t("presup.submit") }}</v-btn>

                            <!-- Botón Cancelar (rojo) -->

                            <v-btn
                                @click="cancelarFormulario"
                                :disabled="enviando"
                                class="btn btn-cancelar"> {{ $t("presup.cancel") }}</v-btn>
                        </div>
                      </v-form>

                      <!-- Tabla de presupuestos por mes -->
                      <v-card
  class="mx-auto pa-2"
  elevation="8"
  style="max-width: 600px; border-radius: 16px; background-color: #f9f9f9;"
>
  <div style="max-height: 400px; overflow-y: auto;">
    <v-data-table
      :headers="headers"
      :items="presupuestos"
      item-value="id"
      class="tabla-transferencias"
      :items-per-page="-1"
      hide-default-footer
      dense
    >
      <template #item.acciones="{ item }">
        <div class="d-flex align-center">
          <v-btn icon class="bg-transparent" @click="editarPresupuestoVista(item)">
            <v-icon size="18">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon class="bg-transparent" @click="eliminarPresupuestoVista(item.id)">
            <v-icon size="18" color="red">mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</v-card>
                      <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
                      <v-card>
                        <v-card-title class="text-h6">¿Estás seguro?</v-card-title>
                            <v-card-text>¿Deseas eliminar este presupuesto? Esta acción no se puede deshacer.</v-card-text>
                              <v-card-actions>
                                <v-btn text @click="mostrarDialogoEliminar = false">Cancelar</v-btn>
                                  <v-btn color="red" text @click="confirmarEliminacion">Eliminar</v-btn>
                              </v-card-actions>
                      </v-card>
                      </v-dialog>
                    </div>
                  </div>
    </div>
</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getPresupuestosByUserName } from "@/services/presupuestos";
import { getCategoriasByType } from "@/services/categorias";
import { crearPresupuesto } from '@/services/presupuestos';
import { getUserByUserName } from '@/services/register';
import { editarPresupuesto } from '@/services/presupuestos';
import { eliminarPresupuesto } from '@/services/presupuestos' ;



const username = localStorage.getItem('username') //usuario autentificado
const router = useRouter();
const { locale, t } = useI18n();                // PARA TODO LO REFERENTE AL IDIOMA


//PARA TODO LO REFERENTE AL MES
const menuMes = ref(false);
const pickerMes = ref("");
const hoy = new Date();
const año = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const fechaMinima = `${año}-${mes}`;


const goToPreviousMonth = () => {
    const current = new Date(pickerMes.value);
    current.setMonth(current.getMonth() - 1);
    pickerMes.value = current.toISOString().slice(0, 10);
};

const goToNextMonth = () => {
    const current = new Date(pickerMes.value);
    current.setMonth(current.getMonth() + 1);
    pickerMes.value = current.toISOString().slice(0, 10);
};

// Cuando el usuario elige el mes

const selectMes = (val) => {
  const date = new Date(val);

  if (!isNaN(date)) {
    // Fecha mínima: primer día del mes actual
    const hoy = new Date();
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    if (date >= inicioMesActual) {
      form.value.mes_guardado = date.toISOString().slice(0, 7); // "YYYY-MM"
      form.value.mes = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      });
      menuMes.value = false;
    } else {
      // Opcional: mensaje de error o simplemente ignorar
      alert("No puede seleccionar meses anteriores al actual.");
    }
  }
};



const form = ref({
    monto: "",
    categoria: null,
    mes: "", // 🟢 Mostrado en el input: "mayo de 2025"
    mes_guardado: "", // 🟡 Usado para enviar al backend: "2025-05"
});


//PARA TODO LO REFERENTE A LA CATEGORIA
// Cargando las categorias

const categorias = ref([]);
const editarsn = ref(false);
const search = ref("");
const loading = ref(false);


//ES PARA CARGAR LA VISTA

onMounted(async () => {

    categorias.value = await getCategoriasByType('gasto', username);
    presupuestos.value= await getPresupuestosByUserName(username);

});

//PARA EL BOTON ACEPTAR
// Estado para controlar si se está enviando el formulario (usado para el botón loading)

const enviando = ref(false)

// Aquí defines tu modelo de formulario (ajusta los campos según tu necesidad real)
const nuevoPresupuesto = ref({
    categoria_id: '',
    mes: '',
    monto_limite:'',
    usuario_id: ''
  // Agrega otros campos si los tienes
})

// Este array contendrá todos los presupuestos mostrados en la tabla
const presupuestos = ref([])

 //PARA LOS COMPONENTES DEL FORMULARIO
 //limpiar formulario
function limpiarFormulario() {
  form.value = {
    monto: "",
    categoria_id: null,
    mes: "",
    mes_guardado: "",
  };
}

const formValido = computed(() => {
  return (
    form.value.monto !== '' && form.value.monto !== null && Number(form.value.monto) >= 0 &&
    form.value.categoria_id !== null && form.value.categoria_id !== '' &&
    form.value.mes !== '' && form.value.mes !== null
  );
});

function soloNumerosDecimal(e) {
    const key = e.key;
    const valor = e.target.value;

    // Permitir números del 0 al 9
    if (/[0-9]/.test(key)) return;

    // Permitir solo un punto decimal
    if (key === '.' && !valor.includes('.')) return;

    // Bloquear todo lo demás
    e.preventDefault();
}

watch(() => form.value.monto, (val) => {
    if (val < 0 || isNaN(val)) {
      form.value.monto = 0;
    }
});

//Editar Presupuesto
function editarPresupuestoVista(item) {

  editarsn.value=true;
  form.value = {
    ...item,
    categoria_id: item.categoria_id,
    categoria: item.categoria,
    monto: item.importe,

    mes: "2025-06",
//    mes: item.mes,
    mes_guardado: item.mes_guardado || "",


  };
}

//Eliminar Presupuesto

const mostrarDialogoEliminar = ref(false)
const idParaEliminar = ref(null);

function eliminarPresupuestoVista(id) {

  idParaEliminar.value = id;
  mostrarDialogoEliminar.value = true;
  limpiarFormulario
}

async function confirmarEliminacion() {

  if (!idParaEliminar.value) return;

  try {
    enviando.value = true;

    // Aquí se hace la petición para eliminar el registro desde la base de datos

    await eliminarPresupuesto(idParaEliminar.value);

  // Recargando la tabla de presupuestos
    presupuestos.value = await getPresupuestosByUserName(username);
    limpiarFormulario();

   // Cerrar el diálogo

    mostrarDialogoEliminar.value = false;
    idParaEliminar.value = null;

  } catch (error) {
    console.error("Error eliminando presupuesto:", error);
    // Aquí mostrar mensaje de error si quieres
  } finally {
    enviando.value = false;
  }
}

const submitForm = async () => {
  enviando.value = true;

  try {
    const user = await getUserByUserName(username);

    const fecha = form.value.mes_guardado || form.value.mes; // usa mes_guardado si existe, sino mes
    const partes = fecha.split("-");

    // Construye el objeto con los datos comunes
    form.value.categoria=0;
      const nuevo = {
      id: form.value.id,
      categoria_id: form.value.categoria_id,
      mes: Number(partes[1]),
      monto_limite: form.value.monto,
      usuario_id: user.data.id,
    };

    let response;
    if (editarsn.value==true) {

      // Si existe id, significa que editamos un registro
      response = await editarPresupuesto(nuevo);

    } else {

      // Sino, creamos uno nuevo
      response = await crearPresupuesto(nuevo);
    }

    presupuestos.value = await getPresupuestosByUserName(username);
    editarsn.value=false
    limpiarFormulario();

  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  } finally {
    enviando.value = false;
  }
};



//PARA LOS BOTONES DE LA VISTA

// Para el boton Cancelar
const cancelarFormulario = () => {
  form.value = {
    monto: "",
    categoria_id: null,
    mes: "",
    mes_guardado: "",
  };
  menuMes.value = false;
  search.value = "";
  router.push("/home"); // ← Redirige al home
};

//TRABAJANDO LA TABLA QUE ESTA DEBAJO

// Esto es para la tabla de abajo
import { computed } from 'vue';

const headers = computed(() => [
 // { title: 'ID', value: 'id' },
  { title:  t('presup.category'), value: 'categoria' },
  { title: t('presup.month'), value: 'mes' },
  { title: t('presup.amount'), value: 'importe' },
  { title: t('presup.actions'), value: 'acciones', sortable: false },
])

const presupuesto = ref(null);
const loadingPresupuesto = ref(false);



const cargarPresupuestos = async () => {
  loadingPresupuesto.value = true
  try {
    const response = await presupuesto({
        username: username.value,
        })

    presupuestos.value = response.data.map(p => ({
      id: p.id,
      categoria: p.categoria.nombre, // ajusta esto según tu backend
      mes: formatearMes(p.fecha_inicio), // o p.mes si ya lo tienes
      importe: p.total, // o el campo que corresponde
    }))

    // Puedes calcular el total si quieres
    presupuesto.value = {
      total: presupuestos.value.reduce((sum, p) => sum + p.importe, 0)
    }
  } catch (e) {
    console.error('Error cargando presupuestos:', e)
  } finally {
    loadingPresupuesto.value = false
  }
}
</script>



<style scoped>

/* Estilo para el menú desplegable del v-autocomplete */
.v-overlay__content.v-autocomplete__content {
  background-color: white !important; /* fondo claro */
  box-shadow: none !important;        /* sin sombra */
  border: 1px solid #ccc;             /* borde opcional */
  border-radius: 4px;                 /* bordes redondeados opcionales */
}

.mb-3 {
  margin-bottom: 16px;
}
.custom-height {
  height: 40px; /* o el valor que uses en los inputs normales */
  font-size: 12px;
}

/* Contenedor general de la página, centrado vertical y horizontal */

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Altura de toda la pantalla */
  background-color: transparent; /* O cualquier color de fondo */
}

/* Caja blanca principal que contiene logo y formulario */
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Parte derecha: formulario y fondo */
.form-container {
    max-width: 400px; /* Limita el ancho máximo del formulario */
    margin: auto;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.header-inline {
  display: flex;
  align-items: center;
  gap: 5px;
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

.user-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.divider {
  height: 2px;
    background-color: #010000;
    border: none;
    margin: 1rem auto;
    width: 100%; /* o 100%, o un valor fijo como 300px */
    display: block;
}

.divider1 {
    height: 2px;
    background-color: #010000;
    border: none;
    margin: 1rem auto;
    width: 100%; /* o 100%, o un valor fijo como 300px */
    display: block;
}

.presupuesto-container {
  max-width: 600px;
  margin: auto;

}

/*Titulo de la opcion*/

.name-opcion {
  font-family: "Poppins", sans-serif;
  font-size: 25px;
  font-weight: 700;
  color: #070606;
  text-align: center;
  left: 8px;
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
  border-radius: 8px;                         /* Bordes redondeados */
  box-shadow: none !important;                          /* Sin sombra */
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


/* Botón claro sobre fondo oscuro */
.submit-btn {
  background-color: #fff !important;
  color: #1976d2 !important;
  font-weight: bold;
  font-size: 16px;
  text-transform: none;
}

.form-field-horizontal {
  position: relative;
  margin-bottom: 16px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.input-icon-inside {
  position: absolute;
  left: 10px;
  width: 30px; /* tamaño pequeño del icono */
  height: 30px;
  object-fit: contain;
  pointer-events: none; /* para que no interfiera con el click en el input */
}

.custom-input {
  padding-left: 40px; /* espacio para la imagen + margen */
  width: 100%; /* que ocupe el ancho disponible */
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 35px;
  font-size: 14px;
  background-color: white;
  color: black;
  outline: none;
  box-sizing: border-box;
}

.custom-input:focus {
  border-color: #2196f3;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
}

.white_text {
  margin-left: 14px;
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
  width: 65px;
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

/*para ajustar el font de la tabla*/
.font-tabla {
  font-size: 12px; /* Puedes ajustar a 12px, 16px, etc. */
}

/* Para cambiar el espaciado de las celdas de la tabla*/
.font-tabla .v-data-table__td {
  padding: 2px 4px; /* Ajusta vertical y horizontalmente */
}

.bg-transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}

::v-deep(.custom-white-input .v-field__append-inner) {
  background-color: white !important;
}

::v-deep(.custom-white-input .v-field__field) {
  background-color: white !important;
 /* color: black;  texto negro si lo prefieres */
}
</style>
