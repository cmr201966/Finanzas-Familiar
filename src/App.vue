<template>
  <div>
    <router-view></router-view>
  </div>

  <div style="margin: 10px;">
    <button @click="$i18n.locale = 'es'">🇪🇸 Español</button>
    <button @click="$i18n.locale = 'en'">🇺🇸 English</button>
  </div>
</template>

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