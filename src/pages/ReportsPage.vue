<script setup>
import { apiBaseUrl } from "../boot/axios";

const reports = [
  { year: "2024–25", file: "Annual report 2024-25.pdf", local: true },
  { year: "2023–24", file: "Annual Report 2023-24.pdf", local: true },
  { year: "2022–23", file: "Annual-report-2022-23.pdf" },
  { year: "2021–22", file: "Annual-Report-2021-22.pdf" },
  { year: "2020–21", file: "Annual-Report-2020-21.pdf" },
  { year: "2019–20", file: "Annual-Report-2019-20.pdf" },
  { year: "2018–19", file: "Annual-Report-2018-19.pdf" },
  { year: "2017–18", file: "Annual Report 2017-2018.pdf" },
  { year: "2016–17", file: "Annual Report 2016-2017.pdf" },
  { year: "2015–16", file: "Annual Report 2015-2016.pdf" },
];

const reportUrl = ({ file, local }) =>
  `${local ? "" : apiBaseUrl}/reports/${encodeURIComponent(file)}`;
</script>

<template>
  <main class="reports-page">
    <div class="site-shell">
      <header class="page-heading">
        <span class="eyebrow">Open and accountable</span>
        <h1 class="title1">Reports &amp; publications</h1>
        <p>Explore our annual reports and follow the work being done across Chirawa.</p>
      </header>
      <div class="reports-page__grid">
        <a
          v-for="(report, index) in reports"
          :key="report.year"
          :href="reportUrl(report)"
          target="_blank"
          rel="noopener noreferrer"
          class="report-card"
          :class="{ 'report-card--latest': index === 0 }"
        >
          <span class="report-card__meta">Annual report <span v-if="index === 0">· Latest</span></span>
          <strong>{{ report.year }}</strong>
          <span class="report-card__action">Read report <q-icon name="north_east" size="19px" /></span>
        </a>
      </div>
      <a
        :href="`${apiBaseUrl}/reports/General-Report-till-2015.pdf`"
        target="_blank"
        rel="noopener noreferrer"
        class="reports-page__general"
      >
        <span>General report · up to 2015</span><q-icon name="north_east" size="20px" />
      </a>
    </div>
  </main>
</template>

<style scoped>
.reports-page { padding-bottom: 5rem; }
.reports-page__grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
.report-card { display: flex; min-height: 12rem; flex-direction: column; justify-content: space-between; padding: 1.4rem; border: 1px solid var(--line); border-radius: .5rem; background: var(--paper); text-decoration: none; transition: transform .2s, box-shadow .2s; }
.report-card:hover { transform: translateY(-4px); box-shadow: 0 .9rem 2rem rgba(17,69,55,.11); }
.report-card--latest { background: var(--forest); color: white; }
.report-card__meta { color: var(--teal); font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.report-card--latest .report-card__meta, .report-card--latest .report-card__action { color: #f3c57e; }
.report-card strong { font-family: var(--display); font-size: 2.1rem; line-height: 1; }
.report-card__action { display: inline-flex; align-items: center; gap: .5rem; color: var(--teal); font-size: .8rem; font-weight: 700; }
.reports-page__general { display: flex; align-items: center; justify-content: space-between; min-height: 4rem; margin-top: 1.5rem; padding: 1rem 1.4rem; border: 1px solid var(--line); border-radius: .5rem; color: var(--forest); font-weight: 700; text-decoration: none; }
.reports-page__general:hover { background: var(--mint); }
@media (min-width: 768px) { .reports-page__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .reports-page__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
</style>
