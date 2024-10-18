<template>
  <div class="map-container">
    <select
      style="margin-bottom: 20px"
      name="routes"
      id="routes"
      v-model="routeName"
      @change="onRouteChange"
    >
      <option disabled selected value="">Selecciona una ruta</option>
      <option v-for="(route, index) in routes" :key="index" :value="route.name">
        {{ route.name }}
      </option>
      <option disabled selected value="">Pronto agregaremos más rutas</option>
    </select>

    <div>
      <button class="btn" @click="calculateRoute">Calcular Ruta</button>
    </div>

    <div id="map" ref="mapRef" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { services } from '@tomtom-international/web-sdk-services'
import { routes } from '@/utils/routesBus'

const apiKey = import.meta.env.VITE_API_KEY_TOMTOM
const mapRef = ref(null)
const map = ref(null)
const markers = ref([])
const selectedRoute = ref(null) // Ruta seleccionada
const routeName = ref('')

onMounted(() => {
  const centerCoords = [-73.6185, 4.1412]
  const initialZoom = 12

  map.value = tt.map({
    key: apiKey,
    container: mapRef.value,
    center: centerCoords,
    zoom: initialZoom,
  })
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
  markers.value.forEach(marker => marker.remove())
  markers.value = []
})

const onRouteChange = () => {
  // Encontrar la ruta seleccionada en la lista de rutas
  const route = routes.find(r => r.name === routeName.value)
  selectedRoute.value = route ? route.stops : null // Asignar las paradas de la ruta
}

const calculateRoute = async () => {
  // const stops = selectedRoute.value
  // const locationString = stops.map(stop => `${stop.lng},${stop.lat}`).join(':')

  const stops = selectedRoute.value
  const locationString = `${stops[0].lng},${stops[0].lat}:${stops[stops.length - 1].lng},${stops[stops.length - 1].lat}`

  services
    .calculateRoute({
      key: apiKey,
      // locations: '-122.510601,37.768014:-122.478468,37.769167',
      locations: locationString,
    })
    .go()
    .then(function (response) {
      var geojson = response.toGeoJson()

      if (map.value.getLayer('route')) {
        map.value.removeLayer('route')
        map.value.removeSource('route')
      }

      map.value.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'line-color': '#4a90e2',
          'line-width': 8,
        },
      })
      var bounds = new tt.LngLatBounds()
      geojson.features[0].geometry.coordinates.forEach(function (point) {
        bounds.extend(tt.LngLat.convert(point))
      })
      map.value.fitBounds(bounds, { padding: 20 })
    })
}
</script>

<style scoped>
.map-container {
  overflow: scroll;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.map {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background: white;
  padding: 10px;
  border-radius: 4px;
}

.marker {
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  display: block;
}
</style>
