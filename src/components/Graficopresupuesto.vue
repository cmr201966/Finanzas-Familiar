<script setup>
import { onMounted, watch, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  datos: {
    type: Array,
    required: true
  }
})

const canvas = ref(null)
let chartInstance = null

function crearGrafico() {
  if (!props.datos || !Array.isArray(props.datos)) return

  const labels = props.datos.map(item => item.categoria)
  const presupuestos = props.datos.map(item => item.presupuesto)
  const reales = props.datos.map(item => item.real)

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Presupuesto',
          data: presupuestos,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        },
        {
          label: 'Real',
          data: reales,
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(crearGrafico)
watch(() => props.datos, crearGrafico, { deep: true })
</script>

<template>
  <div class="grafico-presupuesto-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.grafico-presupuesto-wrapper {
  width: 38vw;
  height: 8vw;
  position: relative;
}
canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>