<template>
  <div class="contenedor-grafico-evolucion">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const props = defineProps({
  ingresos: Array,
  gastos: Array,
  etiquetasMeses: Array,
})

const chartData = computed(() => ({
  labels: props.etiquetasMeses,
  datasets: [
    {
      label: 'Ingresos',
      data: props.ingresos,
      borderColor: 'green',
      backgroundColor: 'rgba(0, 128, 0, 0.2)',
      tension: 0.3,
    },
    {
      label: 'Gastos',
      data: props.gastos,
      borderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      tension: 0.3,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
      labels: {
        font: { size: 13 },
        boxWidth: 14,
        padding: 10,
      },
    },
    title: {
      display: true,
      font: { size: 16 },
    },
  },
}
</script>

<style scoped>
.contenedor-grafico-evolucion {
  width: 38vw;
  height: 12vw;
  position: relative;
}
</style>
