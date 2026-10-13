<script setup>
import { computed, onMounted, ref } from "vue";
import { api } from "../boot/axios.js";
import ActivityMap from "../components/ActivityMap.vue";

const activities = ref([]);
const villages = ref([]);
const dataLoaded = ref(false);
const summaryError = ref(false);
const mapError = ref(false);

const formatCount = (value) => new Intl.NumberFormat("en-IN").format(value);
const activityCount = (id) => activities.value.find((item) => item.id === id)?.total;
const activityNames = computed(() =>
  Object.fromEntries(activities.value.map((item) => [item.id, item.title]))
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

const partners = [
  { image: "NABARD_logo.png", name: "NABARD" },
  { image: "ceeri.jpg", name: "CEERI" },
  { image: "dst2.jpg", name: "Department of Science and Technology" },
  { image: "mnit.jpg", name: "MNIT Jaipur" },
  { image: "PHED-Logo.jpg", name: "PHED Rajasthan" },
];

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
    activities.value = activityResult.value.data.map((item) => ({
      ...item,
      total: counts[item.id] || 0,
    }));
  } else {
    summaryError.value = true;
  }

  if (villageResult.status === "fulfilled") {
    villages.value = villageResult.value.data;
  } else {
    mapError.value = true;
  }
  dataLoaded.value = true;
});
</script>

