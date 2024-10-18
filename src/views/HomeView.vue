<script setup>
import { ref } from 'vue'
import { getVehicleType } from '@/utils/getVehicleType'
import imgCarro from '@/assets/carro.png'
import imgMoto from '@/assets/moto.png'
import CompaniesSoat from '@/components/home/CompaniesSoat.vue'

// Obtén el usuario del localStorage y asegúrate de que existe
const user = ref(
  JSON.parse(localStorage.getItem('user')) || {
    fullname: '',
    vehiclePlates: [],
  },
)

// Obtener la lista de vehículos del usuario como una variable reactiva
const vehicles = ref(user.value.vehiclePlates)
const vigencia = ref(false)

// Función para calcular los días de vigencia del SOAT
const calculateSoatValidity = dateSoat => {
  const today = new Date()
  const soatDate = new Date(dateSoat)
  const oneYear = 365 * 24 * 60 * 60 * 1000 // Un año en milisegundos

  // Verifica si la póliza aún es vigente
  if (today - soatDate < oneYear) {
    const daysLeft = Math.floor(
      (soatDate.getTime() + oneYear - today.getTime()) / (1000 * 60 * 60 * 24),
    )
    vigencia.value = true
    return daysLeft > 0 ? daysLeft : 0 // Asegura que no muestre días negativos
  } else {
    vigencia.value = false
    return 0 // Si no está vigente
  }
}
</script>

<template>
  <div class="home-container">
    <header class="hero">
      <img class="hero-img" src="/src/assets/welcome.png" alt="Welcome" />
      <h1>
        Bienvenido <br />
        <span>{{ user.fullname }}</span>
      </h1>
    </header>
    <h2 style="margin: 0 auto">Vehículos</h2>
    <article>
      <div class="card" v-for="(vehicle, index) in vehicles" :key="index">
        <div :class="getVehicleType(vehicle.plate)">
          <img
            :src="getVehicleType(vehicle.plate) === 'moto' ? imgMoto : imgCarro"
            alt="Vehicle Image"
          />
          <p class="plate">{{ vehicle.plate }}</p>
          <p class="soat" v-if="vigencia">Póliza vigente</p>
          <p class="soat vencido" v-else>Compra seguro</p>
        </div>
        <div class="time">
          <h3 class="due-time">
            {{ calculateSoatValidity(vehicle.dateSoat) }}
          </h3>
          <p style="text-align: center">Días</p>
        </div>
      </div>
    </article>

    <CompaniesSoat />
  </div>
</template>

<style scoped>
.vencido {
  color: var(--color-primary);
}
/*Home container*/
.home-container {
  padding: 20px;
  padding-bottom: 100px;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

/*Article*/
article {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  font-size: var(--font-size-h2);
  color: var(--color-primary);
  margin-bottom: 16px;
  text-align: center;
}

.due-time {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-primary);
  padding: 15px;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  background-color: var(--color-background-light);
  margin-bottom: 5px;
  color: var(--color-primary);
  padding: 8px;
}

.soat {
  color: var(--color-secondary);
}

div.moto img,
div.carro img {
  max-width: 180px;
  height: 180px;
}

.home-container {
  padding: 20px;
  padding-bottom: 100px;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: scroll;
  padding-bottom: 50px;
}

.hero {
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: drop 0.5s ease forwards;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card {
  margin: 10px;
  padding: 10px;

  display: flex;
  flex-direction: row;
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

img.hero-img {
  max-height: 150px;
  width: auto;
  border-radius: 8px;
}

h1 {
  font-size: 2rem;
  margin: 10px 0;
  color: var(--color-text);
}

span {
  border: none;
  color: var(--color-secondary);
  font-weight: bold;
  font-size: 1.5rem;
}

@media (min-width: 740px) {
  article {
    flex-direction: row;
  }
}
</style>
