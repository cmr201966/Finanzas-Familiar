<template>
        <div class="menu">
         <div class="d-flex align-center justify-center" style="height: 100%">
            <v-btn  variant="text" style=" color: darkblue; font-family:'Italic'">Inicio</v-btn>
            <v-btn  variant="text" style=" color: darkblue; font-family: 'Italic'">Registrarse</v-btn>
            <v-btn  variant="text" style=" color: darkblue; font-family: 'Italic'">Opciones</v-btn>
        </div>
    </div>
</template>

<style>
.menu{
        position: fixed;
        top: 80px;
        left: 0;
        background-color: rgb(0, 180, 60);
        width: 100vw;
        padding: px;
        border-top: 1.5px solid black;
        border-bottom: 1.5px solid black;
         z-index: 999; /* También agregado */
    }
</style>

<script>
//<router-link to="/Cuentas" class="text-blue-600">Crear nueva cuenta</router-link>
</script>