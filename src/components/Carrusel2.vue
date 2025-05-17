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
import Vista_Trasnferencias from '../assets/img/transferencia.jpeg'
import Cuentas from '../assets/img/cuenta.png'
import Vista_Transacciones from '../assets/img/Vista_Transacciones.jpg'
import Categorias from '../assets/img/categorias.jpg'
import Anual from '../assets/img/Anual.jpg'
import Presupuesto from '../assets/img/Presupuesto (2).jpg'
import { ref } from 'vue'

const images = ref([
  { src: Resumen_General, alt: 'Resumen General', id: 1 },
  { src: Vista_Trasnferencias, alt: 'Vista Trasnferencias', id: 2 },
  { src: Cuentas, alt: 'Cuentas', id: 3 },
  { src: Presupuesto, alt: 'Presupuesto', id: 4 },
  { src: Anual, alt: 'Informe Mensual/Anual', id: 5 },
  { src: Categorias, alt: 'Categorias', id: 6 },
  //{ src: Vista_Categorias, alt: 'Vista Categorias', id: 6 },
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
  width: 74.4vw;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 61vh;                /* posición original */
  left: 9%;               /* posición original */
  border: 2px solid #0056b3;
  color: white;
  box-sizing: border-box;
  background-color: white;
  transition: width 0.3s ease, left 0.3s ease, top 0.3s ease;
}

.carousel-track2 {
  overflow: hidden;
  width: 100%;
}

.carousel-slide2 {
  display: flex;
  transition: transform 0.5s ease;
}
.nav-button2 {
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  font-size: 2vw;
  cursor: pointer;
  transition: color 0.3s ease;
}
.carousel-item2 {
  flex: 0 0 auto;
  cursor: pointer;
  text-align: center;
  margin-right: 2.5vw;
  width: 100px;  /* ancho fijo para consistencia */
}

.carousel-item2 img {
  width: 100%;
  border-radius: 1vw;
  transition: transform 0.2s;
}

.carousel-item2:hover img {
  transform: scale(1.05);
}

.image-wrapper2 {
  margin-top: 3vh;
  width: 8vw;
  height: 25vh;
  border-radius: 1vw;
  background: transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.image-wrapper2:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper2 img {
  width: 7vw;
  height: auto;
  border-radius: 1vw;
}

.image-label2 {
  font-size: 1.2vw;
  margin-top: 1vh;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Media queries para adaptar sin perder posición */

/* Pantallas medianas */
@media (max-width: 1024px) {
  .carousel-container2 {
    width: 73.9vw;            /* ancho relativo */
    max-width: 78vw;
    top: 61vh;             /* ajustado */
    left: 9.5%;             /* ajustado */
  }

  .carousel-item2 {
    width: 8.5vw;
    margin-right: 2.2vw;
  }

  .image-wrapper2 {
    width: 8.5vw;
    height: auto;
  }

  .image-wrapper2 img {
    width: 7vw;
    height: auto;
  }

  .image-label2 {
    font-size: 1.2vw;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container2 {
    width: 85vw;
    max-width: 90vw;
    top: 59vh; 
    left: 49.5%;
    transform: translateX(-50%);
    position: fixed; /* centrado fijo */
    height: 23vw;
  }

  .carousel-item2 {
   width: 11vw;
  margin-right: 3.5vw;
  }

  .image-wrapper2 {
    width: 5vw;
    height: 15vh;
    margin-top: 2vw;
  }

  .image-wrapper2 img {
    width: 7vw;
    height: 7vw;
  }

  .image-label2 {
    font-size: 2vw;
    margin-right: 2vw;
  }
}
</style>