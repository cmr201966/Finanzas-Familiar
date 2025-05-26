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
            <img :src="image.src" :alt="t(image.alt)" />
            <p class="image-label2">{{ t(image.alt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <button @click="moveSlide(1)" class="nav-button2">❯</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Resumen_General from '../assets/img/tarjetas/resumen gral.png'
import Vista_Trasnferencias from '../assets/img/tarjetas/transf.png'
import Cuentas from '../assets/img/tarjetas/cuentas.png'
//import Vista_Transacciones from '../assets/img/Vista_Transacciones.jpg'
import Categorias from '../assets/img/tarjetas/CatIngresosgGastos.png'
import Anual from '../assets/img/tarjetas/reportes.png'
import Presupuesto from '../assets/img/tarjetas/presupuesto.png'

const { t } = useI18n()

const images = ref([
  { src: Resumen_General, alt: 'home.resumenGeneral', id: 1 },
  { src: Vista_Trasnferencias, alt: 'home.transferencias', id: 2 },
  { src: Cuentas, alt: 'home.cuentas', id: 3 },
  { src: Presupuesto, alt: 'home.presupuesto', id: 4 },
  { src: Anual, alt: 'home.informeAnual', id: 5 },
  { src: Categorias, alt: 'home.categorias', id: 6 }
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
  alert(`Seleccionaste: ${t(image.alt)} (ID: ${image.id})`)
}
</script>

<style>
.carousel-container2 {
  display: flex;
  align-items: center;
  width: 84%;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 48.1%;                /* posición original */
  left: 5%;               /* posición original */

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
  margin-left: 2%;
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
  width: 3vw;
  height: auto;
  border-radius: 1vw;
}

.image-label2 {
  font-size: 60%;
  margin-top: 1vh;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Media queries para adaptar sin perder posición */

/* Pantallas medianas */
@media (max-width: 1024px) {
  .carousel-container2 {
    width: 85.5%;            /* ancho relativo */
    max-width: 90%;
    top: 50vh;             /* ajustado */
    left:4%;             /* ajustado */
  }

  .carousel-item2 {
    width: 8vw;
    margin-right: 3vw;
  }

  .image-wrapper2 {
    width: 8.5vw;
    height: auto;
  }

  .image-wrapper2 img {
    width: 3vw;
    height: auto;
  }

  .image-label2 {
    font-size: 50%;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container2 {
    width: 90%;
    max-width: 90%;
    top: 45%;
    left: 46.5%;
    transform: translateX(-50%);
    position: fixed; /* centrado fijo */
    height: 23%;
  }

  .carousel-item2 {
   width: 30%;
   margin-right: -15%;
  }

  .image-wrapper2 {
    width: 50%;
    height: 100%;
    margin-top: 2%;
  }

  .image-wrapper2 img {
    width: 60%;
  }

  .image-label2 {
    font-size: 20%;
    margin-right: 2%;
  }
}
</style>