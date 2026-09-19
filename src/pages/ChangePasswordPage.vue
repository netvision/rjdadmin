<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="password-card q-pa-lg">
      <q-card-section>
        <div class="text-h5">Set a new password</div>
        <p class="text-grey-7 q-mt-sm">
          The temporary administrator password must be changed before records can be edited.
        </p>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" @submit="submit">
          <q-input
            v-model="form.currentPassword"
            outlined
            type="password"
            autocomplete="current-password"
            label="Temporary password"
            :rules="[(value) => !!value || 'Current password is required']"
          />
          <q-input
            v-model="form.newPassword"
            outlined
            type="password"
            autocomplete="new-password"
            label="New password"
            hint="Use at least 12 characters"
            :rules="[(value) => value.length >= 12 || 'Use at least 12 characters']"
          />
          <q-input
            v-model="form.confirmPassword"
            outlined
            type="password"
            autocomplete="new-password"
            label="Confirm new password"
            :rules="[(value) => value === form.newPassword || 'Passwords do not match']"
          />
          <q-btn
            type="submit"
            color="primary"
            label="Change password"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { changePassword } from "../services/auth";

const $q = useQuasar();
const router = useRouter();
const loading = ref(false);
const form = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const submit = async () => {
  loading.value = true;
  try {
    await changePassword(form.currentPassword, form.newPassword);
    $q.notify({ type: "positive", message: "Password changed. Sign in again." });
    await router.push("/admin");
  } catch (error) {
    const message = error.response?.data?.detail || "Unable to change the password.";
    $q.notify({ type: "negative", message });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.password-card {
  width: min(100%, 520px);
}
</style>
