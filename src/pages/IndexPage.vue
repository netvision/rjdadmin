<script setup>
import { computed, ref, onMounted } from "vue";
import { api } from "../boot/axios.js";
import { Vue3Marquee } from "vue3-marquee";
import ActivityMap from "../components/ActivityMap.vue";

const slide = ref("slide1");
const activities = ref([]);
const villages = ref([]);
const villageLoaded = ref(false);
const summaryError = ref(false);
const mapError = ref(false);

const activityNames = computed(() =>
  Object.fromEntries(activities.value.map((activity) => [activity.id, activity.title]))
);

const markers = computed(() =>
  villages.value.map((village) => ({
    position: { lat: village.latitude, lng: village.longitude },
    title: village.name,
    records: (village.records || []).reduce((counts, record) => {
      counts[record.activity_id] = (counts[record.activity_id] || 0) + 1;
      return counts;
    }, {}),
  }))
);

onMounted(async () => {
  const [activityResult, countResult, villageResult] = await Promise.allSettled([
    api.get("/activities"),
    api.get("/activity-records/activity-type-counts"),
    api.get("/villages?expand=records"),
  ]);

  if (activityResult.status === "fulfilled" && countResult.status === "fulfilled") {
    const counts = Object.fromEntries(
      countResult.value.data.map((item) => [item.activity_id, item.count])
    );
    activities.value = activityResult.value.data.map((activity) => ({
      ...activity,
      total: counts[activity.id] || 0,
    }));
  } else {
    summaryError.value = true;
  }

  if (villageResult.status === "fulfilled") {
    villages.value = villageResult.value.data;
    villageLoaded.value = true;
  } else {
    mapError.value = true;
  }
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
        of Chirawa.
        <span v-if="villageLoaded">
          The Sansthan's activities span
          {{ new Intl.NumberFormat("en-IN").format(villages.length) }} villages
          across Chirawa block.
        </span>
        Our vision is to bring “खुशहाली” with Equity, Harmony and
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
        <div class="title2 text-left q-pa-sm">Activities Summary</div>
        <p v-if="summaryError">Activity totals are temporarily unavailable.</p>
        <q-markup-table v-else class="q-mr-md">
          <tbody>
            <tr v-for="act in activities" :key="act.id">
              <td style="font-size: 18px; padding: 10x">{{ act.title }}</td>
              <td style="font-size: 18px; padding: 10px">
                {{ act.total }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col q-pa-md">
        <div class="title2 text-left q-pa-sm">Our activities on the map</div>
        <p v-if="mapError">Village locations are temporarily unavailable.</p>
        <ActivityMap v-else :markers="markers" :activity-names="activityNames" />
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
