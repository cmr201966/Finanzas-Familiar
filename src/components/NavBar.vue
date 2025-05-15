<template>
    <v-app>
    <div class="Barra">
        <div class="logo-titulo">
            <img class="logo" src="../assets/img/Logo/logo.jpg" />
            <h1 class="titulo">Finanza Familiar</h1>
             <div class="buscador">
            <input type="text" placeholder="Buscar" class="input" v-model="query"  @keyup.enter="buscar"    />
            <button class="boton" @click="buscar">🔍</button>
        </div>
        </div>

        <v-btn class="acerca" variant="text" style="position: absolute; right: 115px; top: 40px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Acercade</v-btn>
    </div>
    <div class="menu">
         <div class="d-flex align-center justify-center" style="height: 100%">
            <v-btn class="mx-2"variant="text" style=" color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Inicio</v-btn>
            <v-btn class="mx-2" variant="text" style=" color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Registrarse</v-btn>
            <v-btn class="mx-2" variant="text" style=" color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Opciones</v-btn>
        </div>
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
        color: darkblue;
        font-size: 20px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .Barra{
        background-color: rgb(70, 226, 122);
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
        margin-left: 50px;
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
  margin-left: -40px;
  padding: 8px;
  border-radius: 50px;
}

    .boton{
        margin-left: -40px;
        padding: 0.2em 0.2em;
        background-color: transparent;
    }

    .menu{
        position: fixed;
        top: 80px;
        left: 0;
        background-color: rgb(0, 180, 60);
        width: 100vw;
        padding: px;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
         z-index: 999; /* También agregado */
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

</script>