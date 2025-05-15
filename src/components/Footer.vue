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
background-color:rgb(33, 209, 92);
color: hsl(0, 45%, 98%);
padding: 10px;
margin-top: 5px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 z-index: 998; /* También agregado */
}

</style>