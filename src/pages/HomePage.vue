<template>
  <q-page class="flex q-pa-md">
    <div>
      <pre>{{ villages }}</pre>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../boot/axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const villages = ref([]);

onMounted(async () => {
  villages.value = await api.get("/villages").then((r) => r.data);
});
</script>
