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
            <img :src="image.src" :alt="t(image.alt)" />
            <p class="image-label">{{ t(image.alt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import CatIngresosgGastos from '../assets/img/tarjetas/CatIngresosgGastos.png'
import presupuesto from '../assets/img/tarjetas/presupuesto.png'
import Cuentas from '../assets/img/tarjetas/cuentas.png'
import Bancos from '../assets/img/tarjetas/banco.png'
import TipoCuenta from '../assets/img/tarjetas/TCB.png'
import ingresos from '../assets/img/tarjetas/ingresos.png'
import gastos from '../assets/img/tarjetas/Gastos.png'
import transferencia from '../assets/img/tarjetas/transf.png'

const router = useRouter()
const { t } = useI18n()

const images = ref([
 { src: CatIngresosgGastos, alt: 'home.catIngresosGastos', name: 'categorias' },
  { src: Cuentas, alt: 'home.cuentas', name: 'cuentas' },
  { src: Bancos, alt: 'home.Bancos', name: 'Bancos' },
  { src: TipoCuenta, alt: 'home.TipoCuenta', name: 'TipoCuenta' },
  { src: presupuesto, alt: 'home.presupuesto', name: 'presupuesto' },
  { src: ingresos, alt: 'home.ingresos', name: 'ingresos' },
  { src: gastos, alt: 'home.gastos', name: 'gastos' },
  { src: transferencia, alt: 'home.transferencias', name: 'transferencias' }
])

const handleClick = (image) => {
  switch (image.name) {
    case 'categorias':
      router.push('/Categorias')
      break;
    case 'cuentas':
      router.push('/Cuentas')
      break;
    case 'Bancos':
      router.push('/categoriaBanco')
      break;
    case 'TipoCuenta':
      router.push('/categoriaTipoCuentas')
      break;
    case 'presupuesto':
      router.push('/presupuesto')
      break;
    case 'ingresos':
      router.push('/Ingresos')
      break;
    case 'gastos':
      router.push('/Gastos')
      break;
    case 'transferencias':
      router.push('/transferencias')
      break;
    default:
      alert(`Navegación no implementada para: ${t(image.alt)}`)
  }


}
</script>

<style>
.carousel-container {
  display: flex;
  align-items: center;
  width: 75.1%;              /* tamaño original */
  overflow: hidden;
  position: absolute;
  top: 20.5%;                /* posición original */
  left: 9%;               /* posición original */
  box-sizing: border-box;
  background-color: white;
  height: 20%;
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
  margin-right: 1.5%;
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
  width: 7vw;
  height: 9vw;
  border-radius: 10%;
  border: 2px solid #0056b3;
  background: transparent;
  transition: transform 0.3s, border-color 0.3s;
}

.image-wrapper:hover {
  transform: scale(0.8);
  border-color: rgb(70, 226, 122);

}

.image-wrapper img {
  width: 5vw;
 /* width: 3vw;*/
  height: auto;
  border-radius: 5%;
  }

.image-label {
  font-size: 0.7vw;
  margin-top: 1%;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Media queries para adaptarlo sin perder posición */

/* Pantallas medianas (tablets, etc) */
@media (max-width: 1024px) {
  .carousel-container {
    width: 75.1%;           /* tamaño proporcional más pequeño */
    top: 20.8%;             /* posición ajustada */
    left: 9.5%;
    height: 25%;
  }

  .carousel-item {
    width: 30%;
    margin-right: -10%;
  }

  .image-wrapper {
    width: 9vw;
    height: 100%;
  }

  .image-wrapper img {
    width: 3vw;

  }

  .image-label {
    font-size: 50%;
  }
}

/* Pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .carousel-container {
    width: 80.1%;
    top: 20%;
    left: 48%;
    transform: translateX(-50%);
    position: fixed; /* para que quede visible y centrado */
    height: 16.5%;
  }

  .carousel-item {
    width: 30%;
    margin-right: -15%;

  }

  .image-wrapper {
    width: 50%;
    height: 100%;
    margin-top: 2%;
  }

  .image-wrapper img {
    width: 100%;
  }

  .image-label {
    font-size: 20%;
  }
}

</style>