<template>
<footer>
    <p>© Finanza Familiar 2025. Todos los Derechos Reservados.</p>
</footer>
</template>

<script>
export default{
name: 'Footer'
}
</script>

<style scoped>

footer {
width: 100vw;
position: fixed; left: 0; bottom: 0;
background-color:rgb(12, 155, 80);
color: hsl(0, 0%, 100%);
padding: 10px;
margin-top: 5px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
font-family: 'Italic';
 z-index: 998; /* También agregado */
}

</style>