<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const mapRef = ref(null)
const map = ref(null)

onMounted(() => {
  const apiKey = import.meta.env.VITE_API_KEY_TOMTOM
  const centerCoords = [-73.6185, 4.1412]
  const initialZoom = 12

  var styleBase = 'tomtom://vector/1/'
  var styleS1 = 's1'
  var styleRelative = 'relative'
  var refreshTimeInMillis = 30000

  var trafficIncidentsTier = new tt.TrafficIncidentTier({
    key: apiKey,
    incidentDetails: {
      style: styleS1,
    },
    incidentTiles: {
      style: styleBase + styleS1,
    },
    refresh: refreshTimeInMillis,
  })

  var trafficFlowTilesTier = new tt.TrafficFlowTilesTier({
    key: apiKey,
    style: styleBase + styleRelative,
    refresh: refreshTimeInMillis,
  })

  map.value = tt.map({
    key: apiKey,
    container: mapRef.value,
    center: centerCoords,
    zoom: initialZoom,
  })

  map.value.addControl(new tt.FullscreenControl())
  map.value.addControl(new tt.NavigationControl())
  map.value.addTier(trafficIncidentsTier)
  map.value.addTier(trafficFlowTilesTier)
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<template>
  <div class="map-container">
    <h2 style="text-align: center; margin-bottom: 30px">
      Mapa de Villavicencio
    </h2>
    <div class="map-wrapper">
      <div id="map" ref="mapRef" class="map"></div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.map {
  width: 100%;
  height: 100%;
}
</style>
