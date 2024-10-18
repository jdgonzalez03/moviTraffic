<script setup>
import { ref, onMounted, computed } from 'vue'
import { getVehicleType } from '@/utils/getVehicleType'
import imgCarro from '@/assets/carro.png'
import imgMoto from '@/assets/moto.png'

const PARTICULAR_URL = import.meta.env.VITE_PARTICULAR_URL
const particular = ref(null)

const TAXI_URL = import.meta.env.VITE_TAXIS_URL
const taxi = ref(null)

const searchPlaca = ref('')

const modePicoPlaca = ref('particular')

const user = ref(
  JSON.parse(localStorage.getItem('user')) || {
    fullname: '',
    vehiclePlates: [],
  },
)

const vehicles = ref(user.value.vehiclePlates)

// Función para verificar si una placa tiene pico y placa hoy
function checkPicoPlacaToday(plate) {
  const dayOfWeek = new Date()
    .toLocaleString('es-ES', { weekday: 'long' })
    .toLowerCase()
  const lastDigit = parseInt(plate.slice(-1))

  if (!particular.value) {
    return false
  }

  // Encuentra el día de la semana en los datos de pico y placa
  const picoPlacaForToday = particular.value.find(day => day.dia === dayOfWeek)
  if (picoPlacaForToday) {
    return picoPlacaForToday.placas.includes(lastDigit)
  }

  return false
}

// Función para obtener los días en que un vehículo tiene pico y placa según su placa
function getVehicleDays(plate) {
  const lastDigit = parseInt(plate.slice(-1))
  if (!particular.value) {
    return ''
  }

  // Filtrar los días en los que el último dígito de la placa está en el array `placas`
  const daysWithRestriction = particular.value
    .filter(day => day.placas.includes(lastDigit))
    .map(day => day.dia)
    .join(', ')

  return daysWithRestriction || 'No aplica'
}

// Objeto que contiene la información de cada vehículo del usuario
const vehiclesWithPicoPlaca = computed(() => {
  return vehicles.value.map(vehicle => {
    // Verifica que el vehículo y la placa estén definidos
    if (!vehicle || !vehicle.plate) {
      console.warn('Vehicle or plate is undefined:', vehicle)
      return {
        plate: '', // Devolver un valor por defecto para la placa
        hasPicoPlaca: false,
        restrictionDays: '',
      }
    }

    // Log de la placa
    console.log('Vehicle Plate:', vehicle.plate)

    // Determina si el vehículo tiene Pico y Placa
    const isCar = getVehicleType(vehicle.plate) === 'carro'
    const hasPicoPlaca = isCar && checkPicoPlacaToday(vehicle.plate)

    return {
      plate: vehicle.plate, // Retorna la placa del vehículo
      hasPicoPlaca, // Booleano que indica si tiene restricción
      restrictionDays: getVehicleDays(vehicle.plate), // Obtiene los días de restricción
    }
  })
})

//handleClickSearchPlaca
const restriction = ref(null)
const handleClickSearchPlaca = () => {
  const lastDigit = parseInt(searchPlaca.value.slice(-1))

  if (modePicoPlaca.value === 'particular') {
    restriction.value = particular.value
      .filter(day => day.placas.includes(lastDigit))
      .map(day => day.dia)
      .join(', ')
  } else if (modePicoPlaca.value === 'taxis') {
    restriction.value = taxi.value
      // Filtra los registros de taxis que terminan en el mismo último dígito
      .filter(taxi => Number(taxi.placa) % 10 === lastDigit)
      // Mapear para obtener la fecha de restricción
      .map(taxi =>
        new Date(taxi.fecha).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      )
      .join(', ')
  }
}

