<template>
  <v-app>
    <div class="Barra">
      <div class="logo-titulo">
        <img class="logo" src="../assets/img/Logo/logo3.jpg" />
        <h1 class="titulo">{{$t('home.titulo')}}</h1>

        <!-- Aquí agregamos el menú -->
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn class="usuario" icon v-bind="props">
              <v-icon color="black">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="opcion1">
              <v-list-item-title>Nombre del usuario</v-list-item-title>
            </v-list-item>
            <v-list-item @click="opcion2">
              <v-list-item-title>Cambiar contraseña</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn class="puntitos-3" icon v-bind="props">
              <v-icon color="black">mdi-currency-usd</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="opcion7">
              <v-list-item-title>Dinero</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn class="puntitos-3" icon v-bind="props">
              <v-icon color="black">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="opcion3">
              <v-list-item-title>Categorias</v-list-item-title>
            </v-list-item>
            <v-list-item @click="opcion4">
              <v-list-item-title>Cuentas</v-list-item-title>
            </v-list-item>
            <v-list-item @click="opcion5">
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item>
            <v-list-item @click="opcion6">
              <v-list-item-title>Transferencias</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn class="puntitos-3" icon v-bind="props">
              <img :src="currentFlagIcon" class="bandera"/>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="opcion11">
              <v-list-item-title>Español</v-list-item-title>
            </v-list-item>
            <v-list-item @click="opcion12">
              <v-list-item-title>Inglés</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const currentLocale = ref(locale.value)
const currentFlagIcon = ref(getFlagIcon(locale.value))

watch(currentLocale, (newLocale) => {
  locale.value = newLocale
  currentFlagIcon.value = getFlagIcon(newLocale)
})

function getFlagIcon(locale) {
  return locale === 'es' ? '/Flags/spain.png' : '/Flags/uk.png'
}

// Métodos
function opcion1() {
  alert('Nombre del usuario')
}
function opcion2() {
  alert('Contraseña')
}
function opcion3() {
  alert('Categorias')
}
function opcion4() {
  alert('Cuentas')
}
function opcion5() {
  alert('Transacciones')
}
function opcion6() {
  alert('Transferencias')
}
function opcion7() {
  alert('Transferencias')
}
function opcion8() {
  alert('Transferencias')
}
function opcion9() {
  alert('Transferencias')
}
function opcion10() {
  alert('Transferencias')
}
function opcion11() {
  currentLocale.value = 'es'
}
function opcion12() {
  currentLocale.value = 'en'
}
function opcion13() {
  alert('Transferencias')
}
function opcion14() {
  alert('Transferencias')
}
</script>

<style scoped>
.usuario{
  width: 3vw !important;
  height: 3vw !important;
  margin-bottom: 1vw;
  margin-right: 2vw;
  color: white;
  margin-left: auto;
}
.bandera{
  width: 35px; height: 35px
}
.puntitos-3 {
  width: 3vw !important;
  height: 3vw !important;
  margin-bottom: 1vw;
  margin-right: 2vw;
  color: white;
}
.logo-titulo {
  display: flex;
  align-items: center;
  margin-left: 5vw;
  margin-top: 1vh;
}

.titulo {
  color: white;
  font-size: 2.5vw;
  font-family: 'Italic';
  margin-left: 1vw;
  margin-bottom: 1vw;
}

.Barra {
  background-color: rgb(12, 155, 80);
  width: 100%;
  height: 8%;
  position: fixed;
  top: 0vw;
  left: 0vw;
  z-index: 1000;
}

.logo {
  border-radius: 100%;
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
  margin-bottom: 1vw;
}

/* ADAPTACIÓN RESPONSIVA SIN MOVER ELEMENTOS */
@media (max-width: 720px) {
  .logo {
    border-radius: 100%;
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
  margin-bottom: 1vw;
  }

  .titulo {
     color: white;
  font-size: 2.5vw;
  font-family: 'Italic';
  margin-left: 1vw;
  margin-bottom: 1vw;
  }

  .puntitos-3 {
  width: 3vw !important;
  height: 3vw !important;
  margin-bottom: 1vw;
  margin-right: 2vw;
  color: white;
  }
}
.bandera{
  width: 30px; height: 30px
}
@media (max-width: 480px) {
  .logo {
    width: 8vw;
    height: 8vw;
  }
.bandera{
  width: 20px; height: 20px
}
  .titulo {
    font-size: 5vw;
  }

  .usuario,
  .puntitos-3,
  .puntitos-2 {
    width: 7vw !important;
    height: 7vw !important;
  }
  .Barra{
    background-color: rgb(12, 155, 80);
  width: 100%;
  height: auto;
  position: fixed;
  top: 0vw;
  left: 0vw;
  z-index: 1000;
  }
}
</style>