<script setup lang="ts">
  import { useAppStore } from "../store/appStore";
  import { useUsersStore } from "src/store/usersStore";
  import { computed } from "vue";

  const appStore = useAppStore();
</script>

<template>
  <q-dialog
    v-model="appStore.showLoginDialog"
    :full-width="$q.screen.lt.sm"
    persistent
    transition-hide="rotate"
    transition-show="rotate"
  >
    <q-card class="q-pa-lg" style="width: 100%">
      <q-form>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-card-section></q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6"></div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
