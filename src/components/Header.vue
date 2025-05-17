<template>
  <div>
    <p class="frase">"Alcanza tu libertad financiera. Empieza ahora"</p>
    <p class="entradas">Catálogos</p>
    <p class="entradas2">Operaciones</p>
    <p class="salidas">Informes</p>

    <div class="presupuesto">
      <img src="../assets/presupuesto.png" alt="Presupuesto" class="imagen-presupuesto" />
      <label class="label-presupuesto">Presupuesto</label>
    </div>
  </div>
</template>

<style>
body {
  background-color: white;
}

.frase {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 15vh; /* 10% de la altura de la ventana */
  left: 10vw; /* 8% del ancho de la ventana */
  font-family: 'Popins', arial, sans-serif;
  font-size: 2vw; /* Tamaño relativo al ancho de la ventana */
}

.entradas {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 23vh; /* 15% de la altura de la ventana */
  left: 10vw; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
}

.entradas2 {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 23vh; /* 15% de la altura de la ventana */
  left: 50vw; /* 50% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
}

.salidas {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 56vh; /* 30% de la altura de la ventana */
  left: 10vw; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
}

.presupuesto {
  position: absolute;
  top: 12vh; /* 12% de la altura de la ventana */
  left: 76.5vw; /* 80% del ancho de la ventana */
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
}

.presupuesto:hover {
  transform: scale(0.8);
}

.imagen-presupuesto {
  width: 5vw; /* Tamaño relativo al ancho de la ventana */
  height: 5vw; /* Tamaño relativo al ancho de la ventana */
}

.label-presupuesto {
  display: block;
  margin-top: -1vh; /* Ajuste basado en la altura de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
  color: black;
}
</style>

<script>
const handleClick = (image) => {
  if (image.alt === 'Presupuesto') {
    router.push('/Presupuesto');
  } else {
    alert(`Navegación no implementada para: ${image.alt}`);
  }
};
export default {
  name: 'Header',
  methods: {
    irAPresupuesto() {
      this.$router.push('/presupuesto'); // Asegúrate de tener una ruta definida para '/presupuesto'
    }
  }
};
</script>