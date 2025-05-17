<template>
  <v-app>
    <div class="Barra">
      <div class="logo-titulo">
        <img class="logo" src="../assets/img/Logo/logo.jpg" />
        <h1 class="titulo">Finanza Familiar</h1>

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
    };
  },
  methods: {
    opcion1() {
      alert('Nombre del usuario');
    },
    opcion2() {
      alert('Contraseña');
    },
    opcion3() {
      alert('Categorias');
    },
    opcion4() {
      alert('Cuentas');
    },
    opcion5() {
      alert('Transacciones');
    },
    opcion6() {
      alert('Tranferencias');
    },
    opcion7() {
      alert('Tranferencias');
    },
    opcion8() {
      alert('Tranferencias');
    },
    opcion9() {
      alert('Tranferencias');
    },
    opcion10() {
      alert('Tranferencias');
    },
    opcion11() {
      this.currentFlagIcon = '/Flags/spain.png';
    },
    opcion12() {
      this.currentFlagIcon = '/Flags/uk.png';
    },
    opcion13() {
      alert('Tranferencias');
    },
    opcion14() {
      alert('Tranferencias');
    }
  }
};
</script>

<style scoped>
/* Usamos unidades relativas como vw, vh y % */
.usuario {
  width: 3vw !important; /* 5% del ancho de la ventana */
  height: 3vw !important; /* 5% del ancho de la ventana */
  margin-left: 50vw; /* 20% del ancho de la ventana */
  color: white; /* para que el icono se vea */
  margin-bottom: 5vw;
  margin-right: 2vw;
}

.puntitos-2 {
  width: 3vw !important;
  height: 3vw !important;
  color: white;
}

.puntitos-3 {
  width: 3vw !important;
  height: 3vw !important;
  color: white;
  margin-bottom: 5vw;
  margin-right: 2vw;
}

.logo-titulo {
  display: flex;
  align-items: center;
  margin-left: 5vw; /* 5% del ancho de la ventana */
  margin-top: 1vh; /* 1% de la altura de la ventana */
}

.titulo {
  color: rgb(255, 255, 255);
  font-size: 2.5vw; /* Proporcional al ancho de la ventana */
  font-family: 'Italic';
  margin-left: 1vw;
  margin-bottom: 5vw;
}

.Barra {
  background-color: rgb(12, 155, 80);
  border-bottom: 1px;
  width: 100%;
  height: 8vh; /* 8% de la altura de la ventana */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  border-radius: 100%;
  width: 3vw; /* 8% del ancho de la ventana */
  height: 3vw; /* 7% del ancho de la ventana */
  margin-left: 1vw;
  margin-bottom: 5vw;
}
</style>