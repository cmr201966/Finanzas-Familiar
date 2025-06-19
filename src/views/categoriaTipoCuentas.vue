<template>
    <NavBar />
    <Footer />
            <div class="form-container">
                <div class="form-gradient-box">

                        <div class="header-inline">
                            <img src="../assets/img/tarjetas/TCB.png" class="user-icon" alt="Icono usuario" />
                            <h1 class="name-opcion">{{ $t("categoriaTipoCuenta.app_option") }}</h1>
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <!-- Input tipo de cuenta -->

                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="tipocuentaname"
                                :placeholder="$t('categoriaTipoCuenta.account_type')"
                                dense
                                outlined
                                @keydown.enter="submitForm"
                                color="primary"
                                density="compact"
                                prepend-inner-icon="mdi-wallet"
                            />
                        </v-col>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <!-- Botones de  Aceptar y cancelar -->

                        <div class="form-buttons">

                            <!-- Botón Aceptar (verde) -->
                            <v-btn  @click="submitForm"
                                    :disabled="enviando || !tipocuentaname.trim()"
                                    :loading="enviando"
                                    class="btn btn-aceptar">{{ $t("categoriaTipoCuenta.submit") }}
                            </v-btn>

                            <!-- Botón Cancelar (rojo) -->
                            <v-btn @click="cancelarFormulario" :disabled="enviando" class="btn btn-cancelar"> {{ $t("categoriaTipoCuenta.cancel") }}</v-btn>
                        </div>

                    <!-- Tabla de tipo de cuentas-->
                    <v-card
                            class="mx-auto pa-2"
                            elevation="8"
                            style="max-width: 450px; border-radius: 16px; background-color: #f9f9f9;"
                    >
                    <div style="max-height: 400px; ">
                        <v-data-table
                            :headers="headers"
                            :items="tiposCuenta"
                            item-value="id"
                            class="elevation-1 font-tabla"
                            :items-per-page="-1"
                            hide-default-footer
                            style="min-width:200px;"
                            fixed-header
                            height="200"
                        >
                        <template #item.acciones="{ item }">
                            <div class="d-flex align-center">
                                <v-btn icon class="bg-transparent" @click="editarTipoCuentaVista(item)">
                                    <v-icon size="18">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon class="bg-transparent" @click="eliminarTipoCuentaVista(item.id)">
                                    <v-icon size="18" color="red">mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </template>
                        </v-data-table>
                    </div>
                    </v-card>
                    <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
                        <v-card>
                            <v-card-title class="text-h6">{{ $t("categoriaTipoCuenta.message-kill1") }}</v-card-title>
                                <v-card-text>{{ $t("categoriaTipoCuenta.message-kill2") }}</v-card-text>
                                <v-card-actions>
                                    <v-btn text @click="mostrarDialogoEliminar = false">{{ $t("categoriaTipoCuenta.cancel") }}</v-btn>
                                    <v-btn color="red" text @click="confirmarEliminacion">{{ $t("categoriaTipoCuenta.delete") }}</v-btn>
                                </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { getTiposCuenta, eliminarTipoCuenta, crearTipoCuenta,editarTipoCuenta} from "@/services/tipodecuentaService";

// Router para navegación
const router = useRouter()

// i18n y bandera
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)

// Usuario autenticado (si lo necesitas)
const username = localStorage.getItem('username')

// Estado reactivo
const tiposCuenta = ref([])
const editando = ref(false)
const tcuentaSeleccionado = ref(null)  // mejor null, no string
const tipocuentaname = ref('')
const enviando = ref(false)

// Cargar datos al montar el componente
onMounted(async () => {
    tiposCuenta.value = await getTiposCuenta()
})

// Columnas para tabla
import { computed } from 'vue';

const headers = computed(() => [
    { title: t('categoriaTipoCuenta.descripction_tipocuenta'), value: 'name' },
    { title: t('categoriaTipoCuenta.actions'), value: 'acciones', sortable: false },
])

// Función para cargar formulario en modo edición
function editarTipoCuentaVista(item) {
    editando.value = true
    tipocuentaname.value = item.name
    tcuentaSeleccionado.value = item
}

// Función para guardar (crear o actualizar)
async function submitForm() {
    if (!tipocuentaname.value.trim()) {
        alert("El tipo de cuenta no puede estar vacío")
        return
    }

    try {
        enviando.value = true

        if (editando.value && tcuentaSeleccionado.value) {
        // Actualizar tipo de cuenta existente
        await editarTipoCuenta({ name: tipocuentaname.value }, tcuentaSeleccionado.value.id)
        } else {
      // Crear nuevo tipo de cuenta
        await crearTipoCuenta({ name: tipocuentaname.value })
    }

    // Refrescar lista
    tiposCuenta.value = await getTiposCuenta()
    tipocuentaname.value = ''
    editando.value = false
    tcuentaSeleccionado.value = null

    } catch (error) {
        console.error("Error guardando tipo de cuenta:", error)
        alert("Ocurrió un error al guardar el tipo de cuenta: " + (error.message || JSON.stringify(error)))
    } finally {
        enviando.value = false
    }
}

