<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import { storeToRefs } from "pinia";

  const productStore = useProductStore();
  const { isLoading, products, pagination, selected } = storeToRefs(productStore);

  watch(isLoading, () => {
    productStore.getAll();
  });
  // function BeforeShowDialog() {
  //   productStore.getAll();
  // }
  // function filterChanged(): void {
  //   selected.value = [];
  // }
  onMounted(() => {
    productStore.getAll();
  });
</script>
<template>
  <q-page :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'" padding>
    <!-- :style="{ 'background-image': `url(${book?.picture})` }"
			style="height: 90vh; background-repeat: no-repeat; background-color: opacity: 0.1;" -->
    <q-card class="card">
      <q-card-section>
        <span>Categories:</span>
        <div class="row">
          <q-badge align="middle" color="amber-3" transparent>
            <span class="text-h5 text-black">Ramen</span>
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(value, index) in productStore.product" :key="index">
          <div v-if="!['_id', 'name', 'price', 'type']"></div>
        </div>
      </q-card-section>
      <div style="max-height: 35vh; overflow: hidden">
        <q-img
          class="pic"
          :src="productStore.product.picture"
          style="max-widht: 100%; height: auto; opacity: 0.6"
        ></q-img>
      </div>
      <div class="q-pa-md row q-gutter-sm">
        <q-card
          v-for="(product, index) in productStore.products"
          :key="index"
          class="q-ma-md text-black col-xs-12 col-md-4 col-lg-3"
        >
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>Ár: {{ product.price }} Ft</q-card-section>
          <q-card-section>{{ product.description }}</q-card-section>
          <div style="max-height: 35vh; overflow: hidden">
            <q-img
              class="pic"
              :src="product?.picture"
              style="max-widht: 100%; height: auto; opacity: 0.6"
            ></q-img>
          </div>
          <q-separator class="q-my-md" inset />

          <q-card-actions>
            <q-btn>View</q-btn>
          </q-card-actions>
          <q-card-actions>
            <q-btn>Add to Cart</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>
<!-- <template>
  <div class="q-mt-md q-mx-sm">
   <div class="row">
     <q-badge transparent align="middle" color="amber-3">
       <span class="text-h5 text-black">Ramen</span>
     </q-badge>
   </div>
   <div class="q-pa-md row q-gutter-sm">
     <q-card
       v-for="(item,index) in items"
       :key="index"
       class="q-ma-md text-black col-xs-12 col-md-4 col-lg-3"
     >
       <q-card-section>
         <div class="text-h6">{{item.title}}</div>
       </q-card-section>
       <q-separator inset />
  
       <q-card-section>{{item.description}}</q-card-section>
  
       <img :src="item.img" height="350px" />
  
       <q-separator class="q-my-md" inset />
  
       <q-card-actions>
         <q-btn>View</q-btn>
       </q-card-actions>
       <q-card-section class="align-right">PHP {{item.price}}</q-card-section>
     </q-card>
   </div>
  </div>
  </template> -->
