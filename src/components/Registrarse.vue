<template>
    <div class="registarse">
        <div class="contiene-registro">
            <h3>{{ $t('title') }}</h3>

            <label class="grupo-label strong">{{ $t('generalData') }}</label>

            <div class="area-input">

                <label for="user" > {{ $t('username') }}:</label>
                <input id="user" :placeholder="$t('username')" type="text" required value="" color="white" >

                <label for="pw" > {{ $t('password') }}:</label>
                <input id="pw" :placeholder="$t('password')" type="text" required value="" color="white" >

                <label for="rpw" > {{ $t('confirm') }}:</label>
                <input id="rpw" :placeholder="$t('confirm')" type="text" required value="" color="white" >

                <label for="email" > {{ $t('email') }}:</label>
                <input id="email" :placeholder="$t('email')" type="text" required value="" color="white" >

            </div>
            <div class="botones-registrarse">
                <button class="boton1" type="button">
                    <img src="../assets/img/icono/check.png" alt="Registrarse" width="50" height="50">
                </button>
                <button class="boton2" type="button">
                    <img src="../assets/img/icono/no.png" alt="Cancelar" width="50" height="50">
                </button>
            </div>

        </div>
    </div>

</template>

<style>
.contiene-registro{
    display: flex;
    height: auto;
    flex-direction: column;
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(4, 81, 25);
    gap:10px;
}
.contiene-registro h3,

.grupo-label{
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    text-align: left;
    align-self: flex-start;

}

.area-input{
    color:white;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap:5px;
    justify-items: left;
}

.area-input input{
    background-color: aliceblue;
    border-radius: 5px;
}

.botones-registrarse{
    display: flex;
    justify-content: flex-end;
}

.boton1{
    border:none;
    cursor: pointer;
    border-radius: 15px;
    height: 40px;
    width: 40px;
    justify-content: right;
    align-items: end;
    background-color:transparent;
    gap: 20px;
    padding: 0;
}

.boton2{
    border:none;
    cursor: pointer;
    border-radius: 15px;
    height: 40px;
    width: 40px;
    justify-content: right;
    align-items: end;
    background-color:transparent;
    gap: 20px;
    padding: 0;
}



</style>