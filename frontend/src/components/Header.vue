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

      <!-- Input de búsqueda -->

      <div class="input-container">
        <input type="text" placeholder="Buscar productos" class="posicion-Input" />
      </div>

      <!-- Enlaces del menú -->
      <div class="nav-izquierda">
        <a href="#">Inicio</a>
        <a href="#">Inicio de sesión</a>
        <a href="#">Registrarse</a>

            <!-- Menú desplegable -->
            <div class="dropdown">
              <a href="#" class="dropbtn">Opciones</a>

            <div class="dropdown-content">
                <a href="#">Ingresos</a>
                <a href="#">Gastos</a>
                <a href="#">Presupuestos</a>
                <a href="#">Ahorros y metas</a>
                <a href="#">Historial</a>
                <a href="#">Reportess</a>
            </div>
            </div>
            <div class="acercade">
                <router-link to="/acercade">Acerca de</router-link>
            </div>
    </div>
    </nav>
</header>
</template>

<script setup>
import logoUrl from '@/assets/img/logo/finfam.jpg'
import '@/assets/css/header.css'
</script>
