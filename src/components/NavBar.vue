<template>
    <div class="Barra">
        <div class="logo-titulo">
            <img class="logo" src="../assets/img/Logo/logo.jpg" />
            <h1 class="titulo">Finanza Familiar</h1>
        </div>

        <div class="buscador">
            <input type="text" placeholder="Buscar" class="input" v-model="query"  @keyup.enter="buscar"    />
            <button class="boton" @click="buscar">🔍</button>
        </div>

        <v-btn class="acerca" variant="text" style="position: absolute; right: 115px; top: 40px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Acercade</v-btn>
    </div>
    <div class="menu">
        <div>
            <v-btn class="btn-inicio">Inicio</v-btn>
            <v-btn variant="text" style="position: absolute; left: 750px; top: 2.5px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Registrarse</v-btn>
            <v-btn variant="text" style="position: absolute; left: 970px; top: 2.5px; color: darkblue; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Opciones</v-btn>
        </div>
    </div>
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
    }

    .logo {
        border-radius: 100%;
        width: 45px;
        height: 40px;
        margin-left: 50px;
        margin-top: 8px;
    }

    .buscador{
        display: flex;
        align-items: center;
        margin-left: 600px;
        position: absolute; top: 20px;
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
        padding: 20px;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
    }
    .
</style>

<script>
export default{
name: 'Navbar'
}
</script>