<template>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__photo" />
      <div class="hero__overlay" />
      <div class="site-shell hero__content">
        <div class="hero__copy">
          <span class="hero__eyebrow">Rural progress, rooted in people</span>
          <h1 id="hero-title">Every drop.<br />Every village.<br /><em>Every possibility.</em></h1>
          <p>
            We work with communities across Chirawa to conserve water, strengthen
            livelihoods, and build a more prosperous future together.
          </p>
          <div class="hero__actions">
            <router-link to="/activities" class="action-button action-button--sun">
              Explore our work <q-icon name="arrow_forward" size="20px" />
            </router-link>
            <router-link to="/about" class="action-button action-button--ghost">Our story</router-link>
          </div>
        </div>
        <div class="hero__motto" lang="hi">खुशहाली <span>for every community</span></div>
      </div>
      <div class="hero__index">01 / PEOPLE &amp; PLACE</div>
    </section>

    <section class="impact-strip site-shell" aria-label="Our reach">
      <div class="impact-strip__lead">
        <span class="eyebrow">The work in numbers</span>
        <strong>Change you can see.</strong>
      </div>
      <div class="impact-strip__stat">
        <strong>{{ dataLoaded && !mapError ? formatCount(villages.length) : "—" }}</strong>
        <span>villages in Chirawa block</span>
      </div>
      <div class="impact-strip__stat">
        <strong>{{ activityCount(1) !== undefined ? formatCount(activityCount(1)) : "—" }}</strong>
        <span>rainwater harvesting tanks</span>
      </div>
      <div class="impact-strip__stat">
        <strong>{{ activityCount(2) !== undefined ? formatCount(activityCount(2)) : "—" }}</strong>
        <span>recharge wells</span>
      </div>
    </section>

    <section class="site-shell purpose-section section-block">
      <div class="purpose-section__heading">
        <span class="eyebrow">Why we do what we do</span>
        <h2>Building a future<br />that <em>flows forward.</em></h2>
      </div>
      <div class="purpose-section__body">
        <p>
          The Ramkrishna Jaidayal Dalmia Seva Sansthan began in 2004 with a
          simple belief: lasting progress grows when communities shape it for
          themselves.
        </p>
        <p>
          In the water-scarce Shekhawati region, we bring local knowledge and
          practical solutions together. From harvesting rainwater to supporting
          agriculture and village wellbeing, our work is designed to endure.
        </p>
        <router-link to="/about" class="text-link">Get to know us <q-icon name="north_east" size="18px" /></router-link>
      </div>
    </section>

    <section class="work-section section-block">
      <div class="site-shell">
        <div class="work-section__heading">
          <div>
            <span class="eyebrow">What we focus on</span>
            <h2 class="title2">A stronger tomorrow starts here.</h2>
          </div>
          <router-link to="/activities" class="text-link">View all activities <q-icon name="north_east" size="18px" /></router-link>
        </div>
        <div class="work-grid">
          <router-link to="/activities" class="work-card work-card--water">
            <img src="/images/slide5.jpg" alt="A rainwater harvesting tank in a Chirawa village" loading="lazy" />
            <span class="work-card__number">01 / WATER</span>
            <div class="work-card__body">
              <h3>Water for every season</h3>
              <p>Rainwater harvesting and groundwater recharge for lasting water security.</p>
              <span>Explore this work <q-icon name="arrow_forward" size="19px" /></span>
            </div>
          </router-link>
          <router-link to="/activities" class="work-card work-card--farm">
            <img src="/images/slide2.jpg" alt="A farmer in a demonstration field" loading="lazy" />
            <span class="work-card__number">02 / LIVELIHOODS</span>
            <div class="work-card__body">
              <h3>Thriving rural livelihoods</h3>
              <p>Working with farmers to grow resilience, knowledge, and opportunity.</p>
              <span>Explore this work <q-icon name="arrow_forward" size="19px" /></span>
            </div>
          </router-link>
          <router-link to="/activities" class="work-card work-card--community">
            <img src="/images/slide4.jpg" alt="Community members gathered for a village programme" loading="lazy" />
            <span class="work-card__number">03 / COMMUNITY</span>
            <div class="work-card__body">
              <h3>Progress built together</h3>
              <p>Supporting sanitation, shared learning, and stronger village communities.</p>
              <span>Explore this work <q-icon name="arrow_forward" size="19px" /></span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="field-section section-block">
      <div class="site-shell">
        <div class="field-section__intro">
          <span class="eyebrow eyebrow--light">On the ground</span>
          <h2>Where our work takes root.</h2>
          <p>Explore the villages and activities recorded across the Chirawa region.</p>
        </div>
        <div class="field-grid">
          <div class="field-summary">
            <div class="field-summary__head"><span>Recorded activities</span><span>Total</span></div>
            <p v-if="summaryError" class="field-summary__message">Activity totals are temporarily unavailable.</p>
            <div v-else-if="!dataLoaded" class="field-summary__message">Loading current totals…</div>
            <div v-for="activity in activities" :key="activity.id" class="field-summary__row">
              <span>{{ activity.title }}</span><strong>{{ formatCount(activity.total) }}</strong>
            </div>
            <router-link to="/villages" class="field-summary__link">Explore village profiles <q-icon name="arrow_forward" size="18px" /></router-link>
          </div>
          <div class="field-map">
            <ActivityMap v-if="!mapError" :markers="markers" :activity-names="activityNames" height="460px" />
            <p v-else>Village locations are temporarily unavailable.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="partners-section site-shell section-block">
      <div class="partners-section__heading">
        <span class="eyebrow">Better together</span>
        <h2 class="title2">Partners in progress.</h2>
        <p>Collaboration makes community-led change possible.</p>
      </div>
      <div class="partner-logos">
        <div v-for="partner in partners" :key="partner.name" class="partner-logos__item">
          <img :src="`/images/${partner.image}`" :alt="partner.name" loading="lazy" />
        </div>
      </div>
      <router-link to="/collaborators" class="text-link">Meet our collaborators <q-icon name="north_east" size="18px" /></router-link>
    </section>

    <section class="report-cta">
      <div class="site-shell report-cta__inner">
        <div>
          <span class="eyebrow">Our journey, documented</span>
          <h2>Explore the work behind the numbers.</h2>
        </div>
        <router-link to="/reports" class="action-button action-button--forest">Read our reports <q-icon name="arrow_forward" size="20px" /></router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero { position: relative; min-height: 37rem; display: flex; align-items: center; isolation: isolate; overflow: hidden; color: white; background: var(--forest-deep); }
