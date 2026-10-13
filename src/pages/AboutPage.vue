<script setup>
import { computed } from "vue";
import { useActivityStats } from "../composables/useActivityStats.js";

const { activityCount, villageCount, totalVillages, formatCount } =
  useActivityStats();

const achievements = computed(() => [
  {
    activity: "Rainwater Harvesting Structures",
    content: [
      activityCount(1) !== null && villageCount(1) !== null
        ? `${formatCount(activityCount(1))} rainwater harvesting tanks in ${formatCount(villageCount(1))} villages of Chirawa Panchayat Samiti.`
        : null,
      "A capacity to harvest more than 50 million litres annually has been created in villages and till date 411 million litres of water has been harvested.",
      activityCount(2) !== null && activityCount(6) !== null && activityCount(8) !== null
        ? `Construction of ${formatCount(activityCount(2))} recharge wells, ${formatCount(activityCount(6))} soak pits and ${formatCount(activityCount(8))} ponds has significantly sustained the ground water table.`
        : null,
      "Safe drinking water availability has been increased for usage round the year.",
      "A capacity to recharge 201 million litres annually has been created and till date 1200 million litres have been recharged benefitting 30,000 villagers.",
      "The Sansthan participated in the Mukhyamantri Jal Swavlamban Abhiyan (MJSA) by helping construct water harvesting structures.",
      "15 ground water table measuring wells to know the monthly fluctuation in ground water.",
      villageCount(3) !== null
        ? `Rain gauges support rainfall measurement in ${formatCount(villageCount(3))} villages of Chirawa Panchayat Samiti.`
        : null,
      "The organization has a robust indepth study of ground water scenario of 35 villages of CHIRAWA by a scientific soil resistivity survey",
    ].filter(Boolean),
  },
  {
    activity: "Integrated Farming System to reduce ground water depletion",
    content: [
      "Working with 1700 farmers in 3300 hectare area to save 6830 million litres of water annually as well an increase in Income Rs. 816 lacs to these farmers.",
      "Before that total extraction of ground water was 17,600 million litres which was reduced to 10,800 million litres. Over the next 5 years, there will be a further substantial reduction in this extraction.",
      "The Farmers are benefitted from demonstrations and inputs on improved variety seeds, fertilizer and technical know-how provided by the organization, resulting in enhancing their income by 25.53%. Production of 1700 farmers (per 4 bighas of land) has increased by 22.22% to 50% depending on the crop.",
    ],
  },
  {
    activity: "Environment Protection, Conservation and Promotion",
    content: [
      "Under the Conservation of Environment activity more than 2 lakh plants have been planted on community land as well as on individual farms.",
      "202 orchards of Kinnow, Nimboo, Muashmi, Beel etc. have been promoted.",
    ],
  },
  {
    activity: "Open Defecation, plastic free and totally clean village",
    content: [
      "Under total sanitation campaign, RJDSS ensures 100% toilet construction as well as their use.",
      activityCount(7) !== null
        ? `The activity database records ${formatCount(activityCount(7))} toilets.`
        : null,
      "The campaign has also created 22 Open Defecation free villages, 4 Plastic free villages and 23 totally clean villages.",
    ].filter(Boolean),
  },
  {
    activity: "Women Empowerment",
    content: [
      "Women Empowerment through formation of 39 Self-Help Groups having 501 members. They saved Rs. 20.50 lakhs and have done loaning of Rs. 43.70 lakhs.",
    ],
  },
]);
</script>
<template>
  <main class="container about-page">
    <header class="page-heading">
      <span class="eyebrow">A story of service</span>
      <h1 class="title1">Rooted in Chirawa.<br />Growing with its people.</h1>
      <p>Discover the people and purpose behind our work.</p>
    </header>
    <div class="title2 text-left q-pa-sm">Our story</div>
    <div class="about-page__story text-body1">
      <p>
        Founded in 2004, the <strong>Ramkrishna Jaidayal Dalmia Seva Sansthan</strong>
        is a Dalmia Group initiative working alongside rural communities in Chirawa.
        <span v-if="totalVillages() !== null">
          The Sansthan's activities span
          {{ formatCount(totalVillages()) }} villages across Chirawa block.
        </span>
        Our vision is to bring “खुशहाली” through equity, harmony, and prosperity.
        Our work spans drinking water, agriculture and livestock, natural resources,
        women's empowerment, and youth development.
      </p>
      <p>
        Water scarcity shapes life in the region. We focus on dependable drinking
        water through an integrated approach to water conservation, recharge,
        and sanitation. This community-led work has earned national recognition.
      </p>
      <p>
        We pair traditional water conservation knowledge with modern science to
        restore existing structures and build practical solutions that communities
        can sustain.
      </p>
    </div>

    <div class="about-page__banner">
      <img src="/images/slide3.jpg" alt="A community learning event organized by RJDSS" loading="lazy" />
      <span>Progress is a collective effort.</span>
    </div>

    <div class="title2 text-left q-pa-sm">Trustees</div>
    <div class="row q-gutter-md q-px-sm">
      <div class="col">
        <q-card class="my-card">
          <img src="/images/rh.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Shri Raghu Hari Dalmia</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="my-card">
          <img src="/images/abh.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Shri Abhishek Dalmia</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="my-card">
          <div style="height: 250px">&nbsp;</div>
          <q-card-section>
            <div class="text-h6">Shri Chaitanya Dalmia</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="my-card">
          <img src="/images/vr.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Shri Vikas Rastogi</div>
            <div class="text-subtitle2"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="title2 text-left q-pa-sm">Advisory Council</div>
    <div class="row q-gutter-md q-px-sm">
      <div class="col">
        <q-card class="my-card">
          <img src="/images/rajendrasingh.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Shri Rajendra Singh</div>
            <div class="text-subtitle2">President, Rastriya Jal Biradari</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="my-card">
          <img src="/images/msrathore.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Prof. M.S.Rathore</div>
            <div class="text-subtitle2">
              Director, Center for Environment and Development Studies, Jaipur
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="my-card">
          <img src="/images/niranjan.jpg" style="height: 250px" />
          <q-card-section>
            <div class="text-h6">Shri Niranjan Singh</div>
            <div class="text-subtitle2">
              Secretary, Samgra Vikas Sansthan, Jhunjhunu
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="my-card">
          <img src="/images/hanuman.jpg" style="height: 250px" />

          <q-card-section>
            <div class="text-h6">Dr. Hanuman Prasad</div>
            <div class="text-subtitle2">
              Former Director (Edu. Ext.), Swami Keshvanand Agriculture
              University, Bikaner
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="title2 text-left q-px-sm">SOME OF OUR KEY ACHIEVEMENTS</div>
    <div class="text-body1 merriweather-regular text-left q-px-sm q-mb-md">
      <q-list class="q-mb-md achievement-list" v-for="(act, i) in achievements" :key="i">
        <q-item>
          <div class="title3 merriweather-regular text-left q-px-sm">
            {{ act.activity }}
          </div>
        </q-item>
        <q-item>
          <q-list separator>
            <q-item v-for="(cont, i) in act.content" :key="i">
              <q-item-section>
                {{ cont }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-item>
      </q-list>
    </div>
  </main>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  margin: 0
</style>
