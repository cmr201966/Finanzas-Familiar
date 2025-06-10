<template>
    <router-view></router-view>
</template>

<style>

body {
  background-color: rgb(184, 209, 236) !important; /* Cambia el color aquí */
  margin:0;
}
</style>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>