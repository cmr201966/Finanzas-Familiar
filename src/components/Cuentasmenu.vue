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
        <v-btn class="save" color="primary" prepend-icon="mdi-plus" @click="guardarCuenta">
          
        </v-btn>

        <v-btn class="editar" color="warning" prepend-icon="mdi-pencil" @click="editarCuenta">
          
        </v-btn>

        <v-btn class="cancelar" color="error" prepend-icon="mdi-close" @click="cancelar">
          
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
  min-width: 0.5vw;
}
.save{
 width: 3vw !important;
  height: 5vh !important;
}
.editar{
 width: 3vw !important;
  height: 5vh !important;
}

.cancelar{
 width: 3vw !important;
  height: 5vh !important;
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
.entrada-cuenta-principal{
  position: absolute;
  top: 55.5%;
  left: 45%;
  background-color: transparent;
  border-radius: 0.5vw;
}
.entrada-notificaciones {
  position: absolute;
  top: 63.5%;
  left: 45%;
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
  top: 70%;
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
.notificaciones {
  position: absolute;
  top: 63%;
  left: 8%;
}

/* Responsive media queries (solo ajustan tamaños y anchos para móvil y tablet, sin tocar posiciones absolutas) */

@media (max-width: 1024px) {
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
    margin-left: 0.5%;
  }
  .entrada-tipo-cuenta{
    top: 30%;
    left: 45%;
    width: 45%;
  }
  .entrada-tipo-cuenta select{
    width: 100%;
    font-size: 1.3vw;
    margin-left: 0.5%;
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
  .entrada-cuenta-principal{
    top: 54.4%;
    left: 55%;
  }
  .entrada-notificaciones{
    top: 62.5%;
    left: 55%;
  }
.botones {
  position: absolute;
  top: 80%;
  left: 38%;
  display: flex;
  gap: 1vw;
}
 .save{
  width: 5vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
.editar{
 width: 5vw !important;
  height: 5vh !important;
  min-width: 1vw;
}
.cancelar{
 width: 5vw !important;
  height: 5vh !important;
  min-width: 1vw;
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
  top: 70%;
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
  top: 63%;
  left: 8%;
  font-size: 1.5vw;
}
}

@media (max-width: 500px) {
  .entrada-nombre input{
  font-size: 1.5vw;
    width: 100% !important;
    height: auto;}
  .entrada-banco select{
  font-size: 1.5vw;
    width: 100% !important;
    height: auto;}
  .entrada-tipo-cuenta select{
  font-size: 1.5vw;
    width: 100% !important;
    height: auto;}
  .entrada-fecha-apertura input{
  font-size: 1.5vw;
    width: 100% !important;
    height: auto;}
  .entrada-saldo input {
    font-size: 1.5vw;
    width: 100% !important;
    height: 20%;
  }
  .entrada-cuenta-principal input{
        position: absolute;
        top: -21%;
        left: 58%;
        width: 16%;
  }
  .entrada-notificaciones input{
        position: absolute;
        top: -33%;
        left: 58%;
        width: 18%;
  }

  .entrada-nombre{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-banco{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-tipo-cuenta{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-fecha-apertura{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-cuenta-principal{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-notificaciones{
   font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%}
  .entrada-saldo {
    font-size: 1.5vw;
    width: 50% !important;
    height: 5%;
    margin-top:2%
  }
.botones {
  top: 76%;
  left: 35%;
  flex-direction: column;
  gap: 1vw;
}
 .save{
  width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.editar{
 width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.cancelar{
  width: 2vw !important;
  height: 4.5vh !important;
  min-width: 1vw;
}
.fondo{
  position: fixed;
}
}
</style>
