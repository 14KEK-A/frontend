<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useRatingStore } from "../store/ratingStore";
  import router from "@src/router";
  import { onMounted } from "vue";

  // const utcakStore = useUtcakStore();
  const ratingStore = useRatingStore();

  onMounted(() => {
    // empty
  });

  function Submit() {
    ratingStore.create();
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
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-input v-model="ratingStore.rating.star" label="Star:" outlined rounded type="text" />
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
          <p>Actual: {{ ratingStore.rating }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
