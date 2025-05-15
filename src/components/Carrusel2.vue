<template>
  <div class="carousel-container2">
    <button @click="moveSlide(-1)" class="nav-button2">❮</button>
    
    <div class="carousel-track2">
      <div
        class="carousel-slide2"
        :style="{ transform: `translateX(-${currentIndex * imageWidth}px)` }"
      >
           <div
  v-for="(image, index) in images"
  :key="index"
  class="carousel-item2"
  @click="handleClick(image)"
>
  <div class="image-wrapper2">
    <img :src="image.src" :alt="image.alt" />
    <p class="image-label2">{{ image.alt }}</p>
  </div>
</div>
      </div>
    </div>

    <button @click="moveSlide(1)" class="nav-button2">❯</button>
  </div>
</template>

<script setup>
import Resumen_General from '../assets/img/Resumen General.png'
import Vista_Transacciones from '../assets/img/Vista_Transacciones.jpg'
import Vista_Categorias from '../assets/img/categorias.jpg'
import Vista_Trasnferencias from '../assets/img/transferencias.png'
import Anual from '../assets/img/Anual.jpg'
import Presupuesto from '../assets/img/Presupuesto (2).jpg'
import { ref } from 'vue'

const images = ref([
  { src: Resumen_General, alt: 'Resumen General', id: 1 },
  { src: Vista_Transacciones, alt: 'Vista Transacciones', id: 2 },
  { src: Vista_Categorias, alt: 'Vista Categorias', id: 3 },
  { src: Vista_Trasnferencias, alt: 'Vista Trasnferencias', id: 4 },
  { src: Anual, alt: 'Informe Mensual/Anual', id: 5 },
  { src: Presupuesto, alt: 'Presupuesto', id: 6 },
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
.carousel-container2 {
  display: flex;
  align-items: center;
  width: 660px;
  margin: auto;
  overflow: hidden;
  position: absolute; top: 420px; left: 200px;
  color: white;
}

.carousel-track2 {
  overflow: hidden;
  width: 100%;
}

.carousel-slide2 {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item2 {
  flex: 0 0 0px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.carousel-item2 img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s;
}

.carousel-item2:hover img {
  transform: scale(1.05);
}

.nav-button2 {
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}
.image-wrapper2 {
  width: 100px;
  border-radius: 8px;
  padding: 5px;
  transition: transform 0.3s, border-color 0.3s;
  background: transparent;
  border: 2px solid #0056b3;
  height: 145px;
}

.image-wrapper2:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper2 img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.image-label2 {
  font-size: 13px;
  margin-top: 8px;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}
</style>