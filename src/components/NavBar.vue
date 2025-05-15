<template>
    <v-app>
    <div class="Barra">
        <div class="logo-titulo">
            <img class="logo" src="../assets/img/Logo/logo.jpg" />
            <h1 class="titulo">Finanza Familiar</h1>
        </div>

        <v-btn class="acerca" variant="text" style="position: absolute; right: 115px; top: 40px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Acerca de</v-btn>
    </div>
    </v-app>
</template>


<style>
    .logo-titulo {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-left: 180px;
        margin-top: 10px;

    }

    .titulo {
        margin-top: 10px;
        color: rgb(255, 255, 255);
        font-size: 20px;
        font-family: 'Italic';
    }

    .Barra{
        background-color: rgb(12, 155, 12);
        width: 100vw;
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
         z-index: 1000; /* Agregado */
    }

    .logo {
        border-radius: 100%;
        width: 45px;
        height: 40px;
        margin-left: -25px;
        margin-top: 8px;
    }

    .buscador{
       margin: 0;
       margin-left: 50px;
       
}

    .input{
        background-color: white;
  width: 500px;
  border: 2px solid black;
  margin-left: 5px;
  padding: 8px;
  border-radius: 50px;
}

    .boton{
        margin-left: -40px;
        padding: 0.2em 0.2em;
        background-color: transparent;
    }

</style>

<script>
export default{
name: 'Navbar',
 data() {
    return {
      query: ''
    }
  }
}
 /*<div class="buscador">
            <input type="text" placeholder="Buscar" class="input" v-model="query"  @keyup.enter="buscar"    />
            <button class="boton" @click="buscar">🔍</button>
        </div>*/
</script>