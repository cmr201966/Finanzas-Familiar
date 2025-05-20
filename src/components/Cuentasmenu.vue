<template>
  <div>
    <div class="fondo">
      <p class="crear">Crear cuenta bancaria</p>
      <hr class="mi-barra" />

      <p class="nombre">Nombre de cuenta:</p>
      <div class="entrada-nombre">
        <input class="in-nombre" type="text" v-model="form.nombreCuenta" />
      </div>

      <p class="banco">Banco:</p>
      <div class="entrada-banco">
        <select v-model="form.banco">
          <option disabled value="">Seleccione un banco</option>
          <option value="metro">Metro</option>
          <option value="bandec">BANDEC</option>
          <option value="bfi">BFI</option>
          <option value="fincimex">FINCIMEX</option>
        </select>
      </div>

      <p class="tipo-cuenta">Tipo de cuenta:</p>
      <div class="entrada-tipo-cuenta">
        <select v-model="form.tipoCuenta">
          <option disabled value="">Seleccione tipo de cuenta</option>
          <option value="cup">CUP</option>
          <option value="mlc">MLC</option>
          <option value="usd">USD</option>
        </select>
      </div>

      <p class="fecha-apertura">Fecha de apertura:</p>
      <div class="entrada-fecha-apertura">
        <input type="date" v-model="form.fechaApertura" />
      </div>

      <p class="saldo">Saldo inicial:</p>
      <div class="entrada-saldo">
        <input type="number" v-model="form.saldoInicial" />
      </div>

      <p class="cuenta-principal">Cuenta principal:</p>
      <div class="entrada-cuenta-principal">
        <input type="checkbox" v-model="form.cuentaPrincipal" />
      </div>

      <p class="notificaciones">Recibir notificaciones:</p>
      <div class="entrada-notificaciones">
        <input type="checkbox" v-model="form.recibirNotificaciones" />
      </div>

      <hr class="mi-barra2" />

      <div class="botones">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="guardarCuenta">
          
        </v-btn>

        <v-btn color="warning" prepend-icon="mdi-pencil" @click="editarCuenta">
          
        </v-btn>

        <v-btn color="error" prepend-icon="mdi-close" @click="cancelar">
          
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cuentasmenu",
  data() {
    return {
      form: {
        nombreCuenta: "",
        banco: "",
        tipoCuenta: "",
        fechaApertura: "",
        saldoInicial: "",
        cuentaPrincipal: false,
        recibirNotificaciones: false,
      },
    };
  },
  methods: {
    guardarCuenta() {
      console.log("Cuenta guardada:", this.form);
      // Aquí iría la llamada al backend
    },
    editarCuenta() {
      console.log("Editar cuenta");
      // Implementar edición si quieres
    },
    cancelar() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.logo-cuentas {
  position: absolute;
  top: 25%;
  margin-left: -40%;
  width: 17.5%;
  height: 35%;
}
.botones {
  position: absolute;
  top: 80%;
  left: 50%;
  display: flex;
  gap: 1vw;
  width: 9vw;
  height: 9vw;
}
.pie {
  position: absolute;
  top: 90%;
  left: 8%;
}
.pie2 {
  position: absolute;
  top: 95%;
  left: 8%;
}
.seleccion-idioma {
  position: absolute;
  top: 68%;
  margin-left: -40%;
  color: black;
  font-family: "Popins", arial;
  font-size: 1.2vw;
}
.titulo-logo {
  position: absolute;
  top: 60%;
  margin-left: -40%;
  color: black;
  font-family: "Popins", arial, sans-serif;
  font-size: 2.5vw;
}
.notificaciones {
  position: absolute;
  margin-left: 50%;
  margin-top: -5%;
}
.entrada-nombre{
position: absolute;
  top: 15%;
  left: 40%;
  background-color: white;
  border-radius: 0.5vw;
  border: 2px solid #000000;
  width: 48%;
}
.entrada-nombre input{
 width: 100%;
}
.entrada-banco{
  position: absolute;
  top: 23%;
  left: 40%;
  background-color: white;
  border-radius: 0.5vw;
  border: 2px solid #000000;
   width: 48%;
}
.entrada-banco select{
 width: 100%;
}
.entrada-tipo-cuenta{
position: absolute;
  top: 31%;
  left: 40%;
  background-color: white;
  border-radius: 0.5vw;
  border: 2px solid #000000;
   width: 48%;
}
.entrada-tipo-cuenta select{
 width: 100%;
}
.entrada-fecha-apertura{
  position: absolute;
  top: 39%;
  left: 40%;
  background-color: white;
  border-radius: 0.5vw;
  border: 2px solid #000000;
   width: 48%;
}
.entrada-fecha-apertura input{
 width: 100%;
}
.entrada-saldo {
  position: absolute;
  top: 47%;
  left: 40%;
  background-color: white;
  border-radius: 0.5vw;
  border: 2px solid #000000;
   width: 48%;
}
.entrada-saldo input{
 width: 100%;
}
.entrada-cuenta-principal {
  position: absolute;
  top: 55.5%;
  left: 18%;
  background-color: transparent;
  border-radius: 0.5vw;
  width: 48%;
}
.entrada-notificaciones {
  position: absolute;
  top: 55.5%;
  left: 87%;
  background-color: transparent;
}
.fondo {
  background: linear-gradient(#79bef7, #13ac18);
  width: 38%;
  height: 70%;
  position: absolute;
  top: 19%;
  left: 32%;
  border-radius: 1%;
  border: 2px solid black;
}
.crear {
  position: absolute;
  top: 4%;
  left: 30%;
  font-family: "Popins", arial, sans-serif;
}
.mi-barra {
  position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 8%;
  left: 5%;
}
.mi-barra2 {
 position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 65%;
  left: 5%;
}
.nombre {
  position: absolute;
  top: 15%;
  left: 8%;
}
.banco {
  position: absolute;
  top: 23%;
  left: 8%;
}
.tipo-cuenta {
  position: absolute;
  top: 31%;
  left: 8%;
}
.fecha-apertura {
  position: absolute;
  top: 39%;
  left: 8%;
}
.saldo {
  position: absolute;
  top: 47%;
  left: 8%;
}
.cuenta-principal {
   position: absolute;
  top: 55%;
  left: 8%;
}
.notificaciones{
  position: absolute;
  top: 61%;
  left: 0%;
}

/* Responsive media queries (solo ajustan tamaños y anchos para móvil y tablet, sin tocar posiciones absolutas) */

@media (max-width: 1024px) {
  .logo-cuentas {
    width: 14%;
    height: 28%;
  }
  .titulo-logo {
    font-size: 2vw;
  }
  .pie,
  .pie2 {
    font-size: 1vw;
  }
  .entrada-nombre{
    top: 13.5%;
    left: 45%;
    width: 45%;
  }
  .entrada-nombre input{
     width: 100%;
  }
  .entrada-banco{
    top: 21.5%;
    left: 45%;
    width: 45%;
  }
  .entrada-banco select{
    width: 100%;
    font-size: 1.5vw;
    margin-left: 0.5vw;
  }
  .entrada-tipo-cuenta{
    top: 30%;
    left: 45%;
    width: 45%;
  }
  .entrada-tipo-cuenta select{
    width: 100%;
    font-size: 1.3vw;
    margin-left: 0.5vw;
  }
  .entrada-fecha-apertura{
     top: 37.5%;
    left: 45%;
    width: 45%;
  }
  .entrada-fecha-apertura input{
    width: 100%;
  }
  .entrada-saldo {
    top: 45.5%;
    left: 45%;
    width: 45%;
  }
  .entrada-saldo input {
    width: 100%;
  }
  .entrada-cuenta-principal {
    top: 55.4%;
    left: 20%;
  }
  .entrada-notificaciones {
    top: 55.4%;
    left: 90%;
  }
  .botones {
    font-size: 0.5vw;
    height: 12vw;
    width: 12vw;
    position: absolute; left: 36%;
  }
  .crear {
  position: absolute;
  top: 4%;
  left: 20%;
  font-family: "Popins", arial, sans-serif;
  font-size: 2vw;
}
.mi-barra {
  position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 8%;
  left: 5%;
}
.mi-barra2 {
 position: absolute;
  border: none;      /* quita borde default */
  border-bottom: 2px solid #000;  /* línea negra de 2px */
  width: 90%;       /* o el ancho que quieras */
  margin: 10px 0;    /* espacio arriba y abajo */
  top: 65%;
  left: 5%;
}
.nombre {
  position: absolute;
  top: 15%;
  left: 8%;
  font-size: 1.5vw;
}
.banco {
  position: absolute;
  top: 23%;
  left: 8%;
  font-size: 1.5vw;
}
.tipo-cuenta {
  position: absolute;
  top: 31%;
  left: 8%;
  font-size: 1.5vw;
}
.fecha-apertura {
  position: absolute;
  top: 39%;
  left: 8%;
  font-size: 1.5vw;
}
.saldo {
  position: absolute;
  top: 47%;
  left: 8%;
  font-size: 1.5vw;
}
.cuenta-principal {
   position: absolute;
  top: 55%;
  left: 8%;
  font-size: 1.5vw;
}
.notificaciones{
  position: absolute;
  top: 59.5%;
  left: 0%;
  font-size: 1.5vw;
}
}

@media (max-width: 480px) {
  .logo-cuentas {
    width: 25%;
    height: 35%;
    top: 20%;
    margin-left: -35%;
  }
  .titulo-logo {
    font-size: 4vw;
  }
  .pie,
  .pie2 {
    font-size: 2vw;
  }
  .entrada-nombre input,
  .entrada-banco select,
  .entrada-tipo-cuenta select,
  .entrada-fecha-apertura input,
  .entrada-saldo input {
    font-size: 3vw;
    width: 90% !important;
  }
  .botones {
    flex-direction: column;
    gap: 0.8rem;
    margin-left: 5% !important;
    margin-top: 4% !important;
    width: 2px;
  }
  .botones v-btn {
    font-size: 3vw;
    height: 4.5vw;
    min-width: 2vw;
  }
}
</style>
