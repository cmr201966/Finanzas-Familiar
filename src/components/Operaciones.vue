<template>
  <div class="carousel-container3">
    
    <div class="carousel-track3">
      <div
        class="carousel-slide3"
        :style="{ transform: `translateX(-${currentIndex * imageWidth}px)` }"
      >
           <div
  v-for="(image, index) in images"
  :key="index"
  class="carousel-item3"
  @click="handleClick(image)"
>
  <div class="image-wrapper3">
    <img :src="image.src" :alt="image.alt" />
    <p class="image-label3">{{ image.alt }}</p>
  </div>
</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ingresos from '../assets/img/Ingreso.png'
import gastos from '../assets/img/Gastos.png'
import transferencia from '../assets/img/transferencia.jpeg'

const router = useRouter()

const images = ref([
  { src: ingresos, alt: 'Ingresos', id: 1 },
  { src: gastos, alt: 'Gastos', id: 2 },
  { src: transferencia, alt: 'Transferencias', id: 3 },
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
.carousel-container3 {
  display: flex;
  align-items: center;
  width: 490px;
  margin: auto;
  overflow: hidden;
  position: absolute; top: 165px; left: 550px;
  border: 2px solid #0056b3;
}

.carousel-track3 {
  overflow: hidden;
  width: 100%;
}

.carousel-slide3 {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item3 {
  flex: 0 0 auto;
  padding: 10px; /* antes 10px */
  margin-right: 30px; /* espacio entre imágenes */
  cursor: pointer;
  text-align: center;
  margin-left: 10px;
}

.carousel-item3 img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s;
}

.carousel-item3:hover img {
  transform: scale(1.05);
}

.nav-button3 {
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}
.image-wrapper3 {
  width: 100px;
  border-radius: 8px;
  padding: 5px;
  transition: transform 0.3s, border-color 0.3s;
  background: transparent;
  height: 135px;
}

.image-wrapper3:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper3 img {
  width: 80px;
  height: auto;
  border-radius: 5px;
}

.image-label3 {
  font-size: 13px;
  margin-top: 8px;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}
</style>