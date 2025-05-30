<template>
  <footer>
    <p>{{$t('home.footer')}}</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  width: 100%;
  position: fixed;
  left: 0vw;
  bottom: 0vw;
  background-color: rgb(12, 155, 80);
  color: hsl(0, 0%, 100%);
  padding: 10px;
  margin-top: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Italic';
  z-index: 998;
  text-align: center; /* Centra el texto en el footer */
}

/* Media Query para pantallas grandes */
@media (max-width: 1024px) {
  footer {
    padding: 12px; /* Ajustar el padding para pantallas más grandes */
  }
  footer p {
    font-size: 16px; /* Tamaño de fuente ligeramente más grande */
  }
}

/* Media Query para pantallas medianas */
@media (max-width: 768px) {
  footer {
    padding: 15px; /* Aumentamos un poco el padding en dispositivos más pequeños */
  }
  footer p {
    font-size: 14px; /* Ajustamos el tamaño de fuente para ser más pequeño en dispositivos medianos */
  }
}

/* Media Query para pantallas pequeñas */
@media (max-width: 480px) {
  footer {
    padding: 20px; /* Más espacio en pantallas muy pequeñas */
  }
  footer p {
    font-size: 12px; /* Ajuste del tamaño de texto para pantallas muy pequeñas */
  }
}
</style>