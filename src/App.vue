<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
<template>
  <v-app>
    <v-main>
  <div class="cuerpo">
   <h1 style="position: absolute; left: 160px; font-size: 30px; top: 20px"> Finanza Familiar </h1>
   <div class="buscador">
    <input class="input"
  v-model="query"
  @keyup.enter="buscar"
  type="text"
  placeholder=""
/>
    <button class=" boton" @click="buscar">🔍</button>
  </div>
  <v-btn class="acerca">Acercade</v-btn>
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
  width: 1366px;
  position: absolute; left: 0; top: 0;
  height: 550px;
  overflow: auto;
}
.buscador{
  margin-left: 600px;

  margin-top: 18px;
}
.input{
  border: 2px solid black;
  margin-left: -40px;
  padding: 8px;
  border-radius: 50px;
  margin-top: 10px;
}
.boton{
  margin-left: 6px;
  padding: 0.2em 0.2em;
  background-color: white;
}
.acerca{
  
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
