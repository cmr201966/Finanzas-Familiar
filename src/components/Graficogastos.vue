<template>
  <div class="contenedor-horizontal">
    <div class="grafico">
      <Doughnut :data="chartData" :options="chartOptions" :width="150" :height="150" />
    </div>
    <div class="leyenda">
      <ul>
        <li v-for="(dato, index) in datos" :key="index">
          <span 
            class="color-circulo" 
            :style="{ backgroundColor: colores[index % colores.length] }"
          ></span>
          {{ dato.categoria }}: {{ dato.total }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

// Registrar elementos necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  datos: {
    type: Array,
    required: true
  }
})

// Colores para el gráfico
const colores = [
  '#FF6384', '#36A2EB', '#FFCE56',
  '#4BC0C0', '#9966FF', '#FF9F40'
]

// Datos del gráfico como computed
const chartData = computed(() => ({
  labels: props.datos.map(d => d.categoria),
  datasets: [{
    label: 'Gastos por categoría',
    data: props.datos.map(d => d.total),
    backgroundColor: colores,
    borderWidth: 1
  }]
}))

// Opciones del gráfico
const chartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
  callbacks: {
    label: function(context) {
      const value = context.formattedValue || ''
      return `${value}`
    }
  },
  displayColors: false,
  bodyFont: {
    size: 12
  },
  boxPadding: 4,
  padding: 6
}
  }
}
</script>

<style scoped>
.contenedor-horizontal {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2vw;
}

.grafico {
  flex-shrink: 0;
}

.leyenda {
  max-width: 200px;
}

.leyenda ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leyenda li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #374151;
}

.color-circulo {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 0.75rem;
}
</style>