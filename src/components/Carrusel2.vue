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
import { useRouter } from 'vue-router'

import Resumen_General from '../assets/img/tarjetas/resumen gral.png'
import Vista_Trasnferencias from '../assets/img/tarjetas/transf.png'
import Cuentas from '../assets/img/tarjetas/cuentas.png'
//import Vista_Transacciones from '../assets/img/Vista_Transacciones.jpg'
import Categorias from '../assets/img/tarjetas/CatIngresosgGastos.png'
import Anual from '../assets/img/tarjetas/reportes.png'
import Presupuesto from '../assets/img/tarjetas/presupuesto.png'

const router = useRouter()
const { t } = useI18n()

const images = ref([
  { src: Resumen_General, alt: 'home.resumenGeneral', name: 'resumen' },
  { src: Vista_Trasnferencias, alt: 'home.transferencias', name: 'transferencias' },
  { src: Cuentas, alt: 'home.cuentas', name: 'cuentas' },
  { src: Presupuesto, alt: 'home.presupuesto', name: 'presupuesto' },
  { src: Anual, alt: 'home.informeAnual', name: 'informeAnual' },
  { src: Categorias, alt: 'home.categorias', name: 'categorias' }
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
  switch (image.name) {
    case 'resumen':
      router.push('/resumen')
      break
    case 'transferencias':
      router.push('/transferencias')
      break
    case 'cuentas':
      router.push('/cuentas')
      break
    case 'presupuesto':
      router.push('/presupuesto')
      break
    case 'informeAnual':
      router.push('/informe-anual')
      break
    case 'categorias':
      router.push('/categorias')
      break
    default:
      alert(`Navegación no implementada para: ${t(image.alt)}`)
  }
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
  height: 30%;

  box-sizing: border-box;
  background-color: transparent;
  transition: width 0.3s ease, left 0.3s ease, top 0.3s ease;
}

.carousel-track2 {
  overflow: hidden;
  width: 100%;
}

.carousel-slide2 {
  display: flex;
  transition: transform 0.5s ease;
  background-color: transparent;
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
  width: 10%;  /* ancho fijo para consistencia */
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
  background: rgb(255, 255, 255);
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.image-wrapper2:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);
}

.image-wrapper2 img {
  width: 5vw;
  height: auto;
  border-radius: 1vw;
}

.image-label2 {
  font-size: 75%;
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