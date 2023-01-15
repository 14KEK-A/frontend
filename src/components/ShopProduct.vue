<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useProductStore } from "../store/productStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const productStore = useProductStore();
  onMounted(() => {
    productStore.getAll();
  });
</script>
<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="productStore.product" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md">
          <h4 class="text-center q-mt-lg q-mb-none"></h4>
          <q-input v-model="productStore.product.name" />
          <q-input v-model="productStore.product.price" />
          <q-input v-model="productStore.product.type" />
          <div>"productStore.product.description"</div>
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Add To Cart" no-caps type="add-To-Cart" />
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
