<script setup>
import { ref } from "vue";
import { apiBaseUrl } from "../boot/axios";

const menuOpen = ref(false);

const navigation = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Our work", to: "/activities" },
  { label: "Villages", to: "/villages" },
  { label: "Collaborators", to: "/collaborators" },
  { label: "Contact", to: "/contact" },
];

const reports = [
  { label: "General report · up to 2015", file: "General-Report-till-2015.pdf" },
  { label: "Annual report · 2015–16", file: "Annual Report 2015-2016.pdf" },
  { label: "Annual report · 2016–17", file: "Annual Report 2016-2017.pdf" },
  { label: "Annual report · 2017–18", file: "Annual Report 2017-2018.pdf" },
  { label: "Annual report · 2018–19", file: "Annual-Report-2018-19.pdf" },
  { label: "Annual report · 2019–20", file: "Annual-Report-2019-20.pdf" },
  { label: "Annual report · 2020–21", file: "Annual-Report-2020-21.pdf" },
  { label: "Annual report · 2021–22", file: "Annual-Report-2021-22.pdf" },
  { label: "Annual report · 2022–23", file: "Annual-report-2022-23.pdf" },
  { label: "Annual report · 2023–24", file: "Annual Report 2023-24.pdf", local: true },
  { label: "Annual report · 2024–25", file: "Annual report 2024-25.pdf", local: true },
];

const reportUrl = ({ file, local }) =>
  `${local ? "" : apiBaseUrl}/reports/${encodeURIComponent(file)}`;
</script>

<template>
  <q-layout view="hHh lpR fFf" class="public-layout">
    <q-header class="site-header">
      <div class="site-topline">
        <div class="site-shell site-topline__inner">
          <span>Rooted in Chirawa, Rajasthan</span>
          <span>Water security · Rural livelihoods · Community wellbeing</span>
        </div>
      </div>
      <div class="site-shell site-navigation">
        <router-link to="/" class="site-brand" aria-label="Ramkrishna Jaidayal Dalmia Seva Sansthan home">
          <span class="site-brand__mark"><img src="/logo.jpg" alt="" /></span>
          <span class="site-brand__text">
            <strong>Ramkrishna Jaidayal Dalmia</strong>
            <span>Seva Sansthan</span>
          </span>
        </router-link>

        <nav class="desktop-nav" aria-label="Main navigation">
          <router-link
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="site-nav-link"
            exact-active-class="site-nav-link--active"
          >
            {{ item.label }}
          </router-link>
          <q-btn-dropdown flat no-caps label="Reports" class="reports-trigger">
            <q-list class="reports-menu">
              <q-item
                v-for="report in reports"
                :key="report.file"
                clickable
                v-close-popup
                tag="a"
                :href="reportUrl(report)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <q-item-section>{{ report.label }}</q-item-section>
                <q-item-section side><q-icon name="north_east" size="16px" /></q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </nav>

        <q-btn
          flat
          round
          icon="menu"
          class="mobile-menu-button"
          aria-label="Open navigation"
          @click="menuOpen = true"
        />
      </div>
    </q-header>

    <q-drawer v-model="menuOpen" side="right" overlay bordered :width="320" class="site-drawer">
      <div class="site-drawer__head">
        <strong>Explore RJDSS</strong>
        <q-btn flat round icon="close" aria-label="Close navigation" @click="menuOpen = false" />
      </div>
      <nav aria-label="Mobile navigation">
        <router-link
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="site-drawer__link"
          @click="menuOpen = false"
        >{{ item.label }} <q-icon name="arrow_forward" size="18px" /></router-link>
        <q-expansion-item label="Reports" class="site-drawer__reports">
          <a
            v-for="report in reports"
            :key="report.file"
            :href="reportUrl(report)"
            target="_blank"
            rel="noopener noreferrer"
            class="site-drawer__report"
            @click="menuOpen = false"
          >{{ report.label }}</a>
        </q-expansion-item>
      </nav>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="site-footer">
      <div class="site-shell">
        <div class="site-footer__top">
          <div class="site-footer__intro">
            <span class="eyebrow eyebrow--light">Growing together</span>
            <h2>Prosperity begins<br />with community.</h2>
            <p>
              Working alongside the people of Chirawa to strengthen water security,
              livelihoods, and the places we call home.
            </p>
          </div>
          <div class="site-footer__links">
            <h3>Explore</h3>
            <router-link to="/about">Our story</router-link>
            <router-link to="/activities">Our work</router-link>
            <router-link to="/villages">Village profiles</router-link>
            <router-link to="/collaborators">Collaborators</router-link>
          </div>
          <div class="site-footer__contact">
            <h3>Visit us</h3>
            <p>Dalmia Sports Complex<br />Station Road, Chirawa<br />Rajasthan 333026</p>
            <a href="tel:+911596221109">01596-221109</a>
            <a href="tel:+919928020502">9928020502</a>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span>© {{ new Date().getFullYear() }} RJDSS, Chirawa</span>
          <span>Equity · Harmony · Prosperity</span>
          <router-link to="/admin" aria-label="Administrator sign in">Admin sign in</router-link>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>
