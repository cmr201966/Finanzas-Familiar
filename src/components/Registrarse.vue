<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte izquierda -->
            <div class="logo-section">
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <h1 class="app-name">{{ $t('login.app_name') }}</h1>

                <!-- Selector de idioma -->
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

                        <!-- Usuario -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/username.png" class="input-icon-inside" />
                            <input type="text" :placeholder="$t('login.username')" v-model="username" class="custom-input" />
                        </div>

                        <!-- Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/pwd.png" class="input-icon-inside" />
                            <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('login.password')" v-model="password" class="custom-input" />
                            <img :src="showPassword ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showPassword = !showPassword" />
                        </div>

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

                        <hr class="divider" />
                        <button class="submit-button" @click="handleRegister">{{ $t('login.register') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const phone = ref('')

const showPassword = ref(false)
const showConfirm = ref(false)

const { locale } = useI18n()
const currentLocale = ref(locale.value)
const changeLanguage = () => { locale.value = currentLocale.value }
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

const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href

const handleRegister = () => {
  if (!username.value || !password.value || !confirmPassword.value || !email.value) {
    alert("Por favor, completa todos los campos obligatorios.")
    return
  }
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden.")
    return
  }

  console.log("Datos ingresados:", {
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    email: email.value,
    phone: phone.value
  })
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
    width: 100%;
    padding: 10px 12px 10px 44px;
    border-radius: 20px;
    border: 2px solid #ccc;
    background-color: white !important;
    color: black !important;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
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
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}
.icono-ojo {
  position: absolute;
  right: 10px;
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
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 40px;
  font-size: 14px;
  background-color: white;
  color: black;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
}

.custom-input:focus {
  border-color: #2196f3; /* cambia al color azul cuando se enfoca */
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
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
