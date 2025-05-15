<template>
  <div class="carousel-container">
    
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

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import categoria_ingreso from '../assets/img/catIngresos.png'
import categoria_gasto from '../assets/img/catGastos.png'
import Cuentas from '../assets/img/cuenta.jpg'
import transferencias from '../assets/img/transferencias.png'

const router = useRouter()

const images = ref([
  { src: categoria_ingreso, alt: 'Categoria ingreso', id: 1 },
  { src: categoria_gasto, alt: 'Categoria gasto', id: 2 },
  { src: Cuentas, alt: 'Cuentas', id: 3 },
  { src: transferencias, alt: 'Transferencias', id: 4 },
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
  if (image.alt === 'Cuentas') {
    router.push('/Cuentas')
  } else {
    alert(`Navegación no implementada para: ${image.alt}`)
  }
}
</script>

<style>
.carousel-container {
  display: flex;
  align-items: center;
  width: 660px;
  margin: auto;
  overflow: hidden;
  position: absolute; top: 180px; left: 150px;
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
  height: 135px;
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
  font-size: 13px;
  margin-top: 8px;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}
</style>