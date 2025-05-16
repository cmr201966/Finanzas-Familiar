<template>
  <div>
    <p class="frase">"Planificar tus finanzas es el camino hacia la libertad financiera"</p>
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
  position: absolute; top: 100px; left: 80px;
  font-family: 'Popins', arial, sans-serif; 
  font-size: 20px;
}
.entradas {
  color: rgb(0, 0, 0);
  position: absolute; top: 140px; left: 100px;
  font-family: 'Italic';
  font-size: 15px;
}
.entradas2 {
  color: rgb(0, 0, 0);
  position: absolute; top: 140px; left: 550px;
  font-family: 'Italic';
  font-size: 15px;
}
.salidas {
  color: rgb(0, 0, 0);
  position: absolute; top: 330px; left: 100px;
  font-family: 'Italic';
  font-size: 18px;
}
.presupuesto {
  position: absolute;
  top: 80px;
  left: 950px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
}

.presupuesto:hover {
  transform: scale(0.8);
}
.imagen-presupuesto {
  width: 60px;
  height: 60px;
}

.label-presupuesto {
  display: block;
  margin-top: -5px;
  font-family: 'Italic';
  font-size: 15px;
  color: black;
}
</style>

<script>
const handleClick = (image) => {
  if (image.alt === 'Presupuesto') {
    router.push('/Presupuesto')
  } else {
    alert(`Navegación no implementada para: ${image.alt}`)
  }
}
export default {
  name: 'Header',
  methods: {
    irAPresupuesto() {
      this.$router.push('/presupuesto') // Asegúrate de tener una ruta definida para '/presupuesto'
    }
  }
}
</script>
