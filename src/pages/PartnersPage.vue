<script setup>
const partners = [
  { name: "Department of Science and Technology", detail: "Government of India", image: "dst2.jpg" },
  { name: "Central Electronics Engineering Research Institute", detail: "CEERI · Pilani, Rajasthan", image: "ceeri.jpg" },
  { name: "National Bank for Agriculture and Rural Development", detail: "NABARD · Government of India", image: "NABARD_logo.png" },
  { name: "Karnataka State Council of Science and Technology", detail: "KSCST · Bengaluru", image: "kscst_eng_logo.jpg" },
  { name: "Malaviya National Institute of Technology", detail: "Department of Civil Engineering · Jaipur", image: "mnit.jpg" },
  { name: "University of Rajasthan", detail: "Department of Geology · Jaipur", image: "uor-logo.jpg" },
  { name: "Public Health Engineering Department", detail: "Government of Rajasthan", image: "PHED-Logo.jpg" },
  { name: "Panchayati Raj and Rural Development Department", detail: "Government of Rajasthan", image: "dst2.jpg" },
  { name: "Department of Agriculture", detail: "Government of Rajasthan", image: "doa-rajasthan.jpg" },
];
</script>

<template>
  <main class="partners-page">
    <div class="site-shell">
      <header class="page-heading">
        <span class="eyebrow">Better together</span>
        <h1 class="title1">Our collaborators</h1>
        <p>Progress takes many hands. These institutions have supported our work with communities across the region.</p>
      </header>
      <div class="partners-page__grid">
        <article v-for="partner in partners" :key="partner.name" class="partner-card">
          <div class="partner-card__logo"><img :src="`/images/${partner.image}`" :alt="partner.name" loading="lazy" /></div>
          <div>
            <h2>{{ partner.name }}</h2>
            <p>{{ partner.detail }}</p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<style scoped>
.partners-page { padding-bottom: 5rem; }
.partners-page__grid { display: grid; gap: 1rem; }
.partner-card { display: grid; grid-template-columns: 4.5rem 1fr; align-items: center; gap: 1.2rem; min-height: 10rem; padding: 1.3rem; border: 1px solid var(--line); border-radius: .5rem; background: var(--paper); transition: transform .2s, box-shadow .2s; }
.partner-card:hover { transform: translateY(-3px); box-shadow: 0 .8rem 1.6rem rgba(17,69,55,.09); }
.partner-card__logo { display: grid; place-items: center; width: 4.5rem; height: 4.5rem; padding: .5rem; border-radius: .4rem; background: white; }
.partner-card__logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
.partner-card h2 { margin: 0 0 .3rem; color: var(--forest); font-family: var(--display); font-size: 1.25rem; line-height: 1.2; }
.partner-card p { margin: 0; color: var(--muted); font-size: .83rem; line-height: 1.5; }
@media (min-width: 768px) { .partners-page__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .partners-page__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
</style>
