<template>
      <p class="frase">"El control de tus finanzas personales<br>es el camino hacia la libertad financiera"</p>
      <p class="entradas">Entradas</p>
      <p class="salidas">Salidas</p>
</template>

<style>
body{
  background-color: white;
}
.frase{
  color: darkblue; 
  position: absolute; top: 140px; left: 150px;
  font-family: 'Italic'; 
  font-size: 25px;
}
.entradas{
  color: rgb(0, 0, 0);
  position: absolute; top: 225px; left: 200px;
  font-family: 'Italic';
  font-size: 18px;
}
.salidas{
  color: rgb(0, 0, 0);
  position: absolute; top: 400px; left: 200px;
  font-family: 'Italic';
  font-size: 18px;
}
</style>

<script>
export default{
  name: 'Header'
}
</script>
