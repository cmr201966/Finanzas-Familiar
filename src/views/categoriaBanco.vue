<template>
    <div class="login-page">
        <div class="login-box">

            <!-- Parte derecha con fondo degradado -->
            <div class="form-container">
                <div class="form-gradient-box">

                        <div class="header-inline">
                            <img src="../assets/img/tarjetas/banco.png" class="user-icon" alt="Icono usuario" />
                            <h1 class="name-opcion">{{ $t("categoriaBanco.app_option") }}</h1>
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <!-- Banco -->
                        <div class="form-field-horizontal input-with-icon">
                            <input  type="text"
                                    :placeholder="$t('categoriaBanco.bank')"
                                    v-model="banconame"
                                    required
                                    name="banco"
                                    autocomplete="off"
                                    class="custom-input"
                                    id="new-bank"
                                    prepend-inner-icon="mdi-calendar-month"
                                    ref="bankInput"
                            />
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <!-- Botones de  Aceptar y cancelar -->

                        <div class="form-buttons">

                            <!-- Botón Aceptar (verde) -->
                            <v-btn @click="submitForm" :disabled="enviando || !banconame.trim()" :loading="enviando" class="btn btn-aceptar">{{ $t("categoriaBanco.submit") }}</v-btn>

                            <!-- Botón Cancelar (rojo) -->
                            <v-btn @click="cancelarFormulario" :disabled="enviando" class="btn btn-cancelar"> {{ $t("categoriaBanco.cancel") }}</v-btn>
                        </div>


                    <!-- Tabla de bancos-->
                    <div style="max-height: 400px; overflow-y: auto;">
                        <v-data-table
                            :headers="headers"
                            :items="bancos"
                            item-value="id"
                            class="elevation-1 font-tabla"
                            :items-per-page="-1"
                            hide-default-footer
                            style="min-width:230px;"
                        >
                        <template #item.acciones="{ item }">
                            <div class="d-flex align-center">
                                <v-btn icon class="bg-transparent" @click="editarBancoVista(item)">
                                    <v-icon size="18">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon class="bg-transparent" @click="eliminarBancoVista(item.id)">
                                    <v-icon size="18" color="red">mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </template>
                        </v-data-table>
                    </div>
                    <v-dialog v-model="mostrarDialogoEliminar" max-width="400">
                        <v-card>
                            <v-card-title class="text-h6">¿Estás seguro?</v-card-title>
                                <v-card-text>¿Deseas eliminar este banco? Esta acción no se puede deshacer.</v-card-text>
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
const headers = [
 // { title: 'ID', value: 'id' },
    { title: t('categoriaBanco.descripction_bank'), value: 'name' },
    { title: t('categoriaBanco.actions'), value: 'acciones', sortable: false },
]

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
            cancelarFormulario(); // Limpiar formulario y salir de modo edición

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
    console.log("1")

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

/* Parte izquierda: logo y texto */
.logo-section {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ddd;
    padding: 20px;
}

/* Logo */
.logo {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
}


.header-inline {
    display: flex;
    align-items: center;
    gap: 5px;
}

/* Nombre app */
.app-name {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    text-align: center;
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


/* Recuadro con gradiente */

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
    width: 300px;
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
    font-size: 25px;
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
    margin: 1rem auto;
    width: 80%; /* o 100%, o un valor fijo como 300px */
    display: block;
}


/* ======================== */
/* Inputs con iconos dentro */
/* ======================== */

/* Contenedor flex para alinear icono e input horizontalmente */

.form-field-horizontal {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    width: 40%;
    margin-bottom: 8px; /* antes era 12px */
}

.form-field-horizontal label {
    color: white;
    min-width: 90px;
    font-weight: 500;
}

.form-field-horizontal input {
    height: 30px;
    padding: 10px 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 14px;
    max-width: 250px;
}

.form-field-horizontal .icono-ojo {
    position: absolute;
    right: 15px;
    width: 15px;
    height: 15px;
    top:-5px;
}

.form-field-horizontal img.input-icon {
    width: 26px;
    height: 26px;
    transform: -2px; /* Sube un poco el icono */
}

/* Input personalizado con espacio para icono a la izquierda */
.input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
    width: 90%;
    margin-bottom: 16px;
}

