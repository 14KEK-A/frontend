<script setup lang="ts">
  import { onMounted, computed } from "vue";
  import { IShopItem, useAppStore } from "../store/appStore";
  import { matAdd, matRemove } from "@quasar/extras/material-icons";
  import { useUsersStore } from "../store/usersStore";
  import { useOrderStore } from "@src/store/orderStore";
  //import { Iorderdetails } from "../store/orderStore";
  const appStore = useAppStore();
  const usersStore = useUsersStore();
  //let isConfirm = false;
  const orderStore = useOrderStore();
  const totalPrice = computed(() => {
    let sum = 0;
    appStore.cart.forEach(({ item }) => (sum += item.price * item.quantity));
    return sum;
  });
  function Confirm() {
    appStore.cart.forEach(({ id, item }) => orderpush(id, item));
    orderStore.create(appStore.cart);
    appStore.cart.length = 0;
    appStore.writeCart();
    //isConfirm = true;
  }
  function addOneToQuantity(cartItemId: string) {
    appStore.cart.some(({ id, item }) => {
      if (id == cartItemId) {
        item.quantity++;
      }
    });
    appStore.writeCart();
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
    appStore.writeCart();
  }

  onMounted(() => {
    appStore.readCart();
  });
  function orderpush(id: string, cart: IShopItem) {
    console.log({
      id: id as string,
      item: {
        price: cart.price as number,
        quantity: cart.quantity as number,
        product_id: id as string,
        name: cart.name as string,
      },
    });
    orderStore.order.products?.push({
      id: id as string,
      item: {
        price: cart.price as number,
        quantity: cart.quantity as number,
        product_id: id as string,
        name: cart.name as string,
      },
    });
  }
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
        style="max-width: 250px , padding: 60px, height: auto"
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
      <q-item-section v-if="totalPrice != 0">Total price: {{ totalPrice }} Ft</q-item-section>
    </h5>
    <!-- <div v-if="usersStore.loggedUser && appStore.cart.length != 0">
      <q-btn color="green" style="align-items: right" @click="Confirm()">Confirm</q-btn>
    </div> -->
    <h5 v-if="usersStore.loggedUser && appStore.cart.length != 0">
      <q-btn color="green" style="align-items: right" @click="Confirm()">Confirm Order</q-btn>
    </h5>
    <h5 v-else-if="appStore.cart.length != 0 && !usersStore.loggedUser" color="red">
      You have to login/register to order!
    </h5>
    <h5 v-else-if="appStore.cart.length == 0" color="red">Your Cart is Empty</h5>
  </q-page>
</template>
<style>
  h6 {
    color: red;
  }
</style>
