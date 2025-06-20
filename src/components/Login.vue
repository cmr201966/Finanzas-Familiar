<template>
    <div class="login-page">
        <div class="login-box">
        <!-- Parte izquierda con logo y nombre -->
            <div class="logo-section">
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <h1 class="app-name">{{ $t('login.app_name') }}</h1>

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

            <!-- Parte derecha con fondo degradado -->
            <div class="form-container">
                <div class="form-gradient-box">
                    <img src="../assets/img/icono/user.png" class="user-icon" alt="Icono usuario" />

                    <!-- Raya de división -->
                    <hr class="divider" />

                        <div class="login-container">
                            <form @submit.prevent="submitForm">
                                <v-row>
                                    <v-col cols="12" md="12" class="py-1">
                                        <v-text-field
                                            v-model="username"
                                            :placeholder="$t('login.Enter username, email or mobile')"
                                            :type="text"
                                            prepend-inner-icon="mdi-account"
                                            name="username"
                                            id="new-user"
                                            ref="usernameInput"
                                            dense
                                            outlined
                                            class="custom-small-input"
                                            density="compact"
                                            @keydown.enter="focusNext"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="12" class="py-1">
                                        <v-text-field
                                        v-model="password"
                                        :placeholder="$t('login.password')"
                                        :type="showPassword ? 'text' : 'password'"
                                        prepend-inner-icon="mdi-lock"
                                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append-inner="toggleShowPassword"
                                        name="password"
                                        id="new-user"
                                        dense
                                        outlined
                                        class="custom-small-input"
                                        autocomplete="password"
                                        density="compact"
                                        ref="passwordInput"
                                        @keydown.enter="focusLoginButton"
                                        />
                                    </v-col>
                                </v-row>
                            </form>
                        </div>

                        <!-- Raya de división -->
                        <hr class="divider" />

                        <!-- Boton inicio -->

                        <div class="form-buttons">
                            <button class="btn btn-aceptar"
                                    @click.prevent="handleLogin"
                                    ref="loginButton"
                                    :disabled="loading">
                                    {{ $t('login.login') }}
                            </button>
                        </div>

                        <div class="register-link text-center mt-2">

                            {{ $t('login.no_account') }}
                            <router-link
                                :to="{ name: 'Registrarse',
                                params: { username: '' } }">
                                {{ $t('login.sign_up') }}
                            </router-link>
                        </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

// Importamos funcionalidades reactivas y de router

import { ref, watch, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'


// Inicializamos router para navegación

const router = useRouter()
const loading = ref(false)

// i18n y bandera
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)
const currentFlagIcon = ref(getFlagIcon(locale.value))


// Función para obtener la imagen de la bandera según el idioma
function getFlagIcon(locale){
    return locale === 'es' ? '/flags/spain.png' : '/flags/uk.png'
    }

// Funciones para cambiar idioma al español o inglés
function opcion11() {
    currentLocale.value = 'es'
    }

function opcion12() {
    currentLocale.value = 'en'
    }
// Computed para mostrar 'ES' o 'EN'
const currentLanguageCode = computed(() => {
    return locale.value === 'es' ? 'ES' : 'EN'
})

// Watcher que sincroniza idioma y bandera
watch(currentLocale, (newLocale) => {
    locale.value = newLocale
    currentFlagIcon.value = getFlagIcon(newLocale)
    })


// Variables reactivas para login y control de visibilidad de contraseña
const username = ref('')
const password = ref('')

const successMessage = ref('');
const usernameInput = ref(null); // Referencia al input

onMounted(() => {
    window.dispatchEvent(new Event('resize'));
    username.value = '';
    password.value = '';
    if (usernameInput.value) {
        usernameInput.value.focus(); // Aplica el foco cuando la vista se carga
    }
});

const passwordInput = ref(null)

function focusNext() {
  if (passwordInput.value) {
    passwordInput.value.focus()
  }
}

const loginButton = ref(null)

function focusLoginButton() {
  if (loginButton.value) {
    loginButton.value.focus()
  }
}

const showPassword = ref(false)
//const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
//const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href

function toggleShowPassword() {
    showPassword.value = !showPassword.value
}

// Función para manejar login (comentario: función asíncrona de login)

import { login } from '@/services/auth'

async function handleLogin(event) {
  event.preventDefault() // evita que el formulario recargue la página

    if (!username.value || !password.value) {
       // alert(t('login.complete_fields'))
        errorMessage.value = t('login.complete_fields')
        return
        }

    if (password.value.length < 8) {
        alert(t('login.password_length'))
        return
        }

    try {
    const response = await login({
        user: username.value,
        password: password.value
        })
        console.log('Login correcto. Token guardado:', response.data.token)
        // Guarda el token en localStorage
        localStorage.setItem('token', response.data.token)

        // Guarda también el nombre de usuario si quieres
        localStorage.setItem('username', username.value)

        // redirige si es necesario
        router.push('/home')

    } catch (err) {
        console.error(err);
        // alert(err.message || 'Error al iniciar sesión')
    }
}

