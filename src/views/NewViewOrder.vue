<script setup lang="ts">
  import { useOrderStore } from "../store/orderStore";
  import router from "@src/router";
  import { onMounted } from "vue";

  const orderStore = useOrderStore();

  onMounted(() => {
    // empty
  });

  function Submit() {
    orderStore.createneworder();
  }

  function Reset() {
    router.push("/qtableorder");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="orderStore.order" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-input
            v-model.number="orderStore.order._id"
            label="_id:"
            outlined
            rounded
            type="number"
          />
          <q-datetime
            v-model="orderStore.order.ship_date"
            label="Ship date:"
            outlined
            rounded
            type="date"
          />
          <q-datetime
            v-model="orderStore.order.order_date"
            label="Order date:"
            outlined
            rounded
            type="date"
          />
          <q-datetime v-model="orderStore.order.products" label="Order date:" outlined rounded />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
          </div>
          <p>Actual: {{ orderStore.order }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
