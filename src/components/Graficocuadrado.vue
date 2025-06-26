<template>
  <div class="grid-container">
    <div
      v-for="item in datos"
      :key="item.categoria"
      class="square"
      :style="{
        backgroundColor: colorCuadro(item.gasto / item.presupuesto)
      }"
      :title="`${item.categoria}: $${item.gasto} de $${item.presupuesto}`"
    >
      {{ item.categoria }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const datos = ref([
  { categoria: "Comida", presupuesto: 500, gasto: 400 },
  { categoria: "Transporte", presupuesto: 200, gasto: 220 },
  { categoria: "Entretenimiento", presupuesto: 300, gasto: 150 }
])

function colorCuadro(ratio) {
  if (ratio <= 1) {
    // De verde (0) a amarillo (1)
    const green = Math.round(255 * (1 - ratio))
    const red = Math.round(255 * ratio)
    return `rgb(${red},${green},0)`
  } else {
    // Si se pasó del presupuesto, rojo fuerte
    return 'rgb(255,0,0)'
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  padding: 20px;
}

.square {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: default;
  user-select: none;
}
</style>