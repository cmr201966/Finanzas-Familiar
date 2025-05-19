<template>
 <img class="logo-cuentas" src="../assets/img/logo cuentas.jpeg">
 <h1 class="titulo-logo">Finanza Familiar</h1>
 <div class="fondo">
<p class="crear">Crear cuenta bancaria</p>
<p class="barra-baja">____________________________________________________________</p>
<p class="nombre">Nombre de cuenta:</p>
<p class="banco">Banco:</p>
<p class="tipo-cuenta">Tipo de cuenta: </p>
<p class="fecha-apertura">Fecha de apertura:</p>
<p class="saldo">Saldo inicial:</p>
<p class="cuenta-principal">Cuenta principal:</p>
<p class="barra-baja2">____________________________________________________________ </p>
 </div>
</template>

<style>
.logo-cuentas{
  position: absolute; top: 25%; margin-left: -40%;
  width: 17.5%;
  height: 35%;
}
.titulo-logo{
    position: absolute; top: 60%; margin-left: -40%; 
    color: black;
    font-family: 'Popins', arial, sans-serif;
    font-size: 2.5vw;
}
.fondo{
    background: linear-gradient(#79bef7, #13ac18 );
    width: 38%;
    height: 70%;
    position: absolute; top: 19%; margin-left: -10%;
    border-radius: 1%;
}
.crear{
margin-top: 4%;
font-family: 'Popins', arial, sans-serif;
}
.barra-baja{
    margin-top: 2%;
}
.nombre{
    margin-left: -56%;
    margin-top: 3%;
}
.banco{
    margin-left: -75%;
    margin-top: 3%;
}
.tipo-cuenta{
    margin-left: -61.5%;
    margin-top: 3%;
}
.fecha-apertura{
    margin-left: -56%;
    margin-top: 3%;
}
.saldo{
    margin-left: -65%;
    margin-top: 3%;
}
.cuenta-principal{
    margin-left: -58%;
    margin-top: 3%;
}
</style>

<script>
export default{
  name: 'Cuentasmenu'
}
</script>