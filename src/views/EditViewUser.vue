<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import router from "src/router";
  // import { EditDialog } from "../components/EditDialog.vue";

  const userStore = useUsersStore();

  onMounted(() => {
    userStore.getAll();
  });

  function Submit() {
    userStore.editById();
  }

  function Reset() {
    router.push("/qtableuser");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="userStore.user" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit product</h4>
          <q-input v-model="userStore.user.first_name" filled label="First Name:" type="text" />
          <q-input v-model="userStore.user.last_name" filled label="Last Name:" type="text" />
          <q-input v-model="userStore.user.user_name" filled label="User Name:" type="text" />
          <q-input v-model="userStore.user.role_name" filled label="Role Name:" type="text" />
          <q-input v-model="userStore.user.email" filled label="Email:" type="text" />
          <q-input v-model="userStore.user.address" filled label="Address:" type="text" />
          <q-input v-model="userStore.user.phone_number" filled label="Phone number:" type="text" />
          <q-input v-model="userStore.user.picture_URL" filled label="Picture_URL:" type="text" />
          <q-input v-model="userStore.user.password" filled label="Password:" type="text" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
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
