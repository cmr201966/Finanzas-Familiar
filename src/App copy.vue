<script setup>
// Importamos los componentes principales de nuestra página

import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/NavBar.vue'

</script>
<template>
  <v-app>
    <v-main>
    <div class="cuerpo">
      <h1 style="position: absolute; left: 160px; font-size: 30px; top: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: darkblue;"> Finanza Familiar </h1>
    <div class="buscador">
    <input class="input"
  v-model="query"
  @keyup.enter="buscar"
  type="text"
  placeholder=""
/>
    <button class=" boton" @click="buscar">🔍</button>
  </div>
  <v-btn class="acerca" variant="text" style="position: absolute; right: 115px; top: 50px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Acercade</v-btn>
  </div>
  <div class="menu">
    <div>
    <v-btn variant="text" style="position: absolute; left: 470px; top: 2.5px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Inicio</v-btn>
    <v-btn variant="text" style="position: absolute; left: 620px; top: 2.5px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Registrarse</v-btn>
    <v-btn variant="text" style="position: absolute; left: 820px; top: 2.5px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Opciones</v-btn>
    </div>
  </div>
  <div>
    <p style="color: darkblue; position: absolute; top: 205px; left: 100px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 25px;"> "El control de tus finanzas personales<br>es el camino hacia la libertad financiera"</p>
  </div>
  <div>
    <p style="color: black; position: absolute; top: 300px; left: 100px; font-size: 18px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Opciones</p>
    <div class="ingresos"></div>
    <div class="Gastos"></div>
    <div class="Presupuestos"></div>
    <div class="Ahorro"></div>
    <div class="Historial"></div>
    <div class="Reportes"></div>
  </div>
  <div>
    <p style="color: black; position: absolute; top: 440px; left: 100px; font-size: 18px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Descubre mas</p>
    <div class="cuatro"></div>
  </div>
    </v-main>
  </v-app>
</template>

<style>
.v-main{
  background-color: rgba(0, 255, 0, 0.425) !important
}
.cuerpo{
  border-bottom: 8px solid rgb(207, 207, 207);
  border-top: 8px solid rgb(207, 207, 207);
  background-color: rgb(255, 255, 255);
  width: 1350px;
  position: absolute; left: 0; top: 51px;
  height: 550px;
  overflow: auto;
}
.buscador{
  margin-left: 600px;

  margin-top: 18px;
}
.input{
  width: 325px;
  border: 2px solid black;
  margin-left: -40px;
  padding: 8px;
  border-radius: 50px;
  margin-top: 10px;
}
.boton{
  margin-left: -40px;
  padding: 0.2em 0.2em;
  background-color: white;
}
.menu{
  width: 1350px;
  padding: 20px;
  position: absolute; top: 150px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
.ingresos{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 125px;
}
.Gastos{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 280px;
}
.Presupuestos{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 435px;
}
.Ahorro{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 590px;
}
.Historial{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 745px;
}
.Reportes{
  border: 2px solid black;
  width: 135px;
  height: 115px;
  position: absolute; top: 326px; left: 900px;
}
.cuatro{
  border: 2px solid black;
  width: 910px;
  height: 115px;
  position: absolute; top: 465px; left: 125px;
}
</style>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
