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
  width: 31.1%;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 28.5%;                /* posición original */
  left: 9%;               /* posición original */
  border: 2px solid #0056b3;
  box-sizing: border-box;
  background-color: white;
  height: 27%;
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
  padding: 3%;
  cursor: pointer;
  text-align: center;
  width: 10%;            /* ancho fijo para mantener proporción */
  margin-right: 25%;
}

.carousel-item img {
  width: 100%;
  border-radius: 1%;
  transition: transform 0.2s;
}

.carousel-item:hover img {
  transform: scale(1.05);
}

.image-wrapper {
  width: 8%;
  height: 23%;
  border-radius: 1%;
  background: transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.image-wrapper:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper img {
  width: 7000%;
  height: auto;
  border-radius: 1%;
}

.image-label {
  font-size: 1.2vw;
  margin-top: 1%;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Media queries para adaptarlo sin perder posición */

/* Pantallas medianas (tablets, etc) */
@media (max-width: 1024px) {
  .carousel-container {
    width: 31.1%;           /* tamaño proporcional más pequeño */
    top: 27.8%;             /* posición ajustada */
    left: 9.5%;
  }
  
  .carousel-item {
    width: 30%;
    margin-right: 5%;
  }

  .image-wrapper {
    width: 80%;
    height: auto;
  }

  .image-wrapper img {
    width: 125%;
  }

  .image-label {
    font-size: 80%;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container {
    width: 36%;
    top: 27%;
    left: 25%;
    transform: translateX(-50%);
    position: fixed; /* para que quede visible y centrado */
    height: 16.5%;
  }

  .carousel-item {
    width: 24%;
    margin-right: 8%;

  }

  .image-wrapper {
    width: 5%;
    height: auto;
    margin-top: 2%;
  }

  .image-wrapper img {
    width: 7000%;
  }

  .image-label {
    font-size: 45%;
  }
}

</style>