<template>
  <div class="fondo-total">
  <div class="fondo-resumen_general">
    <div class="encabezado">
      <h1 class="titulo-resumen_general">Resumen General</h1>

      <label class="fecha-boton" title="Abrir calendario">
        {{ fechaFormateada }}
        <input type="date" v-model="fecha" class="input-fecha" />
        <svg
          class="icono-calendario"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>
      <button class="boton-exportar" @click="exportarDatos">
          Exportar
        </button>
    </div>
    <div class="total-gasto">
     <img class="img-resumengastos" src="../assets/img/tarjetas/gastos.png" alt="">
     <p class="texto-gasto">
        Gasto total del mes: {{ gastoTotalMes.toFixed(2) }}
     </p>
    </div>
    <div class="ingresos-mes">
     <img class="img-resumeningresos" src="../assets/img/tarjetas/ingresos.png" alt="">
     <p class="texto-ingreso">
        Ingreso total del mes: {{ ingresoTotalMes.toFixed(2) }}
     </p>
    </div>
    <div class="saldo-actual">
     <img class="img-resumensaldo" src="../assets/img/tarjetas/saldocuentas.png" alt="">
        <p class="texto-saldo">
          Saldo actual: {{ saldoActualMes.toFixed(2) }}
        </p>
     </div>
    <div class="saldo-general">
     <img class="img-resumensaldo" src="../assets/img/tarjetas/saldocuentas.png" alt="">
     <p class="texto-saldo-general">
        Saldo general: {{ saldoGeneral.toFixed(2) }}
     </p>
    </div>
    <div class="alertas-activas">
     <p class="texto-alertas">
        Alertas activas
     </p>
    </div>
    <div class="distribucion-gastos">
  <p class="texto-distribucion-gastos">
    Distribución de gastos
  </p>
  <p class="leyenda-fecha">{{ leyendaFecha }}</p>
  <GraficoGastos class="grafico-gastos" :datos="gastosPorCategoria" />
</div>
    <div class="evolucion-temporal">
     <p class="texto-evolucion-temporal">
        Evolucion temporal
        <GraficoEvolucion
  v-if="ingresosPorMes.length && gastosPorMes.length"
  :ingresos="ingresosPorMes"
  :gastos="gastosPorMes"
  :etiquetasMeses="etiquetasMeses"
/>
     </p>
    </div>
    <div class="bancos-cuentas">
     <p class="texto-bancos-cuentas">
        Bancos y cuentas
        <div class="lista-bancos">
    <ul>
  <li v-for="cuenta in cuentasConBancoYNombre" :key="cuenta.banco + cuenta.nombre">
    {{ cuenta.banco }} - {{ cuenta.nombre }}: ${{ cuenta.saldo.toFixed(2) }}
  </li>
</ul>
  </div>
     </p>
    </div>
    <div class="presupuesto-real">
     <p class="texto-presupuesto-real">
        Presupuesto vs Real
     </p>
    </div>
  </div>
 </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import GraficoGastos from '@/components/Graficogastos.vue' // ajusta el path si es diferente
import { getAllTransactions } from '@/services/transaccionesService.js'
import { getAllExpenses } from '@/services/expensesService.js'
import { accountSaldos, getAllAccounts } from '@/services/accountService'
import { getBancos } from '@/services/BancoService.js'
import GraficoEvolucion from '@/components/GraficoEvolucion.vue'
const mesSeleccionado = computed(() => Number(fecha.value.slice(5, 7)))
const añoSeleccionado = computed(() => Number(fecha.value.slice(0, 4)))
const fecha = ref(new Date().toISOString().slice(0, 10))
const categoria = ref([])
const transacciones = ref([])
const cuentas = ref([])
const bancos = ref([]) // si lo vas a usar
const fechaFormateada = computed(() => {
  const meses = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ]
  const transaccionesDelMes = computed(() => {
  return transacciones.value.filter(t => {
    const fechaTrans = new Date(t.date)  // asegúrate de que t.date sea un string ISO válido
    return (
      fechaTrans.getMonth() + 1 === mesSeleccionado.value &&
      fechaTrans.getFullYear() === añoSeleccionado.value
    )
  })
})
  const [a, m, d] = fecha.value.split('-')
  return `${d} ${meses[parseInt(m) - 1]} ${a}`
})

// Cargar datos al montar el componente
onMounted(async () => {
  await cargarCategoria()
  await cargarTransacciones()
   await cargarBancos()
   await cargarCuentas()

})

async function cargarCuentas() {
  try {
    const data = await getAllAccounts() // ✅ aquí se declara 'data'
    cuentas.value = data
    console.log('Cuentas obtenidas:', data) // ✅ aquí se usa correctamente
  } catch (error) {
    console.error('Error al cargar cuentas:', error)
  }
}

