<template>
    <NavBar />
    <Footer />
      <!-- Parte derecha con fondo degradado -->
      <div class="form-gradient-box">
          <div class="header-inline">
              <img  src="../assets/img/tarjetas/banco.png"
                    class="user-icon"
                    alt="Icono usuario"
              />
              <h1 class="name-opcion">{{ $t("categoriaBanco.app_option") }}</h1>
          </div>

          <!-- Raya de división -->
          <hr class="divider1" />

          <div class="banco-container">
            <!-- Banco -->
          <v-row>
            <v-col cols="12" md="12" class="pa-0">
              <v-text-field
                v-model="banconame"
                :placeholder="$t('categoriaBanco.bank')"
                class="custom-height"
                dense
                outlined
                @keydown.enter="submitForm"
                density="compact"
                color="primary"
                prepend-inner-icon="mdi-bank"
                width="280"
              />
            </v-col>
          </v-row>
            <!-- Raya de división -->
            <hr class="divider" />

            <!-- Botones de  Aceptar y cancelar -->

            <div class="form-buttons">

              <!-- Botón Aceptar (verde) -->
              <v-btn  @click="submitForm"
                      :disabled="enviando || !banconame.trim()"
                      :loading="enviando"
                      class="btn btn-aceptar"
                    >{{ $t("categoriaBanco.submit") }}
              </v-btn>

              <!-- Botón Cancelar (rojo) -->
              <v-btn  @click="cancelarFormulario"
                      :disabled="enviando"
                      class="btn btn-cancelar"> {{ $t("categoriaBanco.cancel") }}
              </v-btn>
            </div>


            <!-- Tabla de bancos-->
            <v-card
              class="mx-auto pa-2"
              elevation="8"
              style="max-width: 450px;
              border-radius: 16px;
              background-color: #f9f9f9;"
              >
              <div style="max-height: 400px; overflow-y: auto;">
                <v-data-table
                  :headers="headers"
                  :items="bancos"
                  item-value="id"
                  class="tabla-bancos"
                  :items-per-page="-1"
                  hide-default-footer
                  style="min-width:200px;"
                  fixed-header
                  height="200"

                  >
                    <template #item.acciones="{ item }">
                        <div class="d-flex align-center">
                          <v-btn icon class="bg-transparent" @click="editarBancoVista(item)">
                              <v-icon size="16">mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn icon class="bg-transparent" @click="eliminarBancoVista(item.id)">
                              <v-icon size="16" color="red">mdi-delete</v-icon>
                          </v-btn>
                        </div>
                    </template>
                </v-data-table>
              </div>
            </v-card>
              <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
              <v-card>
                <v-card-title class="text-h6">{{ $t("categoriaBanco.message-kill1") }}</v-card-title>
                  <v-card-text>{{ $t("categoriaBanco.message-kill2") }}</v-card-text>
                      <v-card-actions>
                          <v-btn text @click="mostrarDialogoEliminar = false">{{ $t("categoriaBanco.cancel") }}</v-btn>
                          <v-btn color="red" text @click="confirmarEliminacion">{{ $t("categoriaBanco.delete") }}</v-btn>
                      </v-card-actions>
                  </v-card>
              </v-dialog>
            </div>
          </div>
</template>

<script setup>

import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

// Importamos funcionalidades reactivas y de router

import { ref, watch, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getBancos } from "@/services/BancoService";
import { eliminarBanco } from "@/services/BancoService";
import { crearBanco } from "@/services/BancoService";
import { editarBanco } from "@/services/BancoService";

// Inicializamos router para navegación

const router = useRouter()
const loading = ref(false)

// i18n y bandera
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)

//usuario autentificado
const username = localStorage.getItem('username')

// Este array contendrá todos los bancos mostrados en la tabla
const bancos = ref([])


onMounted(async () => {
    bancos.value= await getBancos();
    //console.log(bancos.value)
});

// Esto es para la tabla de abajo

const headers = computed(() => [
 // { title: 'ID', value: 'id' },
    { title: t('categoriaBanco.description_bank'), value: 'name' },
    { title: t('categoriaBanco.actions'), value: 'acciones', sortable: false },
])

const editando = ref(false)
const bancoSeleccionado = ref('')
const banconame = ref('');
const enviando = ref(false);

//Editar Banco
function editarBancoVista(item) {

    editando.value = true;
    banconame.value = item.name; // Mostramos en el input
    bancoSeleccionado.value = item; // Guardamos cuál banco se está editando (si lo necesitas luego)
}

// Boton Aceptar - Guardar en al Base de datos
async function submitForm() {
    if (!banconame.value.trim()) {
        alert("El nombre del banco no puede estar vacío");
        return;
    }

    try {
        enviando.value = true;

        if (editando.value && bancoSeleccionado.value) {

            // Actualizar banco existente
            await editarBanco( { name: banconame.value }, bancoSeleccionado.value.id);
        } else {

            // Crear nuevo banco
            await crearBanco({ name: banconame.value });
        }

            bancos.value = await getBancos(); // Refrescar la lista
            banconame.value='';

    } catch (error) {
        console.error("Error guardando banco:", error);
        //alert("Ocurrió un error al guardar el banco");
        alert("Ocurrió un error al guardar el banco: " + (error.message || JSON.stringify(error)));
    } finally {
        enviando.value = false;
    }
}

