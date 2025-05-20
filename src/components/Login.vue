<template>
    <div class="login-page">
        <div class="login-box">
        <!-- Parte izquierda con logo y nombre -->
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

            <!-- Parte derecha con fondo degradado -->
            <div class="form-container">
                <div class="form-gradient-box">
                    <img src="../assets/img/icono/user.png" class="user-icon" alt="Icono usuario" />
                    <hr class="divider" />

                    <!-- Usuario -->
                    <div class="form-field-horizontal input-with-icon">
                        <img src="../assets/img/icono/username.png" class="input-icon-inside" alt="usuario" />
                        <input type="text" :placeholder="$t('login.username')" v-model="username" name="username" autocomplete="username" class="custom-input" />
                    </div>

                    <!-- Contraseña -->
                    <div class="form-field-horizontal input-with-icon">
                        <img src="../assets/img/icono/pwd.png" class="input-icon-inside" alt="contraseña" />
                        <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('login.password')" v-model="password" autocomplete="password" class="custom-input" />
                        <img class="icono-ojo" :src="showPassword ? eyeIcon : eyeOffIcon" @click="showPassword = !showPassword" />
                    </div>

                    <!-- Raya de división -->
                    <hr class="divider" />

                    <!-- Boton inicio -->
                    <button class="submit-button" @click="handlelogin">{{ $t('login.login') }}</button>

                    <!-- Contraseña -->
                    <div class="register-link">
                        {{ $t('login.no_account') }}
                        <router-link to="/register">{{ $t('login.sign_up') }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    return locale === 'es' ? '/flags/spain.png' : '/flags/uk.png'
    }

function opcion11() {
    currentLocale.value = 'es'
    }

function opcion12() {
    currentLocale.value = 'en'
    }

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href



async function handlelogin() {
    if (!username.value || !password.value) {
        alert(t('login.complete_fields'))
    return
    }

    if (password.value.length < 8) {
        alert(t('login.password_length'))
    return
    }

    try {
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value }),
    })

    const data = await response.json()

    if (!response.ok) {
        alert(data?.detail || t('login.invalid_credentials'))
        return
    }

    console.log('Login exitoso:', data)
    } catch (err) {
        alert(t('login.network_error'))
        console.error(err)
    }
}
</script>


<style scoped>
/* Fondo general de la página */

.login-page {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Recuadro blanco principal */

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

/* Columna izquierda: logo y nombre */

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

.logo {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
}

.app-name {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    text-align: center;
}

/* Columna derecha */
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

.form-gradient-box img{
    width: 20%;
    height: 20%;
    margin-top: 20px;
}

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

/* Línea negra */
.divider {
    width: 80%;
    border: 1px solid black;
    margin-bottom: 20px;
    max-width: 350px;
}

/* Ícono del ojo bien posicionado */
.icono-ojo {
    position: absolute;
    right: 10px;
    top:-15px;
    width: 18px;
    height: 18px;
    cursor: pointer;
}
/* poner alineado horizontal icono, label e input*/

.form-field-horizontal {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    width: 100%;
    margin-bottom: 8px; /* antes era 12px */
}

.form-field-horizontal label {
    color: white;
    min-width: 90px;
    font-weight: 500;
}

.form-field-horizontal input {
    flex: 1;
    height: 30px;
    padding: 10px 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 14px;
    max-width: 250px;
}

.form-field-horizontal .icono-ojo {
    position: absolute;
    right: 8px;
    width: 18px;
    height: 18px;
}

.form-field-horizontal img.input-icon {
    width: 26px;
    height: 26px;
    transform: -2px; /* Sube un poco el icono */
}


.input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
}

.input-with-icon input {
    width: 100%;
    padding: 10px 12px 10px 44px; /* espacio izquierdo para la imagen */
    border: 2px solid gray;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
    background-color: white; /* O blanco implícito */
}

.input-icon-inside {
    position: absolute;
    left: -15px;
    top:-15px;
    width: 20px;
    height: 20px;
    border-radius: 5px;
}

.input-with-icon .input-icon-inside {
    position: absolute;
    left: 12px;
    width: 20px;
    height: 20px;
}

.submit-button {
    background-color: rgb(122, 134, 240);
    color: #f6f7f8;
    border: 2px solid white;
    border-radius: 20px;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
    width: 40%;
    height: 20%;
    margin-bottom: 12px;
}
.submit-button:hover {
    background-color: rgba(255, 255, 255, 0.9);
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
.language-switcher {
    position:relative;
    top: 10px;
    right: 10px;
    z-index: 100;
}

.language-switcher select {
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid #060000;
}

.custom-input {
    padding-left: 40px; /* deja espacio para el icono */
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    font-size: 16px;
    background-color: white;
    color: black;
}
.bandera{
    width: 40px;
    height: 40px;
}

/* Esto es para obligar al navegador a que ponga el color q tenia el input*/
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
