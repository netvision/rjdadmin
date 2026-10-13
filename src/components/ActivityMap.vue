<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  markers: { type: Array, default: () => [] },
  activityNames: { type: Object, default: () => ({}) },
  zoom: { type: Number, default: 9 },
  height: { type: String, default: "350px" },
});

const center = [28.235773, 75.651802];
const mapElement = ref(null);
let map;
let markerLayer;

const renderMarkers = () => {
  if (!markerLayer) return;
  markerLayer.clearLayers();

  L.circleMarker(center, { radius: 7, color: "#174d37", fillOpacity: 1 })
    .bindTooltip("Ramkrishna Jaidayal Dalmia Seva Sansthan")
    .addTo(markerLayer);

  props.markers.forEach((marker) => {
    const lat = Number(marker.position?.lat);
    const lng = Number(marker.position?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !lat || !lng) return;

    const popup = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = marker.title;
    popup.appendChild(title);

    const entries = Object.entries(marker.records || {});
    if (entries.length) {
      const table = document.createElement("table");
      entries.forEach(([id, count]) => {
        const row = table.insertRow();
        row.insertCell().textContent = props.activityNames[id] || `Activity ${id}`;
        row.insertCell().textContent = String(count);
      });
      popup.appendChild(table);
    }

    L.circleMarker([lat, lng], {
      radius: 6,
      color: "#176d48",
      fillColor: "#39a66a",
      fillOpacity: 0.85,
      weight: 2,
    })
      .bindTooltip(marker.title)
      .bindPopup(popup)
      .addTo(markerLayer);
  });
};

onMounted(() => {
  map = L.map(mapElement.value).setView(center, props.zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  renderMarkers();
});

watch(() => [props.markers, props.activityNames], renderMarkers);

onBeforeUnmount(() => {
  map?.remove();
});
</script>

<template>
  <div ref="mapElement" class="activity-map" :style="{ height }" role="region" aria-label="Map of RJDSS activity villages" />
</template>

<style scoped>
.activity-map {
  width: 100%;
  min-height: 350px;
  z-index: 0;
}
</style>
