<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useOrderStore } from "../store/orderStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const orderStore = useOrderStore();

  onMounted(() => {
    orderStore.getAll();
  });

  function Submit() {
    orderStore.editById();
  }

  function Reset() {
    router.push("/qtableorder");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="orderStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit Order</h4>
          <q-select
            v-model="orderStore.data._id"
            clearable
            emit-value
            label="Adósáv:"
            map-options
            option-label="id"
            outlined
            rounded
          />
          <q-datetime
            v-model="orderStore.data.ship_date"
            label="Ship date:"
            outlined
            rounded
            type="date"
          />
          <q-datetime
            v-model="orderStore.data.order_date"
            label="Order date:"
            outlined
            rounded
            type="date"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
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
