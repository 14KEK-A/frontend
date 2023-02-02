<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { usePartnerStore } from "../store/partnerStore";
  import router from "@src/router";
  import { onMounted } from "vue";

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
      <div v-if="partnerStore.partner" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <!-- <q-input v-model.number="partnerStore.partner._id" rounded outlined label="_id:" type="number" /> -->
          <q-input v-model="partnerStore.partner.name" label="Name:" outlined rounded type="text" />
          <q-input
            v-model="partnerStore.partner.address"
            label="Address:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model="partnerStore.partner.email"
            label="Email:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model="partnerStore.partner.phone_number"
            label="Phone Number:"
            outlined
            rounded
            type="text"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
          </div>
          <p>Actual: {{ partnerStore.partner }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
