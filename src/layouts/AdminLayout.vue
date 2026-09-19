<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> RJDSS Admin Panel </q-toolbar-title>
        <q-btn v-if="authState.admin" flat @click="logOut">Logout</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { authState, logout } from "../services/auth";

const $q = useQuasar();
const router = useRouter();
const logOut = async () => {
  try {
    await logout();
    $q.notify({ message: "Signed out." });
  } catch (error) {
    $q.notify({ type: "negative", message: "Unable to sign out cleanly." });
  } finally {
    await router.push("/admin");
  }
};
</script>
