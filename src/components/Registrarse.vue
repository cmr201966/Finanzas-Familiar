<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte izquierda -->
            <div class="logo-section">
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <!-- Título que cambia según modo: Crear nuevo usuario o Editar usuario existente -->
    <h2>

      {{ props.userId === null

        ? $t('register.title_new')  /* Cuando es nuevo usuario */
        : $t('register.title_edit') /* Cuando es edición */
      }}
    </h2>
                <!-- <h1 class="app-name">{{ $t('register.app_name') }}</h1>-->

                <!-- Texto que indica la opción de idioma -->
                <p class="idioma-conf">{{ $t('login.Select the language') }}</p>

                <!-- Contenedor del selector de idioma -->
                <div class="language-switcher">

                    <!-- Menú desplegable -->
                    <v-menu offset-y>

                        <!-- Activador del menú -->
                        <template #activator="{ props }">

                            <!-- Botón sin la propiedad 'icon' para que sea rectangular -->
                            <!-- Usamos 'd-flex' para alinear bandera + texto horizontalmente -->
                            <v-btn class="d-flex align-center gap-2 border px-3 py-2 rounded-md" v-bind="props">

                                <!-- Bandera a la izquierda -->
                                <img :src="currentFlagIcon" class="bandera"/>

                                <!-- Texto del idioma (ES o EN) -->
                                <span>{{ currentLanguageCode }}</span>
                            </v-btn>
                        </template>

                        <!-- Lista de opciones de idioma -->
                        <v-list class="menu-reducido">
                            <v-list-item @click="opcion11">
                                <v-list-item-title>{{ $t('login.spanish') }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="opcion12">
                                <v-list-item-title>{{ $t('login.english') }}</v-list-item-title>
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
                            <input type="text" :placeholder="$t('register.Enter the full name')" v-model="fullName" class="custom-input" />
                        </div>

                        <!-- Contraseña -->
                        <div class="form-field-horizontal input-with-icon">
                            <img src="../assets/img/icono/pwd.png" class="input-icon-inside" />
                            <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('register.passwordHint')" v-model="password" class="custom-input" />
                            <img :src="showPassword ? eyeIcon : eyeOffIcon" class="icono-ojo" @click="showPassword = !showPassword" />
                        </div>

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

                        <!-- Botones de aceptar y cancelar
                        <div class="form-buttons">
                            <button class="btn btn-aceptar" @click.prevent="handleRegister" :disabled="loading">{{ $t('register.submit') }} </button>
                            <button class="btn btn-cancelar" @click="cancelarRegistro"> {{ $t('register.cancel') }} </button>
                        </div> -->
                        <div class="form-buttons">
                            <button class="btn btn-aceptar" @click.prevent="handleRegister" :disabled="loading">{{ textoBotonAceptar }}</button>
                            <button class="btn btn-cancelar" @click="cancelarRegistro"> {{ $t('register.cancel') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

import { ref, watch, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import axios from 'axios'

import { register, getUserByUserName, updateUser } from '@/services/register'

import { useRoute } from "vue-router";

const route = useRoute();
const username1 = route.params.username

// Router e internacionalización
const router = useRouter()
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)
const currentFlagIcon = ref(getFlagIcon(locale.value))

// Variable que indica el modo actual
const modo = ref('registrar') // o 'actualizar'

// Cambia el texto del botón según el modo
const textoBotonAceptar = computed(() =>
  isEditing.value ? t('register.update') : t('register.submit')
)

function getFlagIcon(locale) {
  return locale === 'es' ? '/flags/spain.png' : '/flags/uk.png'
}

// Cambio de idioma
function opcion11() { currentLocale.value = 'es' }
function opcion12() { currentLocale.value = 'en' }
const currentLanguageCode = computed(() => (locale.value === 'es' ? 'ES' : 'EN'))

watch(currentLocale, (newLocale) => {
  locale.value = newLocale
  currentFlagIcon.value = getFlagIcon(newLocale)
})

// Props
const props = defineProps({
//  username: { type: String, default: null },
  userId: { type: [String, Number], default: null }
})


// Formulario y estados
const username = ref('')
const email = ref('')
const fullName = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const isEditing = ref(false)
const loading = ref(false)
const valid = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Formulario auxiliar
const form = ref({
  username: '',
  email: '',
  fullName: ''
})

// Función para limpiar formulario (opcional)
function clearForm() {
  username.value = ''
  email.value = ''
  fullName.value = ''
  phone.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}


// Enviar formulario (registro o actualización)
const handleRegister = async () => {

  errorMessage.value = ''
  successMessage.value = ''

  // Validaciones
  if (!username.value || !fullName.value || !email.value || !phone.value) {
    errorMessage.value = t('register.complete_fields')
    return
  }

  if (props.userId === null) {
    if (!password.value || !confirmPassword.value) {
      errorMessage.value = t('register.complete_fields')
      return
    }
    if (password.value !== confirmPassword.value) {
      errorMessage.value = t('register.passwordMatch')
      return
    }
    if (password.value.length < 8) {
      errorMessage.value = t('register.passwordMin')
      return
    }
  } else {
    if (password.value || confirmPassword.value) {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = t('register.passwordMatch')
        return
      }
      if (password.value.length < 8) {
        errorMessage.value = t('register.passwordMin')
        return
      }
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = t('register.emailInvalid')
    return
  }

  const telefonoRegex = /^[0-9]{7,15}$/
  if (!telefonoRegex.test(phone.value)) {
    errorMessage.value = t('register.phoneInvalid')
    return
  }

  loading.value = true

  try {
    if (props.userId === null) {
      // Registro nuevo
      const response = await register({
        username: username.value,
        name: fullName.value,
        password: password.value,
        email: email.value,
        phone: phone.value,
      })

      if (response) {
        successMessage.value = t('register.success')
        setTimeout(() => router.push({ name: 'Login' }), 2000)
      } else {
        errorMessage.value = response?.data?.message || t('register.error')
      }
    } else {
      // Actualización
      const updateData = {
        username: username.value,
        name: fullName.value,
        email: email.value,
        phone: phone.value,
      }
      if (password.value) {
        updateData.password = password.value
      }

      const response = await updateUser(props.userId, updateData)
      if (response) {
        successMessage.value = t('register.updateSuccess') || 'Perfil actualizado con éxito'
        setTimeout(() => router.push('/home'), 2000)
      } else {
        errorMessage.value = response?.data?.message || t('register.error')
      }
    }
  } catch (error) {
    console.log(error)
    errorMessage.value = error.message || t('register.connection_error')
  } finally {
    loading.value = false
  }
}

function cancelarRegistro() {
  if (username1 && username1.trim() !== '') {
    isEditing.value = true
    // Si hay username1, viene de edición, va al home
    router.push('/home')
  } else {
    // Si no, vuelve al login
    isEditing.value = false
    router.push('/')
  }
}

// Al montar
onMounted(async () => {
  if (username1 && username1.trim() !== '') {
    console.log("Entre")
    isEditing.value = true
    // Llamar el endpoint que busca los datos del username1
    const data = await getUserByUserName(username1)
      username.value=data.data.username
      fullName.value=data.data.name
      email.value=data.data.email
      phone.value=data.data.phone

  } else {
    console.log("No entro")
    isEditing.value = false
    clearForm()
  }
})


// Iconos ojo
const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href


// Control de visibilidad
const showPassword = ref(false)
const showConfirm = ref(false)



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

input::placeholder {
    font-size: 10px; /* tamaño de letra del placeholder */
    margin-left: 10px;

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
    width: 30px;
    height: 30px;
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

/* ============ RESPONSIVE ============ */

/* Teléfonos pequeños (hasta 575px) */
@media (max-width: 575.98px) {
  .login-page {
    align-items: flex-start;
    padding-top: 20px;
  }

  .login-box {
    flex-direction: column;
    width: 100%;
    min-height: unset;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }

  .logo-section {
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .app-name {
    font-size: 16px;
  }

  .form-container {
    padding: 10px;
  }

  .form-gradient-box {
    padding: 15px 10px;
    border-radius: 0;
  }

  .input-with-icon input.custom-input {
    width: 100%;
    margin-left: 0;
    padding-left: 40px;
  }

  .input-icon-inside {
    left: 12px;
  }

  .icono-ojo {
    right: 12px;
  }

  .form-buttons {
    flex-direction: column;
    margin-left: 0;
    gap: 8px;
  }

  .btn {
    width: 100%;
  }

  .submit-button {
    width: 100%;
  }

  .idioma-conf {
    text-align: center;
  }
}

/* Tablets (576px a 767px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .login-box {
    flex-direction: column;
    width: 90%;
  }

  .form-container {
    padding: 15px;
  }

  .form-buttons {
    margin-left: 0;
    justify-content: space-between;
  }

  .btn {
    width: 45%;
  }
}
</style>
