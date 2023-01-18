<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { usePartnerStore } from "../store/partnerStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const partnerStore = usePartnerStore();

  onMounted(() => {
    // empty
  });

  function Submit() {
    partnerStore.create();
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
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <!-- <q-input v-model.number="partnerStore.data._id" rounded outlined label="_id:" type="number" /> -->
          <q-input v-model="partnerStore.data.name" label="Name:" outlined rounded type="text" />
          <q-input
            v-model="partnerStore.data.address"
            label="Address:"
            outlined
            rounded
            type="text"
          />
          <q-input v-model="partnerStore.data.email" label="Email:" outlined rounded type="text" />
          <q-input
            v-model="partnerStore.data.phone_number"
            label="Phone Number:"
            outlined
            rounded
            type="text"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
          </div>
          <p>Actual: {{ partnerStore.data }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
