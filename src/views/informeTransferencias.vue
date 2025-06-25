<template>
    <NavBar />
    <div class="form-gradient-box">
        <div class="contendedor-blanco">
            <div class="header-inline">
                <img src="../assets/img/tarjetas/transf.png" class="user-icon" alt="Icono usuario" />
                <h1 class="name-opcion">{{ $t("informeTransferencias.app_option") }}</h1>
            </div>
            <hr class="divider " />
            <div class="informe-container">

                    <v-row>
                        <!--mes inicial -->
                        <v-col cols="12" md="6" >
                            <v-menu
                                v-model="fechaInicial"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                >
                                <template #activator="{ props }">
                                    <v-text-field
                                        v-model="form.fechaInicial"
                                        :label="$t('informeTransferencias.monthStart')"
                                        readonly
                                        v-bind="props"
                                        density="compact"
                                        class="custom-height white-rounded input-fecha"
                                        prepend-inner-icon="mdi-calendar-month"
                                    />
                                </template>

                                <v-date-picker
                                    @update:model-value="selectFechaInicial"
                                    color="primary"
                                />
                            </v-menu>
                        </v-col>

                        <!--mes final -->
                        <v-col cols="12" md="6">

                            <v-menu
                                v-model="fechaFinal"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                >
                                <template #activator="{ props }">
                                    <v-text-field
                                        v-model="form.fechaFinal"
                                        :label="$t('informeTransferencias.monthEnd')"
                                        readonly
                                        v-bind="props"
                                        density="compact"
                                        class="custom-height white-rounded input-fecha"
                                        prepend-inner-icon="mdi-calendar-month"
                                    />
                                </template>

                                <v-date-picker
                                    @update:model-value="selectFechaFinal"
                                    color="primary"
                                />
                            </v-menu>

                        </v-col>
                    </v-row>

                    <!-- Cuenta Origen -->
                    <v-row>
                        <v-col cols="12" md="12" class="espacio-reducido">
                            <v-autocomplete
                                v-model="form.from_account_id"
                                :items="cuentasOrigenFiltradas"
                                item-title="name"
                                item-value="id"
                                :label="form.from_account_id ? '' : $t('informeTransferencias.source_account')"
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
                                :label= "$t('informeTransferencias.destination_account')"
                                class="custom-height"
                                dense
                                outlined
                                density="compact"
                                prepend-inner-icon="mdi-arrow-down-bold-circle"
                            />
                        </v-col>

                        <!-- Descripción -->

                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="form.description"
                                :placeholder="$t('informeTransferencias.description')"
                                dense
                                outlined
                                density="compact"
                                prepend-inner-icon="mdi-note-outline"
                                class="custom-height"
                            />
                        </v-col>
                    </v-row>

                    <!-- Boton Filtrar -->

                    <div class="d-flex justify-end">
                        <v-btn  @click="submitForm"
                                :disabled="enviando "
                                :loading="enviando"
                                class="btn-filtrar">{{ $t("informeTransferencias.submit") }}
                        </v-btn>
                    </div>

                    <!-- Tabla de transferencias -->
                    <v-card
                        class="mx-auto pa-2"
                        elevation="8"
                        style="max-width: 600px; border-radius: 16px; background-color: #f9f9f9;"
                        >
                        <v-data-table
                            :headers="headers"
                            :items="transferenciasConNombres"
                            item-value="id"
                            class="tabla-informeTransferencias"
                            :items-per-page="-1"
                            hide-default-footer
                            fixed-header
                            height="150"
                            dense
                            >
                        </v-data-table>
                    </v-card>

                    <!-- Contenedor principal de botones -->
                    <div class="form-buttons-separados">

                        <!-- Botones de Exportar PDF, Excel e Imprimir -->
                        <div  class="grupo-izquierdo">
                            <!-- PDF -->
                            <v-btn
                                @click="exportarPDF"
                                :disabled="enviando"
                                :loading="enviando"
                                class="btn-exportar"
                                color="lighten-4"
                                style="flex-direction: column; align-items: center; padding: 8px"
                                >
                                <span   style="font-size: 10px;
                                        font-weight: bold">
                                        {{ $t("informeTransferencias.export") }}
                                </span>
                                <v-icon color="red" size="28">mdi-file-pdf-box</v-icon>
                            </v-btn>

                            <!-- Excel -->
                            <v-btn
                                @click="exportarExcel"
                                :disabled="enviando"
                                :loading="enviando"
                                class="btn-exportar"
                                color="lighten-4"
                                style="flex-direction: column; align-items: center; padding: 8px"
                                >
                                <span   style="font-size: 10px;
                                        font-weight: bold">
                                        {{ $t("informeTransferencias.export") }}
                                </span>
                                <v-icon color="green" size="28">mdi-file-excel-box</v-icon>
                            </v-btn>

                            <!-- Imprimir (solo ícono) -->
                            <v-btn
                                @click="imprimirDocumento"
                                :disabled="enviando"
                                :loading="enviando"
                                class="btn-imprimir"
                                color="lighten-4"
                                >
                                <v-icon color="blue" size="28">mdi-printer</v-icon>
                            </v-btn>
                        </div>

                        <!-- Botón Cancelar (rojo) -->
                        <div    class="grupo-derecha">

                            <v-btn  @click="cancelarFormulario"
                                    :disabled="enviando"
                                    class="btn-cancelar"> {{ $t("transferencias.cancel") }}
                            </v-btn>
                        </div>
                    </div>


            </div>
        </div>

    </div>
    <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        location="top"
        color="success"
        rounded="pill"
        multi-line
        >
        {{ snackbarMessage }}
    </v-snackbar>

    <Footer />
