<template>
  <div>
    <p class="text-center">Sign in with credentials</p>

    <q-form @submit="signInExistingUser">
      <q-input
        outlined
        class="q-mb-md"
        type="email"
        label="Email"
        v-model="data.email"
      />
      <q-input
        outlined
        class="q-mb-md"
        type="password"
        label="Password"
        v-model="data.password"
      />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" :label="tab" />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { auth } from "../boot/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();

const router = useRouter();
const data = ref({});

const signInExistingUser = () => {
  signInWithEmailAndPassword(auth, data.value.email, data.value.password)
    .then((userCredential) => {
      $q.notify({ message: "Sign In Success." });
      router.push("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
