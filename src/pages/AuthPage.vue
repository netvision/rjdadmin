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
          <q-space />
          <q-btn type="submit" color="primary" label="login" />
        </q-form>
      </q-card-section>
    </q-card>
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
      //console.log(userCredential.user);
      $q.notify({ message: "Sign In Success." });
      router.push("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