.hero__photo, .hero__overlay { position: absolute; inset: 0; z-index: -1; }
.hero__photo { background: url('/images/slide1.jpg') center 42% / cover no-repeat; transform: scale(1.035); animation: settle 1.5s ease-out forwards; }
.hero__overlay { background: linear-gradient(90deg, rgba(7,43,36,.94), rgba(8,51,44,.78) 44%, rgba(10,48,40,.17) 100%), linear-gradient(0deg, rgba(10,45,39,.45), transparent 45%); }
.hero__content { display: flex; flex-direction: column; justify-content: center; gap: 2rem; padding-block: 4.5rem 5.5rem; }
.hero__copy { max-width: 43rem; animation: rise .8s ease-out both; }
.hero__eyebrow { display: inline-block; padding: .5rem .8rem; border: 1px solid rgba(255,255,255,.5); border-radius: 999px; color: #eef7ec; font-size: .7rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.hero h1 { margin: 1.5rem 0 1.2rem; font-family: var(--display); font-size: clamp(2.45rem, 8vw, 6.7rem); line-height: 1.04; letter-spacing: -.05em; }
.hero h1 em { color: #f2c37a; font-style: italic; }
.hero p { max-width: 35rem; color: #e2efe6; font-size: 1.04rem; line-height: 1.7; }
.hero__actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
.hero__motto { align-self: flex-start; color: #fff7e3; font-family: 'Noto Sans Devanagari', sans-serif; font-size: 1.6rem; font-weight: 700; }
.hero__motto span { display: block; color: #dce9df; font-family: var(--body); font-size: .64rem; font-weight: 600; letter-spacing: .17em; text-transform: uppercase; }
.hero__index { position: absolute; right: 1.5rem; bottom: 1.4rem; color: rgba(255,255,255,.8); font-size: .65rem; font-weight: 700; letter-spacing: .18em; }
.action-button { display: inline-flex; align-items: center; justify-content: center; gap: .7rem; min-height: 3.1rem; padding: .85rem 1.25rem; border-radius: .35rem; font-size: .87rem; font-weight: 700; text-decoration: none; transition: transform .2s, background .2s, color .2s; }
.action-button:hover { transform: translateY(-3px); }
.action-button--sun { background: var(--sun); color: var(--forest-deep); }
.action-button--sun:hover { background: #f7bd68; }
.action-button--ghost { border: 1px solid rgba(255,255,255,.7); color: white; }
.action-button--ghost:hover { background: rgba(255,255,255,.12); }
.action-button--forest { background: var(--forest); color: white; }
.impact-strip { position: relative; z-index: 2; display: grid; margin-top: -2.1rem; padding: 1.6rem; border-radius: .7rem; background: var(--paper); box-shadow: 0 1rem 3rem rgba(14,64,51,.1); }
.impact-strip > * + * { border-top: 1px solid var(--line); }
.impact-strip__lead, .impact-strip__stat { display: grid; align-content: center; gap: .25rem; padding: 1rem .25rem; }
.impact-strip__lead strong { font-family: var(--display); font-size: 1.45rem; line-height: 1.2; }
.impact-strip__stat strong { color: var(--forest); font-family: var(--display); font-size: clamp(2.1rem, 4vw, 3.1rem); line-height: 1; }
.impact-strip__stat span { color: var(--muted); font-size: .79rem; font-weight: 600; }
.purpose-section { display: grid; gap: 2rem; align-items: start; }
.purpose-section h2 { margin: 1.2rem 0 0; color: var(--forest); font-family: var(--display); font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.12; letter-spacing: -.045em; }
.purpose-section h2 em { color: var(--teal); }
.purpose-section__body { max-width: 37rem; color: var(--muted); }
.purpose-section__body p:first-child { margin-top: 0; color: var(--ink); font-size: 1.13rem; }
.text-link { display: inline-flex; align-items: center; gap: .55rem; width: fit-content; margin-top: .7rem; padding-bottom: .25rem; border-bottom: 2px solid var(--sun); color: var(--forest); font-size: .87rem; font-weight: 700; text-decoration: none; }
.text-link:hover { color: var(--teal); }
.work-section { background: #e8f1e7; }
.work-section__heading { display: flex; flex-direction: column; gap: .7rem; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.work-section__heading h2 { margin: 1rem 0 0; }
.work-grid { display: grid; gap: 1rem; }
.work-card { position: relative; min-height: 27rem; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; border-radius: .45rem; color: white; text-decoration: none; isolation: isolate; }
.work-card::after { position: absolute; inset: 0; z-index: -1; background: linear-gradient(0deg, rgba(7,36,30,.94), rgba(7,36,30,.15) 70%); content: ""; }
.work-card img { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.work-card:hover img { transform: scale(1.06); }
.work-card--water img { object-position: 42% center; }
.work-card--farm img { object-position: 63% center; }
.work-card--community img { object-position: 50% center; }
.work-card__number { position: absolute; top: 1.5rem; left: 1.5rem; padding: .45rem .65rem; border-radius: .2rem; background: rgba(255,255,255,.9); color: var(--forest); font-size: .7rem; font-weight: 700; letter-spacing: .1em; }
.work-card__body { padding: 1.5rem; }
.work-card h3 { margin: 0 0 .5rem; font-family: var(--display); font-size: 2rem; line-height: 1.1; }
.work-card p { max-width: 28ch; margin: 0 0 1.2rem; color: #e8f2e9; font-size: .87rem; }
.work-card__body span { display: inline-flex; align-items: center; gap: .45rem; color: #f4c678; font-size: .8rem; font-weight: 700; }
.field-section { background: var(--forest); color: white; }
.field-section__intro { max-width: 47rem; margin-bottom: 2rem; }
.field-section__intro h2 { margin: .9rem 0 .7rem; font-family: var(--display); font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.12; letter-spacing: -.04em; }
.field-section__intro p { color: #cce0d3; }
.field-grid { display: grid; gap: 1.2rem; }
.field-summary { display: flex; flex-direction: column; padding: 1.3rem; border: 1px solid rgba(255,255,255,.18); border-radius: .45rem; background: rgba(255,255,255,.07); }
.field-summary__head { display: flex; justify-content: space-between; padding-bottom: 1rem; color: #a8d8c8; font-size: .72rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.field-summary__row { display: flex; justify-content: space-between; gap: 1rem; padding: .84rem 0; border-top: 1px solid rgba(255,255,255,.16); font-size: .87rem; }
.field-summary__row strong { color: #f0c178; font-family: var(--display); font-size: 1.25rem; line-height: 1; }
.field-summary__message { color: #e4ede6; }
.field-summary__link { display: inline-flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; padding-top: 1.2rem; color: #f0c178; font-size: .85rem; font-weight: 700; text-decoration: none; }
.field-map { overflow: hidden; border-radius: .45rem; background: #d8e9df; color: var(--forest); }
.field-map p { padding: 1.5rem; }
.partners-section { text-align: center; }
.partners-section__heading h2 { margin: .8rem 0 .25rem; }
.partners-section__heading p { color: var(--muted); }
.partner-logos { display: grid; grid-template-columns: repeat(2, 1fr); gap: .8rem; margin: 2rem 0 1.5rem; }
.partner-logos__item { display: grid; place-items: center; min-height: 6rem; padding: 1rem; border: 1px solid var(--line); border-radius: .45rem; background: white; }
.partner-logos img { max-height: 3.7rem; max-width: 100%; object-fit: contain; filter: grayscale(.2); }
.report-cta { background: #eadfc8; }
.report-cta__inner { display: flex; flex-direction: column; gap: 1.5rem; justify-content: space-between; align-items: flex-start; padding-block: 3.3rem; }
.report-cta h2 { max-width: 15ch; margin: .8rem 0 0; color: var(--forest); font-family: var(--display); font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.12; letter-spacing: -.04em; }
@keyframes rise { from { opacity: 0; transform: translateY(1.5rem); } to { opacity: 1; transform: translateY(0); } }
@keyframes settle { to { transform: scale(1); } }
@media (min-width: 768px) {
  .hero { min-height: 40rem; }
  .hero__content { flex-direction: row; align-items: end; justify-content: space-between; padding-block: 6rem 7rem; }
  .hero__motto { align-self: end; margin-bottom: 1rem; font-size: 2.1rem; text-align: right; }
  .impact-strip { grid-template-columns: 1.3fr repeat(3, 1fr); margin-top: -3rem; padding: 1.25rem; }
  .impact-strip > * + * { border-top: 0; border-left: 1px solid var(--line); }
  .impact-strip__lead, .impact-strip__stat { padding: 1rem 1.3rem; }
  .purpose-section { grid-template-columns: 1.15fr .85fr; gap: 5rem; }
  .work-section__heading { flex-direction: row; align-items: end; }
  .work-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .field-grid { grid-template-columns: minmax(17rem, .75fr) minmax(0, 1.25fr); }
  .partner-logos { grid-template-columns: repeat(5, 1fr); }
  .report-cta__inner { flex-direction: row; align-items: center; padding-block: 4rem; }
}
@media (min-width: 1024px) { .hero { min-height: 43rem; } .work-card { min-height: 30rem; } }
</style>
