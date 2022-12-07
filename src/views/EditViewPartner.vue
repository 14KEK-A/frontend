<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { usePartnerStore } from "../store/partnerStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const partnerStore = usePartnerStore();

  onMounted(() => {
    partnerStore.getAll();
  });

  function Submit() {
    partnerStore.editById();
  }

  function Reset() {
    router.push("/qtablepartner");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="partnerStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit partner</h4>
          <q-input v-model="partnerStore.data.name" filled label="Name:" type="text" />
          <q-input v-model="partnerStore.data.address" filled label="Address:" type="text" />
          <q-input v-model="partnerStore.data.email" filled label="Email:" type="text" />
          <q-input
            v-model="partnerStore.data.phone_number"
            filled
            label="PhoneNumber:"
            type="text"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <!-- <p>Actual: {{ utcakStore.data }}</p> -->
          <!-- <p>Old: {{ utcakStore.dataOld }}</p> -->
          <!-- <p>Selected: {{ utcakStore.selected }}</p> -->
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
