<template>
<div class="fondo">
 <h class="titulo-categoria">Categorias de ingresos y gastos</h>
</div>


</template>

<script>
export default {
  name: 'Categorias'
}
</script>

<style>
.fondo {
  background: linear-gradient(#79bef7, #13ac18);
  width: 38%;
  min-height: 70%;
  position: absolute;
  top: 10%;
  left: 32%;
  border-radius: 1%;
  border: 2px solid black;
  padding-bottom: 2vw; /* Añade espacio inferior para la lista */
  overflow-y: auto; /* Habilita scroll si se excede mucho */
}
.titulo-categoria{
    font-family: Arial, sans-serif;
    font-size: 1.7vw;
    font-weight: bold;
    position: absolute; top: 15%; left: 22%;
}
</style>