<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> RJDSS Admin Panel </q-toolbar-title>
        <q-btn v-if="isLoggedin" @click="logOut">Logout</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../boot/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const isLoggedin = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) isLoggedin.value = true;
});

const logOut = () => {
  signOut(auth);
  router
    .push("/admin")
    .then(() => {
      $q.notify({ message: "Sign Out Success." });
    })
    .catch((error) => console.log("error", error));
};
</script>