//Eliminar Un banco

const mostrarDialogoEliminar = ref(false)
const bancoAEliminarId = ref(null);

function eliminarBancoVista(id) {

    bancoAEliminarId.value = id;
    mostrarDialogoEliminar.value = true;
}

async function confirmarEliminacion() {

    if (!bancoAEliminarId.value) return;

    try {
    enviando.value = true;

    // Aquí se hace la petición para eliminar el registro desde la base de datos

    await eliminarBanco(bancoAEliminarId.value);

  // Recargando la tabla de presupuestos
    bancos.value= await getBancos();

   // Cerrar el diálogo

    mostrarDialogoEliminar.value = false;
    bancoAEliminarId.value = null;

    } catch (error) {
        console.log("2")
        console.error("Error eliminando banco:", error);
    // Aquí mostrar mensaje de error si quieres
    } finally {
    enviando.value = false;
    }
}

// Para el boton Cancelar
function cancelarFormulario() {
    banconame.value = '';
    editando.value = false;
    bancoSeleccionado.value = null;
    router.push("/home");
};

</script>

<style scoped>
/* Fondo general de la página */

.header-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
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
  border-radius: 16px;
  background: linear-gradient(135deg, #42a5f5, #66bb6a);
  padding: 25px;
  box-sizing: border-box;
  color: white;
  margin: 20px auto;
  max-width: 650px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.banco-container {
  max-width: 400px;
  margin: auto;
  padding: 10px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 11px !important;
  font-family: 'Poppins', sans-serif !important;
  text-transform: none !important;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 30px;
  height: 20px;
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn-aceptar {
  background-color: #2e7d32;
  color: white;
}

.btn-cancelar {
  background-color: #c62828;
  color: white;
}

.btn:hover {
  filter: brightness(1.1);
}
/*Titulo de la opcion*/

.name-opcion {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

/* Imagen de usuario más pequeña */
.user-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

/* Línea divisoria */
.divider {
  border: 1px solid black;
  margin: 5px 0;
  width: 90%;
}

.divider1 {
  border: 1px solid black;
  margin: 5px 0;
  width: 85%;
  margin-left: 12px;
}

.custom-height {
    height: 20px; /* o el valor que uses en los inputs normales */
    font-size: 11px;
    top: 5px;
    margin-bottom: 20px;
}

.tabla-bancos .v-data-table-header th {
  background-color: #1976d2;
  color: white;
  font-size: 12px;
  padding: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.tabla-bancos .v-data-table__td {
  font-size: 13px;
  color: #333;
  background-color: #fafafa;
}

.tabla-bancos .v-data-table__td {
  font-size: 13px;
  color: #333;
  background-color: #fafafa;
}

.tabla-bancos .v-data-table__wrapper {
    border-radius: 10px;
}

.tabla-bancos .v-data-table {
    border-radius: 12px;
}

input::placeholder {
    font-size: 14px; /* tamaño de letra del placeholder */
    margin-left: 10px;

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

/* Tablets (pantallas entre 768px y 991.98px) */
@media (max-width: 991.98px) {
  .form-container {
    padding: 15px;
    max-width: 100%;
    width: 100%;
    flex-direction: column;
  }

  .form-buttons {
    justify-content: center;
    margin-left: 0;
  }

  .btn {
    width: 90px;
    height: 30px;
  }

  .form-gradient-box {
    width: 100%;
    padding: 20px 10px;
  }

  .name-opcion {
    font-size: 20px;
    text-align: center;
  }

  .user-icon {
    width: 40px;
    height: 40px;
  }
}


/* Móviles grandes (pantallas entre 576px y 767.98px) */
@media (max-width: 767.98px) {
  .form-container {
    padding: 10px;
    flex-direction: column;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-left: 0;
  }

  .btn {
    width: 100%;
    max-width: 180px;
    height: 35px;
    font-size: 12px;
  }

  .form-gradient-box {
    padding: 15px 10px;
  }

  .name-opcion {
    font-size: 18px;
    text-align: center;
  }

  .divider {
    margin: 8px auto;
  }
}


/* Móviles pequeños (pantallas menores a 576px) */
@media (max-width: 575.98px) {
  .form-container {
    padding: 10px;
    flex-direction: column;
  }

  .form-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-left: 0;
  }

  .btn {
    width: 100%;
    max-width: 160px;
    height: 35px;
    font-size: 11px;
  }

  .form-gradient-box {
    padding: 12px 10px;
    margin: 0 auto;
  }


  .name-opcion {
    font-size: 16px;
    text-align: center;
  }

  .divider {
    margin: 6px auto;
    width: 100%;
  }

  input::placeholder {
    font-size: 12px;
  }
}

</style>