</template>

<script setup>

import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUserByUserName } from '@/services/register';
import { getAccountById } from "@/services/accountService";
import { getAllAccounts } from "@/services/accountService";
import { getTransferenciasById } from "@/services/transferencias";

// para poder exportar a PDF, EXCE e Imprimir

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

//usuario autentificado
const username = localStorage.getItem('username')

// PARA TODO LO REFERENTE AL IDIOMA
const { locale, t } = useI18n();


const router = useRouter();
const cuentaOrigen = ref([]);
const cuentaDestino = ref([]);
const fechaInicial = ref(false);
const fechaFinal = ref(false);
const fechaMinima = new Date().toISOString().split('T')[0];
const user_id_tmp = ref(null)
const enviando = ref(false)
const transferencias = ref([])

//para el mensaje que saldra al exportar
const snackbar = ref(false)
const snackbarExcel = ref(false)
const snackbarMessage = ref('')

const form = ref({
    fechaInicial: '',
    fechaFinal: '',
    from_account_id: '',
    to_account_id: '',
    fecha: ''
});


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


const selectFecha = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();
    form.value.fecha = `${dia}/${mes}/${anio}`;  // formato completo
    menuFecha.value = false;
};

const selectFechaInicial = (value) => {
    form.value.fechaInicial = value;
    fechaInicial.value = false;
};

const selectFechaFinal = (value) => {
    form.value.fechaFinal = value;
    fechaFinal.value = false;
};


onMounted(async () => {

    const user_id = await getUserByUserName(username)

    user_id_tmp.value=user_id.data.id

    cuentaOrigen.value = await getAccountById(user_id.data.id);
    cuentaDestino.value = await getAllAccounts();
    transferencias.value= await getTransferenciasById(user_id_tmp.value);
});

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



const transferenciasConNombres = computed(() => {
    return transferencias.value.map((item) => {
        const cuentaOrigenNombre = cuentaOrigen.value.find(c => c.id === item.from_account_id)?.name || item.from_account_id;
        const cuentaDestinoNombre = cuentaDestino.value.find(c => c.id === item.to_account_id)?.name || item.to_account_id;

        return {
        ...item,
        from_account_id: cuentaOrigenNombre,
        to_account_id: cuentaDestinoNombre,
        };
    });
});


const headers = computed(() => [
    { title: t('informeTransferencias.date'), value: 'date', width: '90px' },
    { title: t('informeTransferencias.source'), value: 'from_account_id', width: '40px' },
    { title: t('informeTransferencias.destination'), value: 'to_account_id' },
    { title: t('informeTransferencias.amount'), value: 'amount' },
]);


// Función para exportar a PDF
const exportarPDF = () => {
    const doc = new jsPDF();
    const columns = headers.value.map(h => h.title);
    const rows = transferenciasConNombres.value.map(item => [
        item.date,
        item.from_account_id,
        item.to_account_id,
        item.amount,
    ]);

    autoTable(doc, {
        head: [columns],
        body: rows,
    });

    doc.save("informeTransferencias.pdf");

    snackbarMessage.value = t("informeTransferencias.messagePDF");
    snackbar.value = true;
};


// Función para exportar a Excel

