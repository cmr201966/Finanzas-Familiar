<template>
    <NavBar />
    <div class="form-gradient-box">
        <div class="contendedor-blanco">
            <div class="header-inline">
                <img src="../assets/img/tarjetas/presupuesto.png" class="user-icon" alt="Icono usuario" />
                <h1 class="name-opcion">{{ $t("informePresupuesto.name_option") }}</h1>
            </div>
            <hr class="divider " />

            <div class="informe-container">

                <!--Input para seleccionar el mes -->
            <v-row class="mb-2">
                <v-col cols="12" md="4">
                    <v-menu
                        v-model="menuMes"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        >
                        <template #activator="{ props }">
                            <v-text-field
                            v-model="form.mes"
                            :label="$t('informePresupuesto.select_month')"
                            density="compact"
                            readonly
                            v-bind="props"
                            class="custom-height white-rounded input-fecha"
                            prepend-inner-icon="mdi-calendar-month"
                            color="black"
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

                <v-col cols="12" md="8" >
                    <v-autocomplete
                        v-model="form.categoria_id"
                        :items="categorias"
                        item-title="name"
                        item-value="id"
                        :label="form.categoria_id ? '' : $t('informePresupuesto.select_category')"
                        class="custom-height white-rounded"
                        :loading="loading"
                        density="compact"
                        outlined
                        prepend-inner-icon="mdi-tag-multiple"
                        />
                </v-col>
            </v-row>

            <!-- Recuadro que informa el presupuesto, gasto y saldo -->
            <v-card
                class="mx-auto mb-4 pa-3 info-presupuesto-card"
                elevation="6"
                style="border-radius: 12px; max-width: 600px; background-color: #e3f2fd;"
                >
                <v-col cols="12" class="text-left">
                    <div    style="margin-bottom: 8px;
                            font-weight: bold;
                            color: black;">
                            {{ $t("informePresupuesto.presupuesto_total") }}:

                            <span   style="font-weight: normal;
                                    color: #2e7d32;
                                    font-size: 14px;">
                                    {{ presupuestoTotal }} CUP
                            </span>
                    </div>

                    <v-row>
                        <v-col cols="6" class="text-left">
                            <div style="font-weight: bold; color: black;">
                            {{ $t("informePresupuesto.gasto_real") }}:
                            <span style="font-weight: normal; color: #c62828; font-size: 14px;">
                                {{ gastoReal }} CUP
                            </span>
                            </div>
                        </v-col>

                        <v-col cols="6" class="text-right">
                            <div style="font-weight: bold; color: black;">
                                {{ $t("informePresupuesto.saldo_disponible") }}:
                                <span
                                    :style="{
                                    fontWeight: 'normal',
                                    color: saldoDisponible >= 0 ? '#2e7d32' : '#c62828',
                                    fontSize: '14px'
                                    }"
                                >
                                    {{ saldoDisponible }} CUP
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card>

            <!-- Tabla de Presupuestos -->
            <v-card
                class="mx-auto pa-2"
                elevation="8"
                style="max-width: 600px; border-radius: 16px; background-color: #f9f9f9;"
                >
                <v-data-table
                    :headers="headers"
                    :items="presupuestosFiltrados"
                    item-value="id"
                    class="tabla-informePresupuesto"
                    :items-per-page="-1"
                    hide-default-footer
                    fixed-header
                    height="220"
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
                                {{ $t("informePresupuesto.export") }}
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
                                {{ $t("informePresupuesto.export") }}
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
                                class="btn-cancelar"> {{ $t("informePresupuesto.cancel") }}
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

import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { getPresupuestosByUserName } from "@/services/presupuestos";
import { getCategoriasByType } from "@/services/categorias";


// para poder exportar a PDF, EXCE e Imprimir

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";


// PARA TODO LO REFERENTE AL IDIOMA
const { locale, t } = useI18n();
const router = useRouter();

const username = localStorage.getItem('username') //usuario autentificado

const presupuestos = ref([])


//para el mensaje que saldra al exportar
const snackbar = ref(false)
const snackbarExcel = ref(false)
const snackbarMessage = ref('')


