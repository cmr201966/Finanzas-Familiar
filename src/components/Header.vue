<template>
  <div>
    <p class="frase">"{{$t('home.frase')}}"</p>
    <p class="salidas">{{$t('home.salidas')}}</p>
    <p class="notificacionesh">{{$t('home.notificacionesh')}}</p>

  </div>
</template>

<style>
body {
  background-color: white;
}

.frase {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 10%; /* 10% de la altura de la ventana */
  left: 10%; /* 8% del ancho de la ventana */
  font-family: sans-serif;
  font-size: 2vw; /* Tamaño relativo al ancho de la ventana */
  font-weight: bold;
  
} 

.salidas {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 40%; /* 30% de la altura de la ventana */
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 100%; /* Tamaño relativo al ancho de la ventana */
}
.notificacionesh{
  color: rgb(0, 0, 0);
  position: absolute;
  top: 75%; /* 30% de la altura de la ventana */
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 100%; /* Tamaño relativo al ancho de la ventana */
}

@media (max-width: 1024px) {
.frase {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 10%; /* 10% de la altura de la ventana */
  left: 10%; /* 8% del ancho de la ventana */
  font-family:sans-serif;
  font-size: 2.5vw; /* Tamaño relativo al ancho de la ventana */
  font-weight: bold;
}

.salidas {
  color: rgb(0, 0, 0);
  position: absolute;
  top: 45%; /* 30% de la altura de la ventana */
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
}
.notificacionesh{
  color: rgb(0, 0, 0);
  position: absolute;
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 1.5vw; /* Tamaño relativo al ancho de la ventana */
}
} 
@media (max-width: 480px) {
.frase {
  color: rgb(0, 0, 0);
  position: fixed; /* centrado fijo */
  top: 10%; /* 10% de la altura de la ventana */
  left: 10%; /* 8% del ancho de la ventana */
  font-family: 'Popins';
  font-size: 3.2vw; /* Tamaño relativo al ancho de la ventana */
  font-weight: bold;
}

.salidas {
  color: rgb(0, 0, 0);
   position: fixed; /* centrado fijo */
  top: 40%; /* 30% de la altura de la ventana */
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 3vw; /* Tamaño relativo al ancho de la ventana */
}
.notificacionesh{
  color: rgb(0, 0, 0);
  position: fixed; /* centrado fijo */
  top: 70%; /* 30% de la altura de la ventana */
  left: 10%; /* 10% del ancho de la ventana */
  font-family: 'Italic';
  font-size: 3vw; /* Tamaño relativo al ancho de la ventana */
}
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
};

</script>