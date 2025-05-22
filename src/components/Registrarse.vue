<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte izquierda -->
            <div class="logo-section">
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <h1 class="app-name">{{ $t('register.app_name') }}</h1>

                <!-- Selector de idioma -->
                <p class="idioma-conf">{{ $t('register.Select the language') }}</p>
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

                <!-- Mostrar mensajes de error y éxito -->
                <p v-if="errorMessage" style="color: red;background-color:yellow; text-align:center; margin-top: 40%;">{{ errorMessage }}</p>
                <p v-if="successMessage" style="color: green; text-align:center;">{{ successMessage }}</p>

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
                            <input type="text" :placeholder="$t('register.nickname')" v-model="username" class="custom-input" />
                        </div>


                        <!-- Nombre completo Usuario -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/username.png" class="input-icon-inside" />
                            <input type="text" :placeholder="$t('register.fullname')" v-model="fullName" class="custom-input" />
                        </div>
                        <p class="password-info">{{ $t('register.Enter the full name') }}</p>

                        <!-- Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/pwd.png" class="input-icon-inside" />
                            <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('register.password')" v-model="password" class="custom-input" />
                            <img :src="showPassword ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showPassword = !showPassword" />
                        </div>
                        <p class="password-info">{{ $t('register.passwordHint') }}</p>

                        <!-- Confirmar Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/rpwd.png" class="input-icon-inside" />
                            <input :type="showConfirm ? 'text' : 'password'" :placeholder="$t('register.confirm')" v-model="confirmPassword" class="custom-input" />
                            <img :src="showConfirm ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showConfirm = !showConfirm" />
                        </div>

                        <!-- Email -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/email.png" class="input-icon-inside" />
                            <input type="email" :placeholder="$t('register.email')" v-model="email" class="custom-input" />
                        </div>

                        <!-- Teléfono -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/phone.png" class="input-icon-inside" />
                            <input type="tel" :placeholder="$t('register.phone')" v-model="phone" class="custom-input" />
                        </div>

                        <!-- Raya negra -->
                        <hr class="divider" />

                        <!-- Botones de aceptar y cancelar -->
                        <div class="form-buttons">
                            <button class="btn btn-aceptar" @click="handleRegister" :disabled="loading">{{ $t('register.submit') }} </button>
                            <button class="btn btn-cancelar" @click="cancelarRegistro"> {{ $t('register.cancel') }} </button>
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

// Router
const router = useRouter()

// i18n y bandera
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)
const currentFlagIcon = ref(getFlagIcon(locale.value))

watch(currentLocale, (newLocale) => {
    locale.value = newLocale
    currentFlagIcon.value = getFlagIcon(newLocale)
    })

function getFlagIcon(locale) {
    return locale === 'es' ? '/flags/spain.png' : '/flags/uk.png'
    }

function opcion11() {
    currentLocale.value = 'es'
    }

function opcion12() {
    currentLocale.value = 'en'
    }

// Datos formulario
const username = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const phone = ref('')

// Iconos ojo
const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href


// Control de visibilidad
const showPassword = ref(false)
const showConfirm = ref(false)

// Mensajes
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

// Función de registro
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validaciones
  if (!username.value || !fullName.value || !password.value || !confirmPassword.value || !email.value || !phone.value) {
    errorMessage.value = 'Por favor, completa todos los campos.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'El email no tiene un formato válido.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  const telefonoRegex = /^[0-9]{7,15}$/
  if (!telefonoRegex.test(phone.value)) {
    errorMessage.value = 'El teléfono debe tener entre 7 y 15 dígitos.'
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://tu-api.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        phone: phone.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      errorMessage.value = data.message || 'Error al registrar usuario.'
      loading.value = false
      return
    }

    successMessage.value = 'Registro exitoso. Redirigiendo...'
    setTimeout(() => {
      router.push({ name: 'Login' })  // o el nombre de tu vista de login
    }, 2000)
  } catch (error) {
    errorMessage.value = 'Error de conexión. Intente más tarde.'
  } finally {
    loading.value = false
  }
}

const cancelarRegistro = () => {
  router.push('/')  // Ajusta según la ruta de tu vista principal
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
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
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
