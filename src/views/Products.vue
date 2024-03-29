<script setup lang="ts">
  import { useProductStore } from "../store/productStore";
  import { storeToRefs } from "pinia";
  import { onMounted, watch } from "vue";
  import { useAppStore } from "../store/appStore";
  import { IProduct } from "../store/productStore";
  const productStore = useProductStore();
  const appStore = useAppStore();

  const { isLoading, pagination, selected } = storeToRefs(productStore);

  function AddToCart(product: IProduct) {
    if (
      appStore.cart.some(({ id: itemId }) => {
        if (itemId == product._id) {
          return true;
        }
        return false;
      })
    ) {
      appStore.cart.some(({ id: itemId, item }) => {
        if (itemId == product._id) {
          item.quantity++;
          return true;
        }
        return false;
      });
    } else {
      appStore.cart.push({
        id: product._id as string,
        item: { name: product.name as string, price: product.price as number, quantity: 1 },
      });
    }

    appStore.writeCart();
  }
  watch(isLoading, () => {
    productStore.getAll();
  });
  onMounted(() => {
    productStore.getAll();
    productStore.getById();
  });
</script>
<template>
  <q-page
    v-model:selected="selected"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'"
    padding
    style="margin-top: 64px"
  >
    <div :filter="pagination.filter"></div>
    <q-card class="card" q-ml-sm q-px-md>
      <q-card-section>
        <div class="row">
          <q-badge align="middle" transparent>
            <span class="text-h5 text-black">Products:</span>
          </q-badge>
        </div>
      </q-card-section>
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
              style="max-widht: auto; height: auto; opacity: 1 object-fit: cover"
            ></q-img>
          </div>
          <q-separator class="q-my-md" inset />
          <q-card-actions>
            <q-expansion-item expand-separator icon="view_module" label="More" switch-toggle-side>
              <q-card-section>{{ product.description }}</q-card-section>
            </q-expansion-item>
          </q-card-actions>
          <q-card-actions>
            <q-btn @click.prevent="AddToCart(product)">Add to Cart</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>
