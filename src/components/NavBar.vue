<template>
    <v-app>
  <div class="Barra">
    <div class="logo-titulo">
      <img class="logo" src="../assets/img/Logo/logo.jpg" />
      <h1 class="titulo">Finanza Familiar</h1>

      <!-- Aquí agregamos el menú -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn class="usuario"icon v-bind="props">
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
          <v-btn class="puntitos-3"icon v-bind="props">
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
          <v-btn class="puntitos-2"icon v-bind="props">
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
          <v-btn class="puntitos-3"icon v-bind="props">
             <img :src="currentFlagIcon" style="width: 35px; height: 35px;" />
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

<script>
export default {
  name: 'Navbar',
   data() {
    return {
      
     currentFlagIcon: '/Flags/spain.png' // bandera por defecto
    }
},
  methods: {
    opcion1() {
      alert('Nombre del usuario')
    },
    opcion2() {
      alert('Contraseña')
    },
    opcion3() {
      alert('Categorias')
    },
    opcion4() {
      alert('Cuentas')
    },
     opcion5() {
      alert('Transacciones')
    },
     opcion6() {
      alert('Tranferencias')
    },
     opcion7() {
      alert('Tranferencias')
    },
     opcion8() {
      alert('Tranferencias')
    },
     opcion9() {
      alert('Tranferencias')
    },
     opcion10() {
      alert('Tranferencias')
    },
     opcion11() {
        this.currentFlagIcon = '/Flags/spain.png'
    },
     opcion12() {
    this.currentFlagIcon = '/Flags/uk.png'
    },
     opcion13() {
      alert('Tranferencias')
    },
     opcion14() {
      alert('Tranferencias')
    },
  }
}
</script>

<style>
.usuario{
  width: 35px !important;
  height: 35px !important;
  margin-left: 680px;
  color: white; /* para que el icono se vea */
}
.puntitos-2{
  width: 35px !important;
  height: 35px !important;
  color: white; /* para que el icono se vea */
}
.puntitos-3{
  width: 35px !important;
  height: 35px !important;
  color: white; /* para que el icono se vea */
}
.image-wrapper3 {
  width: 100px;
  border-radius: 8px;
  padding: 5px;
  transition: transform 0.3s, border-color 0.3s;
  background: transparent;
  height: 135px;
}

.logo-titulo {
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-top: 10px;
  gap: 5px
}

.titulo {
  margin-top: 10px;
  color: rgb(255, 255, 255);
  font-size: 19.5px;
  font-family: 'Italic';
  margin-left: 5px;
}

.Barra {
  background-color: rgb(12, 155, 80);
  border-bottom: 1px;
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  border-radius: 100%;
  width: 45px;
  height: 40px;
  margin-left: -25px;
  margin-top: 8px;
}
</style>
