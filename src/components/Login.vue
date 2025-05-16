<template>
    <div class="login-page">
        <div class="login-box">
            <!-- Parte izquierda con logo y nombre -->
            <div class="logo-section">

                <!-- Logo de la app -->
                <img src="../assets/img/Logo/logo.jpg" alt="Finanza Familiar Logo" class="logo" />
                <h1 class="app-name">Finanza - Familiar</h1>
            </div>

            <!-- Parte derecha con fondo degradado dentro del recuadro blanco -->
            <div class="form-container">
                <div class="form-gradient-box">

                    <!-- Imagen centrada arriba -->
                    <img src="../assets/img/icono/user.png" alt="Icono usuario" class="user-icon" />

                    <!-- Línea negra debajo -->
                    <hr class="divider" />

                    <!-- Aquí puedes poner los campos de login luego -->

                    <!-- Usuario -->
                    <div class="form-field-horizontal">
                        <img src="../assets/img/icono/username.png" class="input-icon" alt="Usuario" />
                        <label for="username">{{ $t('login.username') }}</label>
                        <input id="username" type="text" :placeholder="$t('login.username')" required />
                    </div>

                    <!-- Contraseña -->
                    <div class="form-field-horizontal">
                        <img src="../assets/img/icono/pwd.png" class="input-icon" alt="Contraseña" />
                        <label for="password">{{ $t('login.password') }}</label>
                        <div class="input-icon-wrapper">
                            <input id="password" :type="showPassword ? 'text' : 'password'" :placeholder="$t('login.password')" />
                            <img class="icono-ojo" :src="showPassword ? eyeIcon : eyeOffIcon" @click="showPassword = !showPassword" />
                        </div>
                    </div>

                    <!-- Confirmar Contraseña -->
                    <div class="form-field-horizontal">
                        <img src="../assets/img/icono/rpwd.png" class="input-icon" alt="Confirmar Contraseña" />
                        <label for="confirm">{{ $t('login.confirm') }}</label>
                        <div class="input-icon-wrapper">
                            <input id="confirm" :type="showConfirm ? 'text' : 'password'" :placeholder="$t('login.confirm')" />
                            <img class="icono-ojo" :src="showConfirm ? eyeIcon : eyeOffIcon" @click="showConfirm = !showConfirm" />
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="form-field-horizontal">
                        <img src="../assets/img/icono/phone.png" class="input-icon" alt="Teléfono" />
                        <label for="phone">{{ $t('login.phone') }}</label>
                        <input id="phone" v-model="phone" type="text" :placeholder="$t('login.phone')" />
                    </div>

                    <!-- Email -->
                    <div class="form-field-horizontal">
                        <img src="../assets/img/icono/email.png" class="input-icon" alt="Email" />
                        <label for="email">{{ $t('login.email') }}</label>
                        <input id="email" v-model="email" type="text" :placeholder="$t('login.email')" />
                    </div>

                    <!-- Línea negra debajo -->
                    <hr class="divider" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'


// Datos
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const phone = ref('')

// Mostrar/Ocultar contraseña
const showPassword = ref(false)
const showConfirm = ref(false)

// Íconos de ojo (puedes poner tus propias imágenes)
const eyeIcon = new URL('../assets/img/icono/ojo.png', import.meta.url).href
const eyeOffIcon = new URL('../assets/img/icono/ojo-cerrado.png', import.meta.url).href
</script>

<style scoped>
/* Fondo general de la página */

.login-page {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
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
    width: 100px;
    height: 100px;
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
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

/* Recuadro con gradiente */
.form-gradient-box {
    width: 100%;
    max-width: 450px; /* Limita el ancho interno */
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
    width: 80px;
    height: 80px;
    margin-top: 10px;
    object-fit: contain;
}

.form-field {
    width: 70%;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
}

.form-field input {
    width: 100%;
    height: 30px;
    padding: 0 35px 0 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 12px;
}

/* Imagen de usuario más pequeña */
.user-icon {
    width: 100px;
    height: 100px;
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

.label-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

/* Íconos al lado del label */
.label-row img.input-icon {
    width: 30px;
    height: 30px;
    margin-right: 6px;
}

.label-row label {
    color: white;
    font-weight: 500;
}

.input-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.input-icon-wrapper input {
    flex: 1;
    padding-right: 30px;
    height: 30px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    outline: none;
}

/* Ícono del ojo bien posicionado */
.icono-ojo {
    position: absolute;
    right: 10px;
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

/* Esto es para obligar al navegador a que ponga el color q tenia el input*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: black !important;
    transition: background-color 5000s ease-in-out 0s;
    }
</style>