//Fetch
onMounted(() => {
  fetch(PARTICULAR_URL)
    .then(response => response.json())
    .then(data => {
      particular.value = data
    })
    .catch(err => {
      console.log('Error obteniendo pico y placa; particular', err)
    })

  fetch(TAXI_URL)
    .then(response => response.json())
    .then(data => {
      taxi.value = data
    })
    .catch(err => {
      console.log('Error obteniendo pico y placa; taxi', err)
    })
})
</script>

<template>
  <div class="pico-placa-container">
    <header>
      <h2>Pico y Placa</h2>
      <a class="btn link" href="#buscar-placa">Busca una placa</a>
    </header>

    <article class="own-vehicles">
      <!-- TODO: Factorizar componente -->
      <div
        class="card"
        v-for="(vehicle, index) in vehiclesWithPicoPlaca"
        :key="index"
      >
        <div :class="getVehicleType(vehicle.plate)">
          <img
            :src="getVehicleType(vehicle.plate) === 'moto' ? imgMoto : imgCarro"
            alt="Vehicle Image"
          />
          <p class="plate">{{ vehicle.plate }}</p>
          <p class="pico-placa">
            Días con pico y placa: {{ vehicle.restrictionDays }}
          </p>
        </div>
        <div class="today">
          <h3>{{ vehicle.hasPicoPlaca ? 'SI' : 'NO' }}</h3>
          <p style="text-align: center">Hoy</p>
        </div>
      </div>
    </article>

    <article id="buscar-placa">
      <ul class="options-pico-placa">
        <li>
          <input
            type="radio"
            id="particular"
            value="particular"
            v-model="modePicoPlaca"
          />
          <label for="particular" class="btn">Particular</label>
        </li>
        <li>
          <input
            type="radio"
            id="taxis"
            value="taxis"
            v-model="modePicoPlaca"
          />
          <label for="taxis" class="btn">Taxi</label>
        </li>
      </ul>

      <input
        class="form-input"
        type="text"
        placeholder="Ingresa una placa"
        v-model="searchPlaca"
      />
      <button
        class="btn"
        style="margin: 10px auto; display: block"
        @click="handleClickSearchPlaca"
      >
        Buscar
      </button>
      <p v-if="!restriction" style="text-align: center">Ingresa una placa</p>
      <p v-else style="max-width: 300px; text-align: center">
        Tienes pico y placa: {{ restriction }}
      </p>
    </article>
  </div>
</template>

<style scoped>
.today h3 {
  text-align: center;
  width: 55px;
  border: 1px solid var(--color-primary);
  padding: 12px;
  border-radius: 50%;
}

/*header*/
header {
  text-align: center;
  display: flex;
  gap: 16px;
}

h2 {
  color: var(--color-text);
}

/*Container pico y placa*/

.link {
  animation: pulse 5s ease-in-out infinite;
}

#buscar-placa {
  animation: drop 0.5s ease forwards;
}

.pico-placa-container {
  padding: 20px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

/*Fomr*/
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  font-size: var(--font-size-paragraph);
  color: var(--color-text);
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

/* Estilo para el estado de enfoque (focus) */
.form-input:focus {
  border-color: var(--color-secondary);
  outline: none;
}

a {
  text-decoration: none;
  font-weight: bold;
}

input[type='radio'] {
  opacity: 0;
}

li:has(input[type='radio']:checked) label {
  background-color: var(--color-secondary);
  transform: scale(0.9);
}

.options-pico-placa {
  list-style: none;
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.pico-placa {
  color: var(--color-primary);
}

/*Card vehicle*/

div.moto img,
div.carro img {
  max-width: 180px;
}

.card {
  margin: 10px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;

  background-color: var(--color-card-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  animation: drop 0.5s ease forwards;
}

@keyframes drop {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: var(--color-primary);
  }
  50% {
    transform: scale(1);
    background-color: var(--color-secondary);
  }
  100% {
    transform: scale(0.8);
    background-color: var(--color-primary);
  }
}

@media (min-width: 740px) {
  .own-vehicles {
    display: flex;
    flex-direction: row;
  }
}
</style>
