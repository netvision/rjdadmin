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
let streetTiles;
let imageryTiles;
let indiaBoundary;

// Raster OSM tiles show the de facto Line of Control. Use border-free imagery
// whenever the India outline or the Kashmir region may be visible.
const kashmirBounds = L.latLngBounds([32.5, 71.5], [37.5, 79.5]);

const updateBaseMap = () => {
  if (!map) return;
  const showIndiaBoundary = map.getZoom() <= 6 || map.getBounds().intersects(kashmirBounds);
  if (showIndiaBoundary) {
    if (map.hasLayer(streetTiles)) map.removeLayer(streetTiles);
    if (!map.hasLayer(imageryTiles)) imageryTiles.addTo(map);
    if (indiaBoundary && !map.hasLayer(indiaBoundary)) indiaBoundary.addTo(map);
  } else {
    if (map.hasLayer(imageryTiles)) map.removeLayer(imageryTiles);
    if (indiaBoundary && map.hasLayer(indiaBoundary)) map.removeLayer(indiaBoundary);
    if (!map.hasLayer(streetTiles)) streetTiles.addTo(map);
  }
};

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
  streetTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  imageryTiles = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Imagery: <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics, GIS User Community',
  });
  markerLayer = L.layerGroup().addTo(map);
  map.on("moveend", updateBaseMap);
  updateBaseMap();
  fetch(`${import.meta.env.BASE_URL}maps/india-boundary.geojson`)
    .then((response) => {
      if (!response.ok) throw new Error(`India boundary: HTTP ${response.status}`);
      return response.json();
    })
    .then((geojson) => {
      if (!map) return;
      indiaBoundary = L.geoJSON(geojson, {
        interactive: false,
        style: { color: "#fff", weight: 5, opacity: 0.95, fill: false },
      });
      L.geoJSON(geojson, {
        interactive: false,
        style: { color: "#d66a21", weight: 2.5, opacity: 1, fill: false },
      }).addTo(indiaBoundary);
      map.attributionControl.addAttribution('<a href="https://surveyofindia.gov.in/pages/outline-maps-of-india">India boundary &copy; Survey of India</a>');
      updateBaseMap();
    })
    .catch((error) => console.error("Could not load Survey of India boundary", error));
  renderMarkers();
});

watch(() => [props.markers, props.activityNames], renderMarkers);

onBeforeUnmount(() => {
  map?.remove();
  map = undefined;
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