//PARA TODO LO REFERENTE AL MES
const menuMes = ref(false);
const pickerMes = ref("");
const hoy = new Date();
const año = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const fechaMinima = `${año}-${mes}`;

const itemsTabla = computed(() => {
  const mes = form.value.mes_guardado;

  if (!mes) return [];

  return presupuestos.value
    .filter(p => p.mes === mes)
    .map(p => {
      // Obtener gasto real por categoría
      const gasto = transferenciasConNombres.value
        .filter(t =>
          t.fecha?.startsWith(mes) &&
          t.categoria_id === p.categoria_id &&
          t.username === username
        )
        .reduce((total, t) => total + parseFloat(t.monto || 0), 0);

      const porcentaje = p.monto > 0 ? ((gasto / p.monto) * 100).toFixed(1) : 0;

      return {
        id: p.id,
        categoria: categorias.value.find(c => c.id === p.categoria_id)?.name || '',
        presupuesto: p.monto,
        gasto: gasto,
        usado: `${porcentaje}%`
      };
    });
});


//const presupuestoTotal = ref(0);
//const gastoReal = ref(0);

const presupuestoTotal = computed(() => {
    const mes = form.value.mes_guardado;
    const categoria = form.value.categoria_id;
    if (!mes || !categoria) return 0;

    return presupuestos.value
        .filter(p => p.mes === mes && p.categoria_id === categoria)
        .reduce((total, p) => total + parseFloat(p.monto || 0), 0);
});

const gastoReal = computed(() => {
    const mes = form.value.mes_guardado;
    const categoria = form.value.categoria_id;
    if (!mes || !categoria) return 0;

    return transferenciasConNombres.value
        .filter(t =>
        t.fecha?.startsWith(mes) &&
        t.categoria_id === categoria &&
        t.username === username
        )
        .reduce((total, t) => total + parseFloat(t.monto || 0), 0);
});

const saldoDisponible = computed(() => {
    return presupuestoTotal.value - gastoReal.value;
});

const porcentajeUsado = computed(() => {
    if (presupuestoTotal.value === 0) return 0;
    return ((gastoReal.value / presupuestoTotal.value) * 100).toFixed(1);
});

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

onMounted(async () => {

    categorias.value = await getCategoriasByType('gasto', username);
    presupuestos.value= await getPresupuestosByUserName(username);

});

const headers = computed(() => [
 // { title: 'ID', value: 'id' },
    { title:  t('informePresupuesto.category'), value: 'categoria' },
    { title: t('informePresupuesto.presupuesto'), value: 'presupuesto' },
    { title: t('informePresupuesto.gasto_real'), value: 'gasto' },
    { title: t('informePresupuesto.usado'), value: 'usado' },

])

const presupuestosFiltrados = computed(() => {
    const mes = form.value.mes_guardado;
    const categoria = form.value.categoria_id;

    return presupuestos.value.filter(p => {
        const coincideMes = mes ? p.mes === mes : true;
        const coincideCategoria = categoria ? p.categoria_id === categoria : true;
        return coincideMes && coincideCategoria;
    });
});


</script>

<style scoped>


.form-gradient-box {
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    color:black;
    border: 2px solid blue;
    margin: auto;
    width: 600px;

}

.contendedor-blanco {
    background-color:white;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 600px;
}


.header-inline {
    display: flex;
    margin-top:0px;
    align-items: center;
    gap: 5px;
}


.user-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.name-opcion {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color:black;
    text-align: center;
    left: 8px;
}

.divider {
    border: 1px solid black;
    width: 100%;
}


.informe-container {
    max-width: 600px;
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

.custom-categoria {
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


.input-fecha {
    margin-bottom: 4px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.form-buttons-separados {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 15px;
}

.grupo-izquierdo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.grupo-derecho {
    display: flex;
    align-items: center;
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
    width: 80px;
    height: 30px;
    margin-bottom: 4px;
    margin-top: 4px;
    font-size: 10px;
}

.tabla-informePresupuesto{
    font-size: 13px;
}

.info-presupuesto-card {
    border-radius: 12px;
    max-width: 600px;
    background-color: #e3f2fd;
    min-height: 120px; /* Fija la altura */
    overflow: hidden;
}


</style>