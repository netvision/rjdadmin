<template>
  <div class="q-pa-md flex justify-center">
    <q-card class="q-pa-xl flex items-center">
      <q-card-section horizontal>
        <q-img class="rounded-borders" src="/logo.jpg" style="width: 120px" />
      </q-card-section>
      <q-card-section>
        <p class="text-h5">Sign in</p>

        <q-form @submit="signInExistingUser">
          <q-input
            outlined
            class="q-mb-md"
            autocomplete="username"
            label="Username"
            v-model.trim="data.username"
            :rules="[(value) => !!value || 'Username is required']"
          />
          <q-input
            outlined
            class="q-mb-md"
            type="password"
            autocomplete="current-password"
            label="Password"
            v-model="data.password"
            :rules="[(value) => !!value || 'Password is required']"
          />
          <q-space />
          <q-btn type="submit" color="primary" label="login" :loading="loading" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { login } from "../services/auth";

const $q = useQuasar();
const router = useRouter();
const data = ref({ username: "", password: "" });
const loading = ref(false);

const signInExistingUser = async () => {
  loading.value = true;
  try {
    const admin = await login(data.value.username, data.value.password);
    $q.notify({ type: "positive", message: "Signed in." });
    await router.push(
      admin.must_change_password ? "/admin/change-password" : "/admin/home"
    );
  } catch (error) {
    const message = error.response?.data?.detail || "Unable to sign in.";
    $q.notify({ type: "negative", message });
  } finally {
    loading.value = false;
  }
};
</script>
