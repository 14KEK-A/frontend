<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useUsersStore } from "../store/usersStore";
  import { watch, onMounted } from "vue";

  const usersStore = useUsersStore();
  const { isLoading } = storeToRefs(usersStore);

  watch(isLoading, () => {
    usersStore.getAll();
  });
  onMounted(() => {
    usersStore.getById();
    usersStore.getAll();
  });
</script>
<template>
  <q-page :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'" padding>
    <!-- :style="{ 'background-image': `url(${book?.picture})` }"
			style="height: 90vh; background-repeat: no-repeat; background-color: opacity: 0.1;" -->
    <q-card class="card">
      <q-card-section>
        <div class="row">
          <q-badge align="middle" transparent>
            <span class="text-h5 text-black">Our Salesmen</span>
          </q-badge>
        </div>
      </q-card-section>
      <div class="q-pa-md row q-gutter-sm">
        <q-card
          v-for="user in usersStore.users"
          :key="user._id"
          class="q-ma-md text-black col-xs-12 col-md-4 col-lg-3"
        >
          <div v-if="user.role_name == 'salesman'">
            <q-card-section>
              <div class="text-h6">First Name: {{ user.first_name }}</div>
              <div class="text-h6">Last Name: {{ user.last_name }}</div>
            </q-card-section>
            <q-separator inset />
            <q-card-section>Contacts:</q-card-section>
            <q-card-section>
              <div>Telefonszám: {{ user.phone_number }}</div>
              <div>Email: {{ user.email }}</div>
            </q-card-section>
            <div style="max-height: 35vh; overflow: hidden">
              <q-img
                class="pic"
                :src="user?.picture_URL"
                style="max-widht: 100%; height: auto; opacity: 0.6"
              ></q-img>
            </div>
          </div>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>
