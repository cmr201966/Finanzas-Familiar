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
  width: 33.7vw;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 28.5vh; /* 15% de la altura de la ventana */
  left: 50vw; /* 50% del ancho de la ventana */
  border: 2px solid #0056b3;
  box-sizing: border-box;
  background-color: white;
  height: auto;
  transition: width 0.3s ease, left 0.3s ease, top 0.3s ease;
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
  padding: 10px;
  cursor: pointer;
  text-align: center;
  width: 100px;            /* ancho fijo para mantener proporción */
  margin-right: 20px;
}

.carousel-item3 img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s;
}

.carousel-item3:hover img {
  transform: scale(1.05);
}

.image-wrapper3 {
  width: 100px;
  height: 135px;
  border-radius: 8px;
  padding: 5px;
  background: transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-sizing: border-box;
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

/* Media queries para adaptarlo sin perder posición */

/* Pantallas medianas (tablets, etc) */
@media (max-width: 1024px) {
  .carousel-container3 {
    width: 33.7vw;           /* tamaño proporcional más pequeño */
    top: 160px;             /* posición ajustada */
  left: 50vw; /* 50% del ancho de la ventana */
  }
  
  .carousel-item3 {
    width: 80px;
    margin-right: 15px;
    padding: 7px;
  }

  .image-wrapper3 {
    width: 80px;
    height: 110px;
    padding: 4px;
  }

  .image-wrapper3 img {
    width: 65px;
  }

  .image-label3 {
    font-size: 11px;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container3 {
    width: 43vw;
    top: 115px;
    left: 70%;
    transform: translateX(-50%);
    position: fixed; /* para que quede visible y centrado */
    height: 20vw;
  }

  .carousel-item3 {
    width: 30px;
    margin-right: 10px;
    padding: 5px;
  }

  .image-wrapper3 {
    width: 30px;
    height: 95px;
    padding: 3px;
    margin-top: 10vw;
  }

  .image-wrapper3 img {
    width: 7vw;
  }

  .image-label3 {
    font-size: 7px;
  }
}

</style>