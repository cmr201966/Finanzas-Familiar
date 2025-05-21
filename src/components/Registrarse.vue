<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte izquierda -->
            <div class="logo-section">
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <h1 class="app-name">{{ $t('login.app_name') }}</h1>

                <!-- Selector de idioma -->
                <p class="idioma-conf">Seleccione el idioma</p>
                <div class="language-switcher">
                    <v-menu offset-y>
                        <template #activator="{ props }">
                        <v-btn class="border p-2 rounded-md" icon v-bind="props">
                            <img :src="currentFlagIcon" class="bandera" />
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

            <!-- Parte derecha -->
            <div class="form-container">
                <div class="white-box">
                    <div class="form-gradient-box">
                        <img src="../assets/img/icono/user.png" class="user-icon" alt="Icono usuario" />
                        <hr class="divider" />

                        <!-- Nick Usuario -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/username.png" class="input-icon-inside" />
                            <input type="text" :placeholder="$t('login.username')" v-model="username" class="custom-input" />
                        </div>


                        <!-- Nombre completo Usuario -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/username.png" class="input-icon-inside" />
                            <input type="text" :placeholder="$t('login.fullname')" v-model="fullName" class="custom-input" />
                        </div>
                        <p class="password-info">Nombre completo</p>

                        <!-- Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/pwd.png" class="input-icon-inside" />
                            <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('login.password')" v-model="password" class="custom-input" />
                            <img :src="showPassword ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showPassword = !showPassword" />
                        </div>
                        <p class="password-info">La contraseña debe tener hasta 8 caracteres</p>

                        <!-- Confirmar Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/rpwd.png" class="input-icon-inside" />
                            <input :type="showConfirm ? 'text' : 'password'" :placeholder="$t('login.confirm')" v-model="confirmPassword" class="custom-input" />
                            <img :src="showConfirm ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showConfirm = !showConfirm" />
                        </div>

                        <!-- Email -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/email.png" class="input-icon-inside" />
                            <input type="email" :placeholder="$t('login.email')" v-model="email" class="custom-input" />
                        </div>

                        <!-- Teléfono -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/phone.png" class="input-icon-inside" />
                            <input type="tel" :placeholder="$t('login.phone')" v-model="phone" class="custom-input" />
                        </div>

                        <!-- Raya negra -->
                        <hr class="divider" />

                        <!-- Mostrar mensajes de error y éxito -->
                        <p v-if="errorMessage" style="color: red; text-align:center;">{{ errorMessage }}</p>
                        <p v-if="successMessage" style="color: green; text-align:center;">{{ successMessage }}</p>


                        <!-- Botones de aceptar y cancelar -->
                        <div class="form-buttons">
                            <button class="btn btn-aceptar" @click="handleRegister":disabled="loading">
                              {{ loading ? $t('login.loading') : $t('login.accept') }}
                            </button>
                            <button class="btn btn-cancelar" @click="cancelarRegistro">
                              {{ $t('login.cancel') }}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos formulario
const username = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const phone = ref('')

// Mostrar / ocultar contraseña
const showPassword = ref(false)
const showConfirm = ref(false)

// Mensajes y loading
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

// Manejo idioma y banderas
const { locale } = useI18n()
const currentLocale = ref(locale.value)
const currentFlagIcon = ref(getFlagIcon(locale.value))

watch(currentLocale, (newLocale) => {
  locale.value = newLocale
  currentFlagIcon.value = getFlagIcon(newLocale)
})

function getFlagIcon(locale) {
  return locale === 'es' ? '/flags/spain.png' : '/flags/uk.png'
}

function opcion11() { currentLocale.value = 'es' }
function opcion12() { currentLocale.value = 'en' }

// Iconos ojo
const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href

/*Boton Aceptar

const handleRegister = () => {
  if (!username.value || !fullName.value || !password.value || !confirmPassword.value || !email.value) {
    alert("Por favor, completa todos los campos obligatorios.")
    return
  }
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden.")
    return
  }

  console.log("Datos ingresados:", {
    username: username.value,
    fullName: fullName.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    email: email.value,
    phone: phone.value
  })
}*/

