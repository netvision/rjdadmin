<script setup>
import { ref, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { api } from "../boot/axios.js";
import { Vue3Marquee } from "vue3-marquee";

const slide = ref("slide1");
const mapApi = process.env.MAP_KEY;
const center = { lat: 28.235773, lng: 75.651802 };
const activities = ref([]);
const villages = ref([]);
const markers = ref([]);

const getActName = (id) => {
  return activities.value.filter((act) => act.id == id)[0].title;
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
      records: records,
    };
    markers.value.push(mark);
  });
});
</script>

<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      infinite
      autoplay
      control-color="white"
      arrows
      height="500px"
      class="bg-white text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="slide1" class="column no-wrap flex-center">
        <q-img src="/images/slide1.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide2" class="column no-wrap flex-center">
        <q-img src="/images/slide2.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide3" class="column no-wrap flex-center">
        <q-img src="/images/slide3.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide4" class="column no-wrap flex-center">
        <q-img src="/images/slide4.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide5" class="column no-wrap flex-center">
        <q-img src="/images/slide5.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide5" class="column no-wrap flex-center">
        <q-img src="/images/slide6.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide5" class="column no-wrap flex-center">
        <q-img src="/images/slide7.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide5" class="column no-wrap flex-center">
        <q-img src="/images/slide8.jpg" />
      </q-carousel-slide>
      <q-carousel-slide name="slide5" class="column no-wrap flex-center">
        <q-img src="/images/slide9.jpg" />
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="container">
    <div class="text-justify q-mt-xl">
      <p>
        Established in the year 2004, The
        <strong>Ramkrishna Jaidayal Dalmia Seva Sansthan</strong>
        is an initiative by the Dalmia Group targeted at the rural development
        of Chirawa. We are currently working with 55000 people across 88
        villages with a vision to bring “खुशहाली” with Equity, Harmony and
        Prosperity in Chirawa block of Jhunjhunu District of Shekhawati Region.
        In the last 14 years the areas of interventions were; drinking water,
        agriculture and livestock, sustainable use of natural resources, women’s
        empowerment, youth development and addressing various other social
        issues.
      </p>
      <p>
        Since water is a scarce resource in the region RJDSS major interventions
        were in the water sector, with the broad objective of ensuring safe and
        sustainable supply of drinking water by adopting Integrated Water
        Resource Management Approach. Water conservation and promotion of total
        sanitation in the villages has been successfully achieved in 15 villages
        and that was acclaimed nationally by awards (at different level by
        different organisations).
      </p>
      <p>
        The basic approach of the trust is to empower rural communities, revive
        their traditions of water conservation and rainwater harvesting by
        rehabilitating the older structures using modern scientific knowledge
        and technology in order to provide drinking water security in all
        climatic conditions.
      </p>
    </div>
    <div class="row q-gutter-sm">
      <div class="col q-pa-md">
        <div class="title2 text-left q-pa-sm">Activities Summery</div>
        <q-markup-table class="q-mr-md">
          <tbody>
            <tr v-for="act in activities" :key="act.id">
              <td style="font-size: 18px; padding: 10x">{{ act.title }}</td>
              <td style="font-size: 18px; padding: 10px">
                {{ act.records.length }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col q-pa-md">
        <div class="title2 text-left q-pa-sm">Our activities on Google Map</div>
        <GoogleMap
          :api-key="mapApi"
          style="width: 100%; height: 350px"
          :center="center"
          :zoom="9"
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
      </div>
    </div>
    <div class="q-pa-md">
      <h3 class="title2">Some of Our Collaborators</h3>
      <Vue3Marquee clone>
        <img height="150" src="/images/dst2.jpg" />
        <img height="150" src="/images/ceeri.jpg" />
        <img height="150" src="/images/NABARD_logo.png" />
        <img height="150" src="/images/ceds.jpg" />
        <img height="150" src="/images/ground-water.jpg" />
        <img height="150" src="/images/doa-rajasthan.jpg" />
        <img height="150" src="/images/kscst_eng_logo.jpg" />
        <img height="150" src="/images/mnit.jpg" />
        <img height="150" src="/images/PHED-Logo.jpg" />
        <img height="150" src="/images/uor-logo.jpg" />
      </Vue3Marquee>
    </div>
  </div>
</template>

<style scoped>
.img-responsive {
  width: 100%;
  height: auto;
}
</style>
