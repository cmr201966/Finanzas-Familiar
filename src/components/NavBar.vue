<template>
<header class="header">
    <div class="encabezado">

    <!-- Logo redondo -->
        <div class="circulo-logo">
            <img :src="logoUrl" alt="Logo de M2G" />
        </div>
        <h4>Finanza Familiar</h4>
    </div>

    <!-- Menú de navegación -->
    <nav class="nav-container">

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
        <p style="color: darkblue; position: absolute; top: 205px; left: 100px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 25px;"> "El control de tus finanzas personales<br>es el camino hacia la libertad financiera"</p>
    </div>
</header>
</template>

<script setup>
    import logoUrl from '@/assets/img/logo/finfam.jpg'
</script>
