<script setup>
const achievements = [
  {
    activity: "Rainwater Harvesting Structures",
    content: [
      "2869 rainwater harvesting tanks in 66 villages of Chirawa Panchayat Samiti covering 40,000 beneficiaries.",
      "A capacity to harvest more than 50 million litres annually has been created in villages and till date 411 million litres of water has been harvested.",
      "Construction of 46 recharge wells, 3060 soak pits and 5 ponds have significantly sustained the ground water table.",
      "Safe drinking water availability has been increased for usage round the year.",
      "A capacity to recharge 201 million litres annually has been created and till date 1200 million litres have been recharged benefitting 30,000 villagers.",
      "Actively participated in Mukhymantra al Swablamban Abhiyan(MJSA) and contributed appox. Rs. 68 Rs in terms of construction of water harvesting structures since inception of the progrmme.",
      "15 ground water table measuring wells to know the monthly fluctuation in ground water.",
      "To measure accurate rainfall at village level rain gauges in 38 villages of Chirawa Panchayat Samiti.",
      "The organization has a robust indepth study of ground water scenario of 35 villages of CHIRAWA by a scientific soil resistivity survey",
    ],
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
      "Till date it has constructed 1360 toilets benefitting 9,000 residents and created 22 Open Defecation free Villages, 4 Plastic free villages and 23 totally clean villages.",
    ],
  },
  {
    activity: "Women Empowerment",
    content: [
      "Women Empowerment through formation of 39 Self-Help Groups having 501 members. They saved Rs. 20.50 lakhs and have done loaning of Rs. 43.70 lakhs.",
    ],
  },
];
</script>
<template>
  <div class="text-h5 text-left q-pa-sm">About Us</div>
  <div class="row">
    <div class="col-8">
      <div class="text-h5 text-left q-pa-sm">An Introduction</div>
      <div class="q-pa-md text-body1 merriweather-regular text-justify">
        <p>
          <strong>Ramkrishna Jaidayal Dalmia Seva Sansthan</strong>Established
          in the year 2004, The RJDSS is an initiative by the Dalmia Group
          targeted at the rural development of Chirawa. We are currently working
          with 55000 people across 88 villages with a vision to bring “खुशहाली”
          with Equity, Harmony and Prosperity in Chirawa block of Jhunjhunu
          District of Shekhawati Region. In the last 14 years the areas of
          interventions were; drinking water, agriculture and livestock,
          sustainable use of natural resources, women’s empowerment, youth
          development and addressing various other social issues.
        </p>
        <p>
          Since water is a scarce resource in the region RJDSS major
          interventions were in the water sector, with the broad objective of
          ensuring safe and sustainable supply of drinking water by adopting
          Integrated Water Resource Management Approach. Water conservation and
          promotion of total sanitation in the villages has been successfully
          achieved in 15 villages and that was acclaimed nationally by awards
          (at different level by different organisations).
        </p>
        <p>
          The basic approach of the trust is to empower rural communities,
          revive their traditions of water conservation and rainwater harvesting
          by rehabilitating the older structures using modern scientific
          knowledge and technology in order to provide drinking water security
          in all climatic conditions.
        </p>
      </div>
      <div class="text-h5 merriweather-regular text-left q-px-sm">
        SOME OF OUR KEY ACHIEVEMENTS
      </div>
      <div class="text-body1 merriweather-regular text-left q-px-sm q-mb-md">
        <q-list
          bordered
          class="q-mb-md"
          v-for="(act, i) in achievements"
          :key="i"
        >
          <q-item>
            <div class="text-h5 merriweather-regular text-left q-px-sm">
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
    </div>
    <div class="col-4">
      <div class="text-h5 text-left q-pa-sm">Trustees</div>
    </div>
  </div>
</template>
