<template>
  <div class="carousel-container">
    <button @click="moveSlide(-1)" class="nav-button">❮</button>
    
    <div class="carousel-track">
      <div
        class="carousel-slide"
        :style="{ transform: `translateX(-${currentIndex * imageWidth}px)` }"
      >
           <div
  v-for="(image, index) in images"
  :key="index"
  class="carousel-item"
  @click="handleClick(image)"
>
  <div class="image-wrapper">
    <img :src="image.src" :alt="image.alt" />
    <p class="image-label">{{ image.alt }}</p>
  </div>
</div>
      </div>
    </div>

    <button @click="moveSlide(1)" class="nav-button">❯</button>
  </div>
</template>

<script setup>
import ahorros from '../assets/img/ahorros.jpg'
import gastos from '../assets/img/gastos.jpg'
import historial from '../assets/img/historial.jpg'
import ingresos from '../assets/img/ingresos.jpg'
import presupuesto from '../assets/img/presupuesto.jpg'
import reportes from '../assets/img/reportes.jpg'
import { ref } from 'vue'

const images = ref([
  { src: ahorros, alt: 'Ahorros', id: 1 },
  { src: gastos, alt: 'Gastos', id: 2 },
  { src: historial, alt: 'Historial', id: 3 },
  { src: ingresos, alt: 'Ingresos', id: 4 },
  { src: presupuesto, alt: 'Presupuesto', id: 5 },
  { src: reportes, alt: 'Reportes', id: 5 },
  ])
const currentIndex = ref(0)
const visibleCount = 3
const imageWidth = 200

const moveSlide = (direction) => {
  const maxIndex = images.value.length - visibleCount
  currentIndex.value += direction
  if (currentIndex.value < 0) currentIndex.value = 0
  if (currentIndex.value > maxIndex) currentIndex.value = maxIndex
}

const handleClick = (image) => {
  alert(`Seleccionaste: ${image.alt} (ID: ${image.id})`)
  // También puedes usar router.push() si usas Vue Router
  // router.push(`/detalle/${image.id}`)
}
</script>

<style>
.carousel-container {
  display: flex;
  align-items: center;
  width: 660px;
  margin: auto;
  overflow: hidden;
  position: absolute; top: 250px; left: 200px;
}

.carousel-track {
  overflow: hidden;
  width: 100%;
}

.carousel-slide {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 0px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s;
}

.carousel-item:hover img {
  transform: scale(1.05);
}

.nav-button {
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}
.image-wrapper {
  width: 100px;
  border: 2px solid #0056b3;
  border-radius: 8px;
  padding: 5px;
  transition: transform 0.3s, border-color 0.3s;
  background: transparent;
}

.image-wrapper:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper img {
  width: 80px;
  height: auto;
  border-radius: 5px;
}

.image-label {
  font-size: 15px;
  margin-top: 8px;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}
</style>