const exportarExcel = () => {
    const data = transferenciasConNombres.value.map(item => ({
        Fecha: item.date,
        "Cuenta Origen": item.from_account_id,
        "Cuenta Destino": item.to_account_id,
        Monto: item.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "informeTransferencias");
    XLSX.writeFile(workbook, "informeTransferencias.xlsx");

    snackbarMessage.value = t("informeTransferencias.messageEXCEL");
    snackbar.value = true;
};

// Función para imprimir
const imprimirDocumento = () => {
    const columnas = headers.value.map(h => h.title);
    const filas = transferenciasConNombres.value.map(item => [
        item.date,
        item.from_account_id,
        item.to_account_id,
        item.amount,
    ]);

    let ventana = window.open('', '', 'height=600,width=800');

    let contenidoHTML = `
        <html>
        <head>
            <title>${t("informeTransferencias.app_option")}</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: black;
            }
            h2 {
                text-align: center;
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                font-size: 12px;
            }
            th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
                max-width: 150px;
                word-break: break-word;
            }
            th {
                background-color: #f0f0f0;
                color: #333;
            }
            </style>
        </head>
        <body>
            <h2>${t("informeTransferencias.app_option")}</h2>
            <table>
            <thead>
                <tr>${columnas.map(col => `<th>${col}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${filas.map(row => `<tr>${row.map(val => `<td>${val}</td>`).join('')}</tr>`).join('')}
            </tbody>
            </table>
        </body>
        </html>
    `;

    ventana.document.write(contenidoHTML);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
};

</script>

<style scoped>

/* Texto global de toda la vista */
* {
    color: black !important;
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
    width: 500px;
    height: 600px;
}

.contendedor-blanco {
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 560px;
}


.header-inline {
    display: flex;
    margin-top:0px;
    align-items: center;
    gap: 5px;
}


.divider {
    border: 1px solid black;

    width: 100%;
}

.name-opcion {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #070606;
    text-align: center;
    left: 8px;
}

.informe-container {
    max-width: 800px;
    margin: auto;
    padding: 10px;
}


.custom-height {
    height: 40px; /* o el valor que uses en los inputs normales */
    font-size: 12px;
    border: 2px solid rgb(10, 10, 10);
    border-radius: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
}


.white-rounded .v-field {
    background-color: white;
    border-radius: 10px;
}

.user-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.espacio-reducido {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.input-fecha {
    margin-bottom: 4px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.input-fecha .v-field {
    min-height: 36px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}


/* Placeholder de inputs */
::placeholder {
    color: black !important;
    opacity: 1;
}

/* Placeholder y texto dentro de los campos Vuetify */
.v-field input::placeholder,
.v-field input {
    color: black !important;
}

/* Cambiar color de íconos internos (prepend-inner-icon) */
.v-icon {
    color: black !important;
}

/* Color del label del input (cuando no hay texto aún) */
.v-label {
    color: black !important;
}

/* Color del texto en los items del v-autocomplete */
.v-list-item-title {
    color: black !important;
}

/* Ajustar campo con fondo blanco y bordes suaves */
.white-rounded .v-field {
    background-color: white !important;
    border-radius: 10px;
}

/* Asegura que el color en los elementos seleccionados se vea bien */
.v-select__selection-text {
    color: black !important;
}

/* Asegurar que el picker también tenga texto negro */
.v-date-picker-header__content,
.v-date-picker-table--date {
    color: black !important;
}

.btn-filtrar {
    align-items: center;
    justify-content:end; /* centra horizontalmente */
    padding: 10px 20px;
    font-size: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 150px;
    height: 30px;
    font-style: "popins";
    margin-bottom: 4px;
    margin-top: 4px;
    background-color: #196c2c; /* verde */
    color:white !important;
}
.form-buttons-separados {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}

.grupo-izquierdo {
    display: flex;
    align-items: center;
}

.grupo-derecho {
    display: flex;
    align-items: center;
}

.btn-exportar{
    align-items: center;
    justify-content:start; /* centra horizontalmente */
    font-size: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 90px;
    height: 30px;
    font-style: "popins";
    margin-right: 30px;
    margin-bottom: 4px;
    margin-top: 4px;
    background-color: white;
    color:aqua !important;
}

.btn-imprimir{
    align-items: center;
    justify-content:start; /* centra horizontalmente */
    font-size: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 40px;
    height: 30px;
    margin-right: 25px;
    margin-bottom: 4px;
    margin-top: 4px;
    background-color: white;
    color:aqua !important;
}


.btn-cancelar {
    align-items: center;
    justify-content:end;
    cursor: pointer;
    background-color: #dc3545; /* rojo */
    color: white;
    width: 85px;
    height: 30px;
    margin-bottom: 4px;
    margin-top: 4px;
    font-size: 10px;
}


.tabla-informeTransferencias .v-data-table-header th {
    background-color: #e3f2fd; /* azul claro */
    color: #0d47a1;
    font-size: 12px;
}

.tabla-informeTransferencias .v-data-table__td {
    font-size: 10px;
    color: #333;
    border-bottom: 1px solid #ccc;
}

.tabla-informeTransferencias .v-data-table__wrapper {
    border-radius: 10px;
}

.tabla-informeTransferencias .v-data-table {
    border-radius: 12px;
}

.v-data-table th,
.v-data-table td {
    max-width: 100px;     /* Ajusta ancho máximo */
    overflow: hidden;
    text-overflow: ellipsis; /* Agrega "..." si no cabe el texto */
}

/* Encabezados centrados en todas las columnas */
.tabla-informeTransferencias .v-data-table-header th {
    text-align: center !important;
    font-size: 12px;
    font-weight: 100;
    background-color: #e3f2fd;
    color: #0d47a1;
}

/* Ajustar ancho y centrado específico para columnas */
.tabla-informeTransferencias .v-data-table-header th:nth-child(3) { /* Destino */
    width: 100px !important;
    text-align: center !important;
}

.tabla-informeTransferencias .v-data-table-header th:nth-child(4) { /* Importe */
    width: 100px !important;
    text-align: center !important;
}

/* Celdas alineadas a la izquierda, menos la columna importe */
.tabla-informeTransferencias .v-data-table__td {
    text-align: left !important;
    vertical-align: middle !important;
    font-size: 12px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Celdas importe alineadas a la derecha y más angosta */
.tabla-informeTransferencias .v-data-table__td:nth-child(4) {
    text-align: right !important;
    max-width: 100px !important;
    padding-right: 8px;
}


</style>