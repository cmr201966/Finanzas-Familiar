<template>
  <v-container class="py-4">
    <!-- Formulario -->
    <v-card class="mb-6" elevation="2">
      <v-card-title>
        {{ form.id ? 'Editar Presupuesto' : 'Nuevo Presupuesto' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarPresupuesto">
          <v-row dense>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.categoria"
                label="Categoría de Gastos"
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.mes"
                label="Mes"
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.importe"
                label="Importe"
                type="number"
                required
              />
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-end">
              <v-btn type="submit" color="primary" class="mr-2">
                {{ form.id ? 'Actualizar' : 'Agregar' }}
              </v-btn>
              <v-btn color="grey" @click="limpiarFormulario" v-if="form.id">
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Tabla de presupuestos -->
    <v-data-table
      :headers="headers"
      :items="presupuestos"
      item-value="id"
      class="elevation-1"
    >
      <template #item.acciones="{ item }">
        <v-btn icon @click="editarPresupuesto(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="eliminarPresupuesto(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Categoría de Gastos', value: 'categoria' },
  { text: 'Mes', value: 'mes' },
  { text: 'Importe', value: 'importe' },
  { text: 'Acciones', value: 'acciones', sortable: false },
]

const presupuestos = ref([
  { id: 1, categoria: 'Marketing', mes: 'Enero', importe: 5000 },
  { id: 2, categoria: 'Desarrollo', mes: 'Febrero', importe: 12000 },
])

const form = ref({
  id: null,
  categoria: '',
  mes: '',
  importe: '',
})

function guardarPresupuesto() {
  if (form.value.id) {
    // Editar existente
    const index = presupuestos.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) {
      presupuestos.value[index] = { ...form.value }
    }
  } else {
    // Agregar nuevo
    const nuevoId = presupuestos.value.length
      ? Math.max(...presupuestos.value.map(p => p.id)) + 1
      : 1
    presupuestos.value.push({ ...form.value, id: nuevoId })
  }
  limpiarFormulario()
}

function editarPresupuesto(item) {
  form.value = { ...item }
}

function eliminarPresupuesto(id) {
  presupuestos.value = presupuestos.value.filter(p => p.id !== id)
  if (form.value.id === id) {
    limpiarFormulario()
  }
}

function limpiarFormulario() {
  form.value = {
    id: null,
    categoria: '',
    mes: '',
    importe: '',
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>