</script>


<style scoped>


/* Contenedor general de la página, centrado vertical y horizontal */
.login-page {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


/* Caja blanca principal que contiene logo y formulario */
.login-box {
    background-color: white;
    width: 700px;
    min-height: 500px;
    border-radius: 12px;
    display: flex;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    border: 2px solid rgb(11, 76, 4);
}


/* Parte izquierda: logo y texto */
.logo-section {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ddd;
    padding: 20px;
}

/* Logo */
.logo {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
}


/* Nombre app */
.app-name {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    text-align: center;
}

.idioma-conf{
    font-size: 12px;
}

.language-switcher {
    position:relative;
    top: 10px;
    right: 10px;
    z-index: 100;
}

.language-switcher select {
    padding: 4px 4px;
    border-radius: 6px;
    border: 1px solid #060000;
}

.bandera{
    width: 30px;
    height: 30px;
}

.menu-reducido {
    width: 100px;
    padding: 2px 0; /* Ajusta el alto vertical */
    padding-inline: 7px;
    min-height: 32px;
}

/* Parte derecha: formulario y fondo */
.form-container {
    max-width: 400px;  /* Limita el ancho máximo del formulario */
    margin: auto;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}


/* Recuadro con gradiente */
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

/* Icono de usuario arriba */
.form-gradient-box img.user-icon {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    object-fit: contain;
}

/* Imagen de usuario más pequeña */
.user-icon {
    width:50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 10px;
}

/* Línea divisoria */
.divider {
    height: 2px;
    background-color: #010000;
    border: none;
    margin: 1rem auto;
    width: 100%; /* o 100%, o un valor fijo como 300px */
    display: block;
}


.login-container {
    max-width: 600px;
    margin: auto;
    padding: 10px;
}


.custom-small-input input {
    font-size: 12px !important;
}

.custom-small-input .v-input__control {
    background-color: transparent !important;
}

.custom-small-input .v-field__field {
    background-color: transparent !important;
}

.custom-small-input .v-field {
    background-color:  transparent !important; /* o el fondo de tu contenedor */
    border-radius: 8px;
}
.custom-small-input .v-field--focused {
  background-color: #e0e0e0 !important;
}


.form-buttons {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    justify-content: space-between;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 60px;
    height: 30px;
}
.btn-aceptar {
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
    background-color: #196c2c; /* verde */
    color: white;
}


.register-link {
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
}
.register-link a {
    color: #f4faf9;
    text-decoration: none;
    font-weight: bold;
}
.register-link a:hover {
    text-decoration: underline;
}

/* =====================================================
        Responsive Styles - Archivo CSS Reutilizable
        Puedes incluir este archivo en todas tus vistas.
    =====================================================*/
/* RESPONSIVE DESIGN */

/* Tablets (pantallas entre 768px y 991.98px) */
@media (max-width: 991.98px) {
  .login-box {
    flex-direction: column;
    width: 90%;
    min-height: auto;
  }

  .logo-section {
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }

  .logo {
    width: 150px;
    height: 150px;
  }

  .form-container {
    padding: 15px;
    max-width: 100%;
    width: 100%;
  }

  .form-gradient-box {
    width: 100%;
    padding: 20px 10px;
  }
}


/* Móviles grandes (pantallas entre 576px y 767.98px) */
@media (max-width: 767.98px) {
  .login-page {
    height: auto;
    padding: 20px 10px;
  }

  .logo {
    width: 120px;
    height: 120px;
  }

  .app-name {
    font-size: 18px;
  }

  .form-container {
    padding: 10px;
  }

  .form-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn,
  .btn-aceptar {
    width: 100%;
    max-width: 200px;
  }
}


/* Móviles pequeños (pantallas menores a 576px) */
@media (max-width: 575.98px) {
  .login-box {
    width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .logo-section {
    padding: 10px;
  }

  .form-gradient-box {
    padding: 15px 10px;
  }

  .user-icon {
    width: 40px;
    height: 40px;
  }

  .divider {
    margin: 0.5rem auto;
  }

  .language-switcher {
    position: static;
    margin-top: 10px;
  }

  .bandera {
    width: 24px;
    height: 24px;
  }

  .custom-small-input input {
    font-size: 11px !important;
  }

  .register-link {
    font-size: 12px;
  }
}
</style>
