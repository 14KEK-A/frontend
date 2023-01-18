<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import router from "src/router";
  // import { EditDialog } from "../components/EditDialog.vue";
  import { onMounted } from "vue";

  const productStore = useProductStore();

  onMounted(() => {
    productStore.getAll();
  });

  function Submit() {
    productStore.editById();
  }

  function Reset() {
    router.push("/qtableproduct");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="productStore.product" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit product</h4>
          <q-input v-model="productStore.product.name" label="Name:" outlined rounded type="text" />
          <q-input
            v-model="productStore.product.price"
            label="Price:"
            outlined
            rounded
            type="text"
          />
          <q-input v-model="productStore.product.type" label="Type:" outlined rounded type="text" />
          <q-input
            v-model="productStore.product.description"
            label="description:"
            outlined
            rounded
            type="text"
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
