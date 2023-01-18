<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import { storeToRefs } from "pinia";
  //import { DefineComponent } from "vue";

  const productStore = useProductStore();
  const { isLoading, selected } = storeToRefs(productStore);

  watch(isLoading, () => {
    productStore.getAll();
  });

  onMounted(() => {
    productStore.getAll();
  });
  onMounted(() => {
    productStore.getById();
  });
  // function actrating(): void {
  //   ratingStore.getrating?.products_id;
  // }
</script>
<template>
  <q-page v-model:selected="selected" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'" padding>
    <!-- :style="{ 'background-image': `url(${book?.picture})` }"
			style="height: 90vh; background-repeat: no-repeat; background-color: opacity: 0.1;" -->
    <q-card class="card" q-ml-sm q-px-md>
      <q-card-section>
        <div class="row">
          <q-badge align="middle" transparent>
            <span class="text-h5 text-black">Products:</span>
          </q-badge>
        </div>
      </q-card-section>
      <!-- <q-card-section>
        <div v-for="productStore." :key="">
          <div v-if="!['_id', 'name', 'price', 'type']"></div>
        </div>
      </q-card-section>
      <div style="max-height: 35vh; overflow: hidden">
        <q-img
          class="pic"
          :src="productStore.product.picture"
          style="max-widht: 100%; height: auto; opacity: 0.6"
        ></q-img>
      </div> -->
      <div class="q-pa-md row q-gutter-sm">
        <q-card
          v-for="product in productStore.products"
          :key="product._id"
          class="q-ma-md text-black col-xs-12 col-md-4 col-lg-3"
        >
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>Ár: {{ product.price }} Ft</q-card-section>
          <div style="max-height: 35vh; overflow: hidden">
            <q-img
              class="pic"
              :src="product?.picture"
              style="max-widht: 100%; height: auto; opacity: 0.6"
            ></q-img>
          </div>
          <q-separator class="q-my-md" inset />
          <!-- <q-rating
            v-model="productStore.product.ratings_id?.star"
            color="yellow"
            icon="star"
            size="2em"
          /> -->
          <q-card-actions>
            <q-expansion-item expand-separator icon="view_module" label="More" switch-toggle-side>
              <q-card-section>{{ product.description }}</q-card-section>
            </q-expansion-item>
          </q-card-actions>
          <q-card-actions>
            <q-btn>Add to Cart</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>
