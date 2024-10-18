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
    vehiclePlate: [],
  },
)

// Obtener la lista de vehículos del usuario como una variable reactiva
const vehicles = ref(user.value.vehiclePlates)
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

    <article>
      <h2>Vehículos</h2>
      <!-- TODO: Factorizar componente -->
      <div class="card" v-for="(plate, index) in vehicles" :key="index">
        <div :class="getVehicleType(plate)">
          <img
            :src="getVehicleType(plate) === 'moto' ? imgMoto : imgCarro"
            alt="Vehicle Image"
          />
          <p class="plate">{{ plate }}</p>
          <!-- TODO: Esto es un SLOT -->
          <p class="soat">Poliza vigente</p>
        </div>
        <!-- TODO: Esto es un SLOT -->
        <div class="time">
          <h3 class="due-time">270</h3>
          <p style="text-align: center">Días</p>
        </div>
      </div>
    </article>

    <CompaniesSoat />
  </div>
</template>

<style scoped>
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
</style>