.input-with-icon input {
    width: 90%;
    padding: 10px 12px 10px 44px; /* espacio izquierdo para la imagen */
    border: 2px solid gray;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    background-color: white; /* O blanco implícito */
    margin-left: 8px;
}

input::placeholder {
    font-size: 10px; /* tamaño de letra del placeholder */
    margin-left: 10px;

}

.input-icon-inside {
    position: absolute;
    left: 25px;
    top: -15px;
    width: 20px;
    height: 20px;
    border-radius: 5px;

}

.input-with-icon .input-icon-inside {
    position: absolute;
    left: 18px;
    width: 20px;
    height: 20px;

}

.submit-button:hover {
    background-color: rgba(255, 255, 255, 0.9);
}

.menu-reducido {
    width: 100px;
    padding: 2px 0; /* Ajusta el alto vertical */
    padding-inline: 7px;
    min-height: 32px;
}

.custom-input {
    padding-left: 40px; /* deja espacio para el icono */
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 40px;
    font-size: 12px;
    background-color: white;
    color: black;
    outline: none;
    box-sizing: border-box;
    height: 30px;
}
.bandera{
    width: 30px;
    height: 30px;
}
.idioma-conf{
    font-size: 12px;
}

.user-info {
    font-size: 11px;
    color: #fbfafa;
    margin-top: -14px;
    margin-left: 9px; /* o lo necesario para alinear bien debajo del input */
    margin-bottom: 10px;
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


/* =====================================================
        Responsive Styles - Archivo CSS Reutilizable
        Puedes incluir este archivo en todas tus vistas.
    ===================================================== */

    /* ============ TELÉFONOS GRANDES (576px a 767px) ============ */
@media (max-width: 768px) {
    .login-box {
        flex-direction: column;
        width: 90vw;
        min-height: auto;
        border-radius: 8px;
        }

    .logo-section {
        border-right: none;
        border-bottom: 1px solid #ddd;
        padding: 15px;
        flex: none;
        width: 100%;
        }

    .logo {
        width: 120px;
        height: 120px;
        margin-bottom: 5px;
    }

    .app-name {
        font-size: 18px;
    }

    .form-container {
        flex: none;
        width: 100%;
        max-width: 100%;
        padding: 15px;
        margin: 0;
    }

    .form-gradient-box {
        max-width: 100%;
        padding: 15px 10px;
        border-radius: 8px;
    }

    .form-gradient-box img.user-icon {
        width: 40px;
        height: 40px;
        margin-top: 5px;
    }

    .input-with-icon input {
        width: 100%;
        padding-left: 40px;
    }

    .submit-button {
        width: 100%;
        height: 40px;
        margin-bottom: 15px;
    }

    .language-switcher {
        top: 0;
        right: 0;
        margin-bottom: 10px;
    }

    .bandera {
        width: 30px;
        height: 30px;
    }
}

/* ============ TABLETS (768px a 991px) ============ */

@media (min-width: 768px) and (max-width: 991.98px) {
    .login-box {
        width: 80%;
    }

    .form-gradient-box {
        padding: 30px;
    }

    .logo {
        width: 100px;
        height: 100px;
    }

    .app-name {
        font-size: 20px;
    }

    .submit-button {
        height: 42px;
        font-size: 16px;
    }
    }

/* ============ MÓVILES PEQUEÑOS (Teléfonos < 576px) ============ */

@media (max-width: 575.98px) {

    /* Contenedor principal */

    .login-box {
        width: 100%;
        margin: 0;
        border-radius: 0;
    }

    .form-gradient-box {
        padding: 20px;
    }

    .form-container {
        padding: 10px;
    }

    .logo {
        width: 80px;
        height: 80px;
    }

    .app-name {
        font-size: 16px;
    }

    .submit-button {
        height: 36px;
        font-size: 14px;
    }

    .footer {
        font-size: 12px;
    }
}

/* ============ LAPTOPS (992px a 1199px) ============ */

@media (min-width: 992px) and (max-width: 1199.98px) {

    .login-box {
        width: 60%;
    }

    .form-gradient-box {
        padding: 35px;
    }

    .logo {
        width: 120px;
        height: 120px;
    }

    .app-name {
        font-size: 22px;
    }

    .submit-button {
        height: 46px;
        font-size: 17px;
    }
    }




</style>
