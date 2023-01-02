<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useUsersStore } from "../store/usersStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const userStore = useUsersStore();

  onMounted(() => {
    // empty
  });

  function Submit() {
    userStore.create();
  }

  function Reset() {
    router.push("/qtableuser");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="userStore.user" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <!-- <q-input v-model.number="userStore.user._id" filled label="_id:" type="number" /> -->
          <q-input v-model="userStore.user.name" filled label="Name:" type="text" />
          <q-input v-model.string="userStore.user.address" filled label="Address:" type="text" />
          <q-input v-model.string="userStore.user.password" filled label="Password:" type="text" />
          <q-input v-model.string="userStore.user.email" filled label="Email:" type="text" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <p>Actual: {{ userStore.user }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