// Función para validar y enviar formulario
export default {
  data() {
    return {
      email: '',
      password: '',
      nombre: '',
      telefono: '',
      errorMessage: '',
      successMessage: '',
      loading: false,
    }
  },
  methods: {
    async handleRegister() {
      this.errorMessage = '';
      this.successMessage = '';

      // Validaciones
      if (!this.email || !this.password || !this.nombre || !this.telefono) {
        this.errorMessage = 'Por favor, complete todos los campos.';
        return;
      }

      // Validar email con regex simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = 'El email no tiene un formato válido.';
        return;
      }

      // Validar contraseña
      if (this.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }

      // Validar teléfono (solo dígitos y longitud)
      const telefonoRegex = /^[0-9]{7,15}$/;
      if (!telefonoRegex.test(this.telefono)) {
        this.errorMessage = 'El teléfono debe tener entre 7 y 15 dígitos numéricos.';
        return;
      }

      this.loading = true;

      try {
        // Enviar datos al backend
        const response = await fetch('http://tu-api.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            nombre: this.nombre,
            telefono: this.telefono,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Backend responde con error
          this.errorMessage = data.message || 'Error al registrar usuario.';
          this.loading = false;
          return;
        }

        // Éxito
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';

        // Esperar 2 segundos y redirigir a login
        setTimeout(() => {
          this.$router.push({ name: 'Login' });
        }, 2000);

      } catch (error) {
        this.errorMessage = 'Error de conexión. Intente más tarde.';
        this.loading = false;
      }
    }
  }
}

/*Boton Cancelar*/

function cancelarRegistro() {
  router.push('/')  // Asegúrate que '/login' sea la ruta correcta de tu vista de login
}

</script>

<style scoped>
/* Reset básico para anular estilos del navegador */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: sans-serif;
  background: #f5f5f5;
  color: #000;
}


/* Estructura */

.login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-box {
    display: flex;
    background: white;
    width: 700px;
    min-height: 550px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border: 2px solid rgb(11, 76, 4);
}
.logo-section {
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}
.app-name {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.language-switcher {
    margin-top: 15px;
}
.form-container {
    max-width: 400px;  /* Limita el ancho máximo del formulario */
    margin: auto;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.form-gradient-box {
    max-width: 500px; /* Limita el ancho interno */
    border-radius: 10px;
    background: linear-gradient(135deg, #4caf50, #2196f3);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    color: white;
    border: 2px solid blue;
}
.user-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.divider {
    width: 80%;
    border: 1px solid black;
    margin-bottom: 20px;
    max-width: 350px;
}
.form-field-horizontal {
  position: relative;
  margin-bottom: 16px;
}

.input-with-icon input.custom-input {
    width: 80%;
    padding: 10px 12px 10px 44px;
    border-radius: 20px;
    border: 2px solid #ccc;
    background-color: white !important;
    color: black !important;
    font-size: 12px;
    outline: none;
    box-sizing: border-box;
    margin-left: 32px;
}
.input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
}

.input-icon-inside {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}
.icono-ojo {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.submit-button {
  margin-top: 10px;
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  background-color: white;
  color: #2196f3;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.submit-button:hover {
  background-color: #e0e0e0;
}

.bandera{
    width: 40px;
    height: 40px;
}

.white-box {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  color: black;
}

.custom-input {
  padding-left: 40px; /* espacio para el ícono */
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 40px;
  font-size: 12px;
  background-color: white;
  color: black;
  outline: none;
  box-sizing: border-box;
  height: 30px;
}

.custom-input:focus {
  border-color: #2196f3; /* cambia al color azul cuando se enfoca */
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 5px; /* espacio entre botones */
  margin-left: 100px;

}

.btn {
  display: flex; /* ← clave */
  align-items: center; /* centra verticalmente */
  justify-content: center; /* centra horizontalmente */
  padding: 10px 20px;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 60px;
  height: 30px;
}

.btn-aceptar {
  background-color: #196c2c; /* verde */
  color: white;
}

.btn-cancelar {
  background-color: #dc3545; /* rojo */
  color: white;
}

.password-info {
    font-size: 11px;
    color: #fbfafa;
    margin-top: -14px;
    margin-left: 9px; /* o lo necesario para alinear bien debajo del input */
    margin-bottom: 10px;
}

.idioma-conf{
    margin-top: 10px;
    font-size: 12px;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    background-color: white !important;
    -webkit-text-fill-color: black !important;
    -webkit-background-clip: text;
}
</style>
