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
import Cuentas from '../assets/img/cuenta.png'

const router = useRouter()

const images = ref([
  { src: categoria_ingreso, alt: 'Categoria ingreso', id: 1 },
  { src: categoria_gasto, alt: 'Categoria gasto', id: 2 },
  { src: Cuentas, alt: 'Cuentas', id: 3 },
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
  width: 31.1vw;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 165px;                /* posición original */
  left: 100px;               /* posición original */
  border: 2px solid #0056b3;
  box-sizing: border-box;
  background-color: white;
  height: auto;
  transition: width 0.3s ease, left 0.3s ease, top 0.3s ease;
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
  flex: 0 0 auto;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  width: 100px;            /* ancho fijo para mantener proporción */
  margin-right: 20px;
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s;
}

.carousel-item:hover img {
  transform: scale(1.05);
}

.image-wrapper {
  width: 100px;
  height: 135px;
  border-radius: 8px;
  padding: 5px;
  background: transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
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

/* Media queries para adaptarlo sin perder posición */

/* Pantallas medianas (tablets, etc) */
@media (max-width: 1024px) {
  .carousel-container {
    width: 31.1vw;           /* tamaño proporcional más pequeño */
    top: 160px;             /* posición ajustada */
    left: 60px;
  }
  
  .carousel-item {
    width: 80px;
    margin-right: 15px;
    padding: 7px;
  }

  .image-wrapper {
    width: 80px;
    height: 110px;
    padding: 4px;
  }

  .image-wrapper img {
    width: 65px;
  }

  .image-label {
    font-size: 11px;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container {
    width: 36vw;
    top: 115px;
    left: 25%;
    transform: translateX(-50%);
    position: fixed; /* para que quede visible y centrado */
    height: 20vw;
  }

  .carousel-item {
    width: 30px;
    margin-right: 10px;
    padding: 5px;
  }

  .image-wrapper {
    width: 30px;
    height: 95px;
    padding: 3px;
    margin-top: 10vw;
  }

  .image-wrapper img {
    width: 7vw;
  }

  .image-label {
    font-size: 7px;
  }
}

</style>