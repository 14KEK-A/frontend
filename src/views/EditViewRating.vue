<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useRatingStore } from "../store/ratingStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
  const ratingStore = useRatingStore();

  onMounted(() => {
    ratingStore.getAll();
  });

  function Submit() {
    ratingStore.editById();
  }

  function Reset() {
    router.push("/qtablerating");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="ratingStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit rating</h4>
          <q-input v-model.number="ratingStore.data.star" filled label="Star:" type="number" />
          <q-input
            v-model.string="ratingStore.data.comment"
            filled
            label="Comment:"
            type="textarea"
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
