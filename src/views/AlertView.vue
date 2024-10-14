<template>
  <div class="container">
    <select name="types" v-model="selectedType" @change="filterAlerts">
      <option disabled value="">Seleccione un tipo</option>
      <option value="all">Todos</option>
      <!-- Opción para mostrar todas las alertas -->
      <option v-for="(type, key) in TYPES" :key="key" :value="type">
        {{ key.charAt(0).toUpperCase() + key.slice(1) }}
      </option>
    </select>
    <div id="map" style="height: 500px; width: 100%"></div>
    <section class="alert-descriptions">
      <h3>Tipos de Alertas</h3>
      <ul>
        <li :style="{ color: getMarkerColor(TYPES.police) }">
          <strong>Policía:</strong> Alertas sobre la presencia de la policía en
          la vía.
        </li>
        <li :style="{ color: getMarkerColor(TYPES.accident) }">
          <strong>Accidente:</strong> Informes de accidentes en la carretera.
        </li>
        <li :style="{ color: getMarkerColor(TYPES.road_closed) }">
          <strong>Cierre de Carretera:</strong> Información sobre carreteras
          cerradas por diversos motivos.
        </li>
        <li :style="{ color: getMarkerColor(TYPES.jam) }">
          <strong>Tráfico:</strong> Alertas sobre congestión vehicular.
        </li>
        <li :style="{ color: getMarkerColor(TYPES.hazard) }">
          <strong>Peligro:</strong> Avisos sobre condiciones peligrosas en la
          vía.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TYPES } from '@/utils/types.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const alerts = ref(null)
const selectedType = ref('') // Agregar una referencia reactiva para el tipo seleccionado
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY_ALERTS
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST_ALERTS

function getMarkerColor(type) {
  switch (type) {
    case TYPES.police:
      return 'green'
    case TYPES.accident:
      return 'red'
    case TYPES.road_closed:
      return 'orange'
    case TYPES.jam:
      return 'yellow'
    case TYPES.hazard:
      return 'purple'
    default:
      return 'blue' // Color por defecto
  }
}

onMounted(async () => {
  const url =
    'https://waze.p.rapidapi.com/alerts-and-jams?bottom_left=3.967%2C-73.640&top_right=4.197%2C-73.533&max_alerts=20&max_jams=20'
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  }

  try {
    const response = await fetch(url, options)
    alerts.value = await response.json()
    console.log(alerts.value.data)

    if (alerts.value && alerts.value.data) {
      initMap(alerts.value.data.alerts) // Inicializa el mapa con las alertas
    }
  } catch (error) {
    console.error(error)
  }
})

let map // Variable para almacenar la instancia del mapa

// Función para inicializar el mapa
function initMap(alerts) {
  if (!map) {
    // Crea el mapa en la ubicación de Villavicencio solo si no está inicializado
    map = L.map('map').setView([4.0511, -73.6357], 12)

    // Agrega una capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)
  } else {
    // Si el mapa ya está inicializado, elimina las capas existentes
    map.eachLayer(layer => {
      if (layer !== map._layers[Object.keys(map._layers)[0]]) {
        map.removeLayer(layer) // Elimina las capas existentes excepto la capa base
      }
    })
  }

  // Filtra las alertas según el tipo seleccionado
  const filteredAlerts =
    selectedType.value === 'all' // Comprobación para "Todos"
      ? alerts // Si se selecciona "Todos", utiliza todas las alertas
      : alerts.filter(alert => alert.type === selectedType.value)

  // Recorre las alertas filtradas y agrega marcadores
  filteredAlerts.forEach(alert => {
    const { type, latitude, longitude, street } = alert

    // Determina el color del marcador según el tipo de alerta
    let markerColor = 'blue' // Color por defecto
    if (type === TYPES.police) {
      markerColor = 'green'
    } else if (type === TYPES.accident) {
      markerColor = 'red'
    } else if (type === TYPES.road_closed) {
      markerColor = 'orange'
    } else if (type === TYPES.jam) {
      markerColor = 'yellow'
    } else if (type === TYPES.hazard) {
      markerColor = 'purple'
    }

    // Crea un marcador con el color correspondiente
    const marker = L.circleMarker([latitude, longitude], {
      radius: 8,
      fillColor: markerColor,
      color: markerColor,
      fillOpacity: 0.6,
      stroke: true,
      weight: 1,
    }).addTo(map)

    // Agrega un popup al marcador con información de la alerta
    marker.bindPopup(`<b>${type}</b><br>${street}`).openPopup()
  })
}

// Función para filtrar las alertas cuando se cambia el tipo
function filterAlerts() {
  if (alerts.value && alerts.value.data) {
    initMap(alerts.value.data.alerts) // Reinicia el mapa con las alertas filtradas
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  padding-bottom: 100px;
  background-color: var(--color-background);
  font-family: var(--font-family);
  overflow: scroll;
}

#map {
  height: 500px;
  width: 100%;
  border: 2px solid var(--color-accent);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.alert-descriptions {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid var(--color-accent);
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.alert-descriptions ul {
  list-style-type: none;
  padding: 0;
}

.alert-descriptions li {
  margin: 5px 0;
}
</style>