// Variables y funciones para eliminar
const mostrarDialogoEliminar = ref(false)
const tipoCuentaAEliminarId = ref(null)

function eliminarTipoCuentaVista(id) {
    tipoCuentaAEliminarId.value = id
    mostrarDialogoEliminar.value = true
}

async function confirmarEliminacion() {
    if (!tipoCuentaAEliminarId.value) return

    try {
        enviando.value = true

        await eliminarTipoCuenta(tipoCuentaAEliminarId.value)

        // Refrescar lista
        tiposCuenta.value = await getTiposCuenta()

        // Cerrar diálogo y limpiar id
        mostrarDialogoEliminar.value = false
        tipoCuentaAEliminarId.value = null

    } catch (error) {
        console.error("Error eliminando tipo de cuenta:", error)
    } finally {
        enviando.value = false
    }
}

// Función para cancelar formulario y navegación
function cancelarFormulario() {
    tipocuentaname.value = ''
    editando.value = false
    tcuentaSeleccionado.value = null
    router.push("/home")
    }
</script>


<style scoped>
/* Fondo general de la página */

.header-inline {
    display: flex;
    align-items: center;
    gap: 5px;
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


.bg-transparent {
    background-color: transparent !important;
    box-shadow: none !important;
}

/* Recuadro con gradiente */

.form-gradient-box {
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
    margin: auto;
}

/* Icono de usuario arriba */
.form-gradient-box img.user-icon {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    object-fit: contain;
}

.form-buttons {
    display: flex;
    justify-content: center;
    gap: 5px; /* espacio entre botones */
    margin-left: 100px;
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
    height: 20px;
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
/*Titulo de la opcion*/

.name-opcion {
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #070606;
    text-align: center;
    left: 8px;
}

/* Imagen de usuario más pequeña */
.user-icon {
    width:50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 10px;
}

/* Línea divisoria */
.divider {
    height: 2px;
    background-color: #010000;
    border: none;
    margin: 10px;
    width: 90%; /* o 100%, o un valor fijo como 300px */
    display: block;
}

.bandera{
    width: 30px;
    height: 30px;
}

/* Esto es para obligar al navegador a que ponga el color q tenia el input*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    background-color: white !important;
    -webkit-text-fill-color: black !important;
    -webkit-background-clip: text;
}


.form-gradient-box img{
    width: 20%;
    height: 20%;
    margin-top: 20px;
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

/* =====================================================
        Responsive Styles - Archivo CSS Reutilizable
        Puedes incluir este archivo en todas tus vistas.
    ===================================================== */

/* RESPONSIVE DESIGN */

/* Tablets (hasta 991.98px) */
@media (max-width: 991.98px) {
  .form-container {
    max-width: 100%;
    padding: 15px;
    flex-direction: column;
  }

  .form-buttons {
    justify-content: center !important;
    margin-left: 0 !important;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    width: 80px;
    height: 30px;
    font-size: 12px;
  }

  .form-gradient-box {
    width: 100%;
    padding: 20px 10px;
  }

  .name-opcion {
    font-size: 18px;
    text-align: center;
  }

  .form-gradient-box img.user-icon {
    width: 40px;
    height: 40px;
    margin-top: 15px;
  }
}

/* Móviles grandes (hasta 767.98px) */
@media (max-width: 767.98px) {
  .form-container {
    padding: 10px;
    flex-direction: column;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    margin-left: 0 !important;
    gap: 12px;
  }

  .btn {
    width: 100%;
    max-width: 180px;
    height: 35px;
    font-size: 13px;
  }

  .form-gradient-box {
    padding: 15px 10px;
  }

  .name-opcion {
    font-size: 16px;
  }

  .form-gradient-box img.user-icon {
    width: 50px;
    height: 50px;
  }

  .divider {
    margin: 8px auto;
    width: 90%;
  }

  .bandera {
    width: 25px;
    height: 25px;
  }
}

/* Móviles pequeños (hasta 575.98px) */
@media (max-width: 575.98px) {
  .form-container {
    padding: 10px;
    flex-direction: column;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    margin-left: 0 !important;
    gap: 10px;
  }

  .btn {
    width: 100%;
    max-width: 160px;
    height: 35px;
    font-size: 11px;
  }

  .form-gradient-box {
    padding: 12px 10px;
  }

  .form-gradient-box img.user-icon {
    width: 40px;
    height: 40px;
    margin-top: 10px;
  }

  .name-opcion {
    font-size: 14px;
  }

  .divider {
    margin: 6px auto;
    width: 100%;
  }

  .bandera {
    width: 24px;
    height: 24px;
  }

  input::placeholder {
    font-size: 12px;
  }
}

</style>
