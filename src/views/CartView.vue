<script setup lang="ts">
  import { onMounted, computed } from "vue";
  import { useAppStore } from "../store/appStore";
  import { matAdd, matRemove } from "@quasar/extras/material-icons";
  const appStore = useAppStore();

  const totalPrice = computed(() => {
    // appStore.cart.reduce((accumulator, { item }) => {
    //   return accumulator + item.price;
    // }, 0)
    let sum = 0;
    appStore.cart.forEach(({ _, item }) => (sum += item.price * item.quantity));
    return sum;
  });

  function addOneToQuantity(cartItemId: string) {
    appStore.cart.some(({ id, item }) => {
      if (id == cartItemId) {
        item.quantity++;
      }
    });
  }

  function removeOneFromQuantity(cartItemId: string) {
    appStore.cart.some(({ id, item }) => {
      if (id == cartItemId) {
        if (item.quantity == 1) {
          appStore.cart = appStore.cart.filter((cartItem) => cartItem.id != id);
        } else {
          item.quantity--;
        }
      }
    });
  }
  onMounted(() => {
    appStore.readCart();
  });
</script>
<template>
  <h4>ITEMS IN YOUR CART</h4>
  <q-page :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'" padding style="margin-top: 64px">
    <div class="q-pa-md row q-gutter-sm">
      <q-card
        v-for="{ id, item } in appStore.cart"
        :key="id"
        class="card"
        q-ml-sm
        q-px-md
        style="
  max-width: 250px , padding: 60px, height: auto"
      >
        <div class="col-md-4 col-xs-12 q-ma-md" style="width: 250px" text-black>
          Product name: {{ item.name }}
          <q-separator inset />
          Product Price: {{ item.price }} Ft
          <q-separator inset />
          Quantity: {{ item.quantity }} db
        </div>
        <q-card-actions class="justify-around q-px-md">
          <q-btn dense flat :icon="matRemove" vertical @click="removeOneFromQuantity(id)" />
          <q-btn dense flat :icon="matAdd" vertical @click="addOneToQuantity(id)" />
        </q-card-actions>
      </q-card>
    </div>
    <h5>
      <q-item-section>Total price: {{ totalPrice }} Ft</q-item-section>
    </h5>
    <h5>
      <q-btn color="green" style="align-items: right">Checkout</q-btn>
    </h5>
  </q-page>
</template>