async function cargarBancos() {
  try {
    bancos.value = await getBancos()
  } catch (error) {
    console.error('Error al cargar bancos:', error)
  }
}

// Agrupar por banco y sumar saldos
const cuentasConBancoYNombre = computed(() => {
  return cuentas.value
    .filter(cuenta => parseFloat(cuenta.initial_balance) > 0)
    .map(cuenta => ({
      banco: cuenta.bank || 'Desconocido',
      nombre: cuenta.name || 'Sin nombre',
      saldo: parseFloat(cuenta.initial_balance) || 0
    }))
})

const saldoGeneral = computed(() => {
  const saldoInicial = cuentas.value.reduce((total, cuenta) => {
    return total + (parseFloat(cuenta.initial_balance) || 0)
  }, 0)

  const totalIngresos = transacciones.value
    .filter(t => t.type === 'ingreso')
    .reduce((total, t) => total + Number(t.amount), 0)

  const totalGastos = transacciones.value
    .filter(t => t.type === 'gasto')
    .reduce((total, t) => total + Number(t.amount), 0)

  return saldoInicial + totalIngresos - totalGastos
})

const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

const leyendaFecha = computed(() => {
  const mesIndex = mesSeleccionado.value - 1
  const mesNombre = meses[mesIndex] || ''
  return `Gastos de ${mesNombre} ${añoSeleccionado.value}`
})

const saldoActualMes = computed(() => {
  return ingresoTotalMes.value - gastoTotalMes.value
})

const transaccionesDelMes = computed(() => {
  if (!transacciones.value) return []
  return transacciones.value.filter(t => {
    const fechaTrans = new Date(t.date)
    return (
      fechaTrans.getMonth() + 1 === mesSeleccionado.value &&
      fechaTrans.getFullYear() === añoSeleccionado.value
    )
  })
})

// Cargar categorías (para nombres de categorías)
async function cargarCategoria() {
  try {
    const data = await getAllExpenses()
    categoria.value = data
  } catch (error) {
    console.error('Error al cargar categorías:', error)
  }
}

const gastoTotalMes = computed(() => {
  // Filtramos solo las transacciones del mes y año seleccionados que sean de tipo "gasto"
  return transacciones.value
    .filter(t => {
      const fechaTrans = new Date(t.date)
      return (
        fechaTrans.getMonth() + 1 === mesSeleccionado.value &&
        fechaTrans.getFullYear() === añoSeleccionado.value &&
        t.type === 'gasto'
      )
    })
    .reduce((total, t) => total + Number(t.amount), 0)
})

const ingresoTotalMes = computed(() => {
  return transacciones.value
    .filter(t => {
      const fechaTrans = new Date(t.date)
      return (
        fechaTrans.getMonth() + 1 === mesSeleccionado.value &&
        fechaTrans.getFullYear() === añoSeleccionado.value &&
        t.type === 'ingreso'
      )
    })
    .reduce((total, t) => total + Number(t.amount), 0)
})

// Cargar todas las transacciones
async function cargarTransacciones() {
  try {
    const data = await getAllTransactions()
    transacciones.value = Array.isArray(data) ? data : data.transacciones || []
  } catch (error) {
    console.error('Error al cargar transacciones:', error)
  }
}

// Función para obtener nombre de categoría desde id
function getCategoryName(category_id) {
  const cat = categoria.value.find(c => c.id === category_id)
  return cat ? cat.name : null
}

// Computed para agrupar solo los gastos por categoría
const gastosPorCategoria = computed(() => {
  if (!transaccionesDelMes.value) return []

  const gastos = transaccionesDelMes.value.filter(t => t.type === 'gasto')

  const agrupado = {}

  gastos.forEach(t => {
    const catId = t.category_id ?? 'sin_categoria'  // si no tiene id, usamos clave fija
    const monto = Number(t.amount)
    if (isNaN(monto)) return  // ignorar registros sin monto válido

    if (!agrupado[catId]) agrupado[catId] = 0
    agrupado[catId] += monto
  })

  return Object.entries(agrupado).map(([catId, total]) => ({
    categoria: catId === 'sin_categoria' ? 'Sin categoría' : getCategoryName(Number(catId)) || 'Sin categoría',
    total
  }))
})

function exportarDatos() {
  alert('Aquí va la lógica para exportar datos')
}

const etiquetasMeses = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]

const ingresosPorMes = computed(() => {
  const ingresos = Array(12).fill(0)
  transacciones.value.forEach(t => {
    const fecha = new Date(t.date)
    if (t.type === 'ingreso' && !isNaN(fecha) && !isNaN(Number(t.amount))) {
      ingresos[fecha.getMonth()] += Number(t.amount)
    }
  })
  return ingresos
})

