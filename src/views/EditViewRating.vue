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
      <div v-if="ratingStore.rating" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit rating</h4>
          <q-input
            v-model.number="ratingStore.rating.star"
            label="Star:"
            outlined
            rounded
            type="number"
          />
          <q-input
            v-model.string="ratingStore.rating.comment"
            label="Comment:"
            outlined
            rounded
            type="textarea"
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
