<script setup>
import { ref, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { api } from "../boot/axios.js";

const mapApi = process.env.MAP_KEY;
const center = { lat: 28.235773, lng: 75.651802 };
const activities = ref([]);
const villages = ref([]);
const markers = ref([]);

const v_id = ref();
const village = ref({});

const getActName = (id) => {
  return activities.value.filter((act) => act.id == id)[0].title;
};

const getProfile = async () => {
  village.value = await api
    .get(`villages/${v_id.value}?expand=geologies,demographies,croppatterns`)
    .then((r) => r.data);
  village.value.records = markers.value.filter(
    (m) => m.v_id === village.value.id
  )[0].records;
};

onMounted(async () => {
  activities.value = await api
    .get("/activities?expand=records")
    .then((r) => r.data);

  villages.value = await api
    .get("/villages?expand=records")
    .then((r) => r.data);

  villages.value.forEach((v) => {
    let records = v.records.reduce((acc, rec) => {
      if (acc[rec.activity_id]) {
        acc[rec.activity_id] += 1;
      } else acc[rec.activity_id] = 1;
      return acc;
    }, {});
    let mark = {
      position: { lat: +v.latitude, lng: +v.longitude },
      title: v.name,
      v_id: v.id,
      records: records,
    };
    markers.value.push(mark);
  });

  console.log(villages.value);
});
</script>

<template>
  <div class="text-h5 text-left q-pa-sm">
    Village Profiles
    <q-select
      v-if="villages"
      outlined
      v-model="v_id"
      :options="villages"
      option-label="name"
      option-value="id"
      map-options
      emit-value
      label="Please select the village..."
      @update:model-value="getProfile"
    />
  </div>
  <div class="q-pa-md">
    <GoogleMap
      v-if="!v_id"
      :api-key="mapApi"
      style="width: 100%; height: 650px"
      :center="center"
      :zoom="11"
    >
      <Marker
        :options="{
          position: center,
          title: 'Ramkrishna Jaidayal Dalmia Seva Sansthan',
        }"
      />
      <Marker
        v-for="(mark, i) in markers"
        :key="i"
        :options="{
          position: mark.position,
          title: mark.title,
        }"
      >
        <InfoWindow>
          <h5>{{ mark.title }}</h5>
          <div>
            <q-markup-table class="q-ma-md">
              <tbody>
                <tr v-for="(value, key) in mark.records" :key="key">
                  <td>{{ getActName(key) }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
    <div v-else>
      <div class="text-h4 text-left q-pa-sm">
        {{ village.name }}
      </div>
      <div v-if="village.demographies">
        <div class="row">
          <div class="col">
            <div v-html="village.demographies[0].map_link" />
          </div>
          <div class="col">
            <h4 class="text-h4 text-left q-pa-sm">Demographic Profile</h4>
            <table>
              <tr>
                <td><span class="text-bold">Population</span></td>
                <td>
                  <span class="text-bold">{{
                    village.demographies[0].population
                  }}</span>
                </td>
              </tr>
              <tr>
                <td>Male</td>
                <td>{{ village.demographies[0].male }}</td>
              </tr>
              <tr>
                <td>Female</td>
                <td>{{ village.demographies[0].female }}</td>
              </tr>
              <tr>
                <td>Total Households</td>
                <td>{{ village.demographies[0].total_households }}</td>
              </tr>
              <tr>
                <td colspan="2">Land use</td>
              </tr>
              <tr>
                <td>Area of Village</td>
                <td>{{ village.demographies[0].total_land_area }}</td>
              </tr>
              <tr>
                <td>Total Irrigated Area</td>
                <td>{{ village.demographies[0].irrigated_area }}</td>
              </tr>
              <tr>
                <td>Un-Irrigated Area</td>
                <td>{{ village.demographies[0].unirrigated_area }}</td>
              </tr>
              <tr>
                <td>Cultivable Waste Area (Including gochar and groves)</td>
                <td>{{ village.demographies[0].cultivable_waste_area }}</td>
              </tr>
              <tr>
                <td>Area not available of cultivation</td>
                <td></td>
              </tr>
              <tr>
                <td>Total No of Tubewell</td>
                <td>{{ village.demographies[0].tubewells }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4 class="text-h4 text-left q-pa-sm">Geology</h4>
            <p v-html="village.demographies[0].geology_profile"></p>
            <h4 class="text-h4 text-left q-pa-sm">
              Layers of Lithological Formation
            </h4>
            <table>
              <tr
                v-for="(layer, key) in JSON.parse(
                  village.demographies[0].lithological_formation
                )"
                :key="key"
              >
                <td>{{ key }}</td>
                <td>{{ layer }}</td>
              </tr>
            </table>
          </div>
          <div class="col">
            <h4 class="text-h4 text-left q-pa-sm">Lithological Charts</h4>
            <div
              v-for="(chart, i) in village.demographies[0].litho_charts.split(
                ','
              )"
              :key="i"
            >
              <q-img
                :src="`https://api2.dalmiatrusts.in/v/${chart}`"
                height="200px"
                width="200px"
              />
            </div>
          </div>
        </div>
        <div>
          <h4 class="text-h4 text-left q-pa-sm">RJDSS Intervention</h4>
          <table>
            <tr v-for="(rec, key) in village.records" :key="key">
              <td>{{ getActName(key) }}</td>
              <td>{{ rec }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
