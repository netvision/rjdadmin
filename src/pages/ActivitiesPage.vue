<script setup>
import { useActivityStats } from "../composables/useActivityStats.js";

const { activityCount, villageCount, formatCount, loading } = useActivityStats();
</script>

<template>
  <main class="container activities-page">
    <header class="page-heading">
      <span class="eyebrow">Our work</span>
      <h1 class="title1">Practical action.<br />Lasting change.</h1>
      <p>Our programmes connect water security, resilient livelihoods, and healthier villages.</p>
    </header>
    <div class="activities-page__visual">
      <img src="/images/slide5.jpg" alt="A rainwater harvesting structure built in a Chirawa village" />
      <span>Water is where it begins.</span>
    </div>
    <p v-if="loading" class="q-px-sm">Loading current activity totals…</p>
    <p v-else-if="activityCount(1) === null || villageCount(1) === null" class="q-px-sm">
      Current activity totals are temporarily unavailable.
    </p>
    <div class="title2 text-left q-pa-sm">Rooftop Rain Water Harvesting</div>
    <div class="q-pa-sm">
      <p>
        The drinking water quality in a part of Chirawa Panchayat Samiti is not
        fit for human consumption because of excessive TDS and fluoride
        contents. The Sansthan selected 35 villages in the region to ensure
        clean potable water. As part of this initiative, RJDSS started
        construction of Rooftop Rainwater Harvesting Structures called Tank
        (local name Tanka). These Rainwater Harvesting Tanks were underground
        tanks and are made up of cement and bricks. The water storage capacity
        of each tank is 20,000 liters. The availability of rainwater in those
        tanks relieves people from drinking high fluoride and excessive TDS
        water and save from the consequential health impact of polluted water.
      </p>

      <p>
        The Sansthan believes that the success and stability of an initiative
        can be ensured only by public participation. Hence, the beneficiaries
        contributed about 40 to 45 per cent of the cost of construction of
        tanks.
      </p>

      <p v-if="activityCount(1) !== null && villageCount(1) !== null">
        The Sansthan has recorded {{ formatCount(activityCount(1)) }} rooftop
        rainwater harvesting systems in {{ formatCount(villageCount(1)) }}
        villages.
      </p>
    </div>
    <div class="title2 text-left q-pa-sm">
      Recharge well - Village Rainwater Harvesting System
    </div>
    <div class="q-pa-sm">
      <p>
        Over flow of rain water from the household RWHT (storage tank), water
        from the roof other than the roof connected to RWHT and surface water
        within the geographical boundary of village is diverted to percolate
        into the ground.
      </p>

      <p>
        Sansthan has used two kind of recharge wells, one is of open well
        (Abandon well or new well) second is the Dug CUM Bore Well. Selection
        between above two depends upon the availability of water for recharge.
        If water availability is not higher –open wells being used which are
        normally of 50 to 90 feet of depths. In case of large amount of water
        availability a bore in the middle of the well use to be done to
        penetrate water directly to the ground level. Normally this penetration
        is just above (15-20 feet) the underground water level.
      </p>
      <p v-if="activityCount(2) !== null">
        The Sansthan has recorded {{ formatCount(activityCount(2)) }} recharge
        wells.
      </p>
    </div>
    <div class="title2 text-left q-pa-sm">Integrated Farming System</div>
    <div class="q-pa-sm">
      <p>
        Sustained increase in productivity of rain fed agricultural by promoting
        Integrated Farming System and adoption of new crop cultivation practices
        to bridge the gap between crops potential yield and present farmers
        yield. The specific objectives were:
      </p>
      <q-list class="text-body1 text-italic">
        <q-item>
          Sustained increase in productivity of rain fed agricultural by
          promoting Integrated Farming System and adoption of new crop
          cultivation practices to bridge the gap between crops potential yield
          and present farmers yield.
        </q-item>
        <q-item>
          To minimize the adverse impact on farmers income of climate
          variability and change by adoption of suitable adaptation and
          mitigating measures.
        </q-item>
        <q-item>
          Restoration of confidence in agriculture by improving farm
          productivity and creating sustained employment opportunities through
          improved non-farm income by diversification of agriculture and
          identifying non-farm activities.
        </q-item>
        <q-item>
          Increasing productivity of livestock owned by farmers.
        </q-item>
        <q-item>
          Optimal utilization of resources by convergence of existing large
          number of State and National developmental programmes in the project
          area.
        </q-item>
      </q-list>
      <p>
        Keeping in mind Integrated Farming System Approach selected two villages
        with 10 farmers in each village for field demonstration in year 2013-14.
        The outcomes of demonstrations were highly encouraging in terms of
        increase in productivity of the crops and saving in number of irrigation
        i.e., total water use. Therefore, it was decided to scale up the
        intervention by gradual increase in number of farmers in more number of
        villages for faster adoption of our recommendations.
      </p>
    </div>
    <div class="title2 text-left q-pa-sm">Clean Village Program</div>
    <div class="q-pa-sm">
      <p>
        It includes Individual Hygiene, Kitchen and house Hygiene, Disposal of
        Human excreta – open defecation, Village Hygiene, Proper disposal of
        animal excreta, Safe use of drinking water and Management for disposal
        of waste water.
      </p>
      <h4 class="title3 text-italic">Toilet Construction</h4>
      <p>
        Poorest of the poor of the society has been target for construction of
        toilets. This is the most vulnerable section of the society and their
        priority is food and shelter where is toilets secondary for them.
        Awareness and financial assistance has made them able to construct
        toilets in their houses. It has also helped in cleaning of atmosphere as
        well as social security for women. This is an important activity by
        which hygiene at house and as well as at village could be maintained.
      </p>
      <h4 class="title3 text-italic">Soakpit Construction</h4>
      <p>
        Soak pits, also known as soak away or leach pit, is covered, chambers
        and rings that allows water to slowly soak into the ground. Pre settled
        waste water or grey water from bathroom passes from a ring which is 1
        feet deep and of 1 feet diameter. This chamber contains Clay bricks
        which soak oily substance and other impurities present in water. After
        passing through this chamber, water is now through pipeline passes in
        the cemented rings made up of cement, concrete and iron rings. Each
        cemented ring is 1 ¼ feet deep and of 2.5 feet diameter. Total depth of
        soak pit is 10 feet. This whole working helps in storing / treatment
        facility or collected impure water to the underground chamber from where
        it filters into the surrounding soil.
      </p>
      <p
        v-if="activityCount(7) !== null && activityCount(6) !== null && villageCount(6, 7) !== null"
      >
        The Sansthan has recorded {{ formatCount(activityCount(7)) }} toilets and
        {{ formatCount(activityCount(6)) }} soak pits in
        {{ formatCount(villageCount(6, 7)) }} villages in Chirawa Panchayat
        Samiti Area.
      </p>
    </div>
  </main>
</template>
<style scoped></style>
