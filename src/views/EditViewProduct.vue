<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import router from "src/router";
  // import { EditDialog } from "../components/EditDialog.vue";

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
      <div v-if="productStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit prduct</h4>
          <q-input v-model="productStore.data.name" filled label="Name:" type="text" />
          <q-input v-model="productStore.data.price" filled label="Price:" type="text" />
          <q-input v-model="productStore.data.type" filled label="Type:" type="text" />
          <q-input
            v-model="productStore.data.discription"
            filled
            label="Discription:"
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
