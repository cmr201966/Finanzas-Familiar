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

                    <v-form @submit.prevent="submitForm" class="form-content">

                    <!--Input para seleccionar la categoria -->

                        <v-autocomplete
                            v-model="form.categoria_id"
                            :items="categorias"
                            item-title="name"
                            item-value="id"
                            :label="$t('presup.category')"
                            :search-input.sync="search"
                            :loading="loading"
                            clearable
                            hide-no-data
                            hide-selected
                            required
                            hide-details
                            density="compact"
                            class="custom-white-input"
                        />

                        <!--Input para seleccionar el mes -->

                        <v-menu
                            v-model="menuMes"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >

                            <!-- Activador: el input que abre el menú -->

                            <template #activator="{ props }">
                                <v-text-field
                                    v-model="form.mes"
                                    v-bind="props"
                                    :label="$t('presup.month')"
                                    placeholder="Ej: mayo de 2025"
                                    readonly
                                    required
                                    hide-details
                                    density="compact"
                                    class="custom-white-input"
                                    prepend-inner-icon="mdi-calendar-month"
                                    />
                            </template>

                            <!-- Contenido del menú (picker de mes personalizado) -->

                            <v-date-picker
                                -model="pickerMes"
                                @update:model-value="selectMes"
                                color="primary"
                                show-adjacent-months
                                hide-header
                                view-mode="month"
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

                        <!-- input importe -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/dinero.png" class="input-icon-inside" />
                            <input type="number" :placeholder="$t('presup.amount')" v-model="form.importe" class="custom-input" />
                        </div>

                        <hr class="divider1" />

                        <!-- Botones de  Aceptar y cancelar -->

                        <div class="form-buttons">

                            <!-- Botón Aceptar (verde) -->

                            <v-btn @click="submitForm" :loading="enviando" class="btn btn-aceptar">{{ $t("presup.submit") }}</v-btn>

                            <!-- Botón Cancelar (rojo) -->

                            <v-btn @click="cancelarFormulario" :disabled="enviando" class="btn btn-cancelar"> {{ $t("presup.cancel") }}</v-btn>
                        </div>
                    </v-form>

                    <!-- Tabla de presupuestos -->

                    <v-data-table
                        :headers="headers"
                        :items="presupuestos"
                        item-value="id"
                        class="elevation-1 font-tabla"
                        :items-per-page="-1"
                        hide-default-footer
                        hide-default-header
                    >

                    <!-- la opcion hide-deful... elimina la paginacion -->

                    <template #item.acciones="{ item }">

                        <div class="d-flex align-center">
                            <v-btn icon class="bg-transparent" @click="editarPresupuesto(item)">
                                <v-icon size="18">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon class="bg-transparent" @click="eliminarPresupuesto(item.id)">
                                <v-icon size="18" color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
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
import { enviarPresupuesto } from "@/services/presup";

//ususario autentificado
const username = localStorage.getItem('username')

// i18n y bandera
const { locale, t } = useI18n();

const router = useRouter();

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

const menuMes = ref(false);
const pickerMes = ref("");

// Cuando el usuario elige el mes

const selectMes = (val) => {
  const date = new Date(val);

  if (!isNaN(date)) {
    form.value.mes_guardado = date.toISOString().slice(0, 7); // "YYYY-MM"
    form.value.mes = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
  }

  menuMes.value = false;
};

// Cargando las categorias

const categorias = ref([]);
const search = ref("");
const loading = ref(false);
const enviando = ref(false);

const cargarCategorias = async (query = "") => {
  loading.value = true;
  try {
    // Si query es vacío, devuelve todas o las primeras categorías
    const res = await axios.get(
      `/api/categories?q=${encodeURIComponent(query)}`
    );
    categorias.value = res.data;
  } catch (e) {
    console.error("Error cargando categorías", e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cargarCategorias(""); // cargar todas al inicio
});

watch(search, (val) => {
  cargarCategorias(val);
});

const form = ref({
  monto: "",
  categoria_id: null,
  mes: "", // 🟢 Mostrado en el input: "mayo de 2025"
  mes_guardado: "", // 🟡 Usado para enviar al backend: "2025-05"
});

function limpiarFormulario() {
  form.value = {
    monto: "",
    categoria_id: null,
    mes: "",
    mes_guardado: "",
  };
}

function editarPresupuesto(item) {
  form.value = {
    ...item,
    categoria_id: item.categoria,
    monto: item.importe,
    mes: item.mes, // ya está formateado
    mes_guardado: item.mes_guardado || "",
  };

  if (item.mes_guardado) {
    pickerMes.value = item.mes_guardado + "-01"; // ej: "2025-05-01"
  }
}

function eliminarPresupuesto(id) {
  presupuestos.value = presupuestos.value.filter((p) => p.id !== id);
  if (form.value.id === id) {
    limpiarFormulario();
  }
}
const submitForm = async () => {
  if (!form.value.monto || !form.value.categoria_id || !form.value.mes) {
    alert("Por favor completa todos los campos.");
    return;
  }

  enviando.value = true;

  try {
    //await axios.post('/api/budgets', form.value)
    await enviarPresupuesto(form.value);
    alert("Presupuesto guardado correctamente");
    form.value = { monto: "", categoria_id: null, mes: "" };
  } catch (err) {
    console.error("Error al guardar", err);
    alert("Hubo un error al guardar el presupuesto");
  } finally {
    enviando.value = false;
  }
};
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

// esto es para la tabla de abajo
const headers = [
  { text: "ID", value: "id" },
  { text: "Categoría de Gastos", value: "categoria" },
  { text: "Mes", value: "mes" },
  { text: "Importe", value: "importe" },
  { text: "Acciones", value: "acciones", sortable: false },
];

const presupuestos = ref([
  { categoria: "Marketing", mes: "Enero", importe: 5000 },
  { categoria: "Desarrollo", mes: "Febrero", importe: 12000 },
]);
</script>

<style scoped>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  box-sizing: border-box;
  color: white;
  border: 2px solid blue;
  width: 400px;
  margin: auto;
}

.form-content {
  display: flex;
  flex-direction: column;
  width: 75%;
  gap: 8px;
}

.user-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.divider {
  width: 80%;
  border: 1px solid black;
  margin: 10px 0;
  max-width: 350px;
}

.divider1 {
  width: 105%;
  border: 1px solid black;
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
  background-color: #ffffff !important;
  color: #000000 !important;
  border-radius: 8px;
  border: 1px solid #ccc !important;
  box-shadow: none !important;
}

/* Inputs blancos para contrastar sobre el fondo de color */
.white-input :deep(input),
.white-input :deep(.v-input__control) {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px;
}

.custom-white-input :deep(.v-label),
.white-input :deep(.v-label) {
  color: #000000 !important;
  font-weight: 500;
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
  justify-content: center;
  gap: 5px; /* espacio entre botones */
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
</style>