const gastosPorMes = computed(() => {
  const gastos = Array(12).fill(0)
  transacciones.value.forEach(t => {
    const fecha = new Date(t.date)
    if (t.type === 'gasto' && !isNaN(fecha) && !isNaN(Number(t.amount))) {
      gastos[fecha.getMonth()] += Number(t.amount)
    }
  })
  return gastos
})

</script>

<style>
.fondo-total{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #79bef7 0%, #79bef7 40%, lightgreen 100%);
  margin: 0;
}
.fondo-resumen_general {
  position: absolute;
  top: 3%;
  left: 2.5%;
  background-color: white;
  width: 95%;
  height: 95%;
  border-radius: 1vw;
  padding: 2rem;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulo-resumen_general {
  /* Quitar position absolute para que flex lo controle */
  /* position: absolute; */
  /* top: 2%; */
  font-family: 'Arial', sans-serif;
  font-size: 2vw;
  font-weight: bold;
  /* Opcional: para que quede alineado verticalmente */
  margin-top: -2.5vw;
}

.fecha-boton {
  position: relative;
  top: -1vw;
  margin-left: 53vw;
  background-color: white;
  color: #374151;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
  display: inline-block; /* importante para tamaño */
}

.input-fecha {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  padding: 0;
  border: none;
}
.icono-calendario {
  position: absolute;
  top: 48%;
  right: 0.2rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: #374151;
  transition: color 0.3s ease;
}

.fecha-boton:hover .icono-calendario {
  color: #1e40af;
}
.boton-exportar {
  position: relative;
  top: -1vw;
  background-color: #2563eb; /* azul (Tailwind blue-600) */
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  transition: background-color 0.3s ease;
}

.boton-exportar:hover {
  background-color: #1e40af; /* azul más oscuro */
}
.total-gasto {
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 12%;
  left: 5%;
  width: 17%;
  height: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-gasto {
  font-family: 'Arial', sans-serif;
  font-size: 1vw;
  font-weight: bold;
  padding-left: 5vw;
  padding-bottom: 1.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.ingresos-mes {
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 12%;
  left: 23%;
  width: 17%;
  height: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-ingreso {
  font-family: 'Arial', sans-serif;
  font-size: 1vw;
  font-weight: bold;
  padding-left: 5vw;
  padding-bottom: 1.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.saldo-actual {
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 12%;
  left: 41%;
  width: 17%;
  height: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-saldo {
  font-family: 'Arial', sans-serif;
  font-size: 1vw;
  font-weight: bold;
  padding-left: 4vw;
  padding-bottom: 1vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.alertas-activas {
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 12%;
  left: 77%;
  width: 17%;
  height: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-alertas {
  font-family: 'Arial', sans-serif;
  font-size: 1vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-bottom: 2.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.saldo-general{
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 12%;
  left: 59%;
  width: 17%;
  height: 18%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-saldo-general{
  font-family: 'Arial', sans-serif;
  font-size: 1vw;
  font-weight: bold;
  padding-left: 5vw;
  padding-bottom: 1vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.distribucion-gastos{
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 33%;
  left: 5%;
  width: 43%;
  height: 36%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-distribucion-gastos{
  position:absolute;
  top: 5%;
  left: -3%;
  font-family: 'Arial', sans-serif;
  font-size: 1.5vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-bottom: 2.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.leyenda-fecha {
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  position: absolute;
  left: 60%;
  top: 10%;
  color: #374151; /* gris oscuro */
}
.evolucion-temporal{
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 33%;
  left: 51%;
  width: 43%;
  height: 36%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-evolucion-temporal{
  position:absolute;
  top: 5%;
  left: -3%;
  font-family: 'Arial', sans-serif;
  font-size: 1.5vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-bottom: 2.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.bancos-cuentas{
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 71%;
  left: 5%;
  width: 43%;
  height: 26%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-bancos-cuentas{
  position:absolute;
  top: 5%;
  left: -3%;
  font-family: 'Arial', sans-serif;
  font-size: 1.5vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-bottom: 2.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.presupuesto-real{
  background-color: white;
  border: 1px solid #e5e7eb; /* gris claro (tailwind gray-200) */
  border-radius: 1vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* sombra suave y difusa */
  position: absolute;
  top: 71%;
  left: 51%;
  width: 43%;
  height: 26%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
.texto-presupuesto-real{
  position:absolute;
  top: 5%;
  left: -3%;
  font-family: 'Arial', sans-serif;
  font-size: 1.5vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-bottom: 2.5vw;
  color: #374151; /* gris oscuro (tailwind gray-700) */
}
.img-resumeningresos{
    position: absolute;
    top: 10%;
    left: 7%;
    width: 5vw;
    height: 5vw;
}
.img-resumengastos{
    position: absolute;
    top: 10%;
    left: 5%;
    width: 5vw;
    height: 5vw;
}
.img-resumensaldo{
    position: absolute;
    top: 18%;
    left: 13%;
    width: 3.5vw;
    height: 3.5vw;
}
</style>