<script setup lang="ts">
  import { onMounted } from "vue";
  import { useAppStore } from "../store/appStore";

  const appStore = useAppStore();

  onMounted(() => {
    appStore.readCart();
  });
</script>
<template>
  <q-page style="margin-top: 64px">
    <div>My orders</div>

    <q-list>
      <q-item v-for="item in appStore.cart" :key="item.id">
        {{ item }}
      </q-item>
    </q-list>
  </q-page>
</template>
