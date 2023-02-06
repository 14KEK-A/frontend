<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import router from "@src/router";
  import { onMounted } from "vue";
  const userStore = useUsersStore();

  onMounted(() => {
    // empty
  });

  function Submit() {
    userStore.create();
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
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-input
            v-model.string="userStore.user.first_name"
            label="First_Name:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.last_name"
            label="Last_Name:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.user_name"
            label="User_Name:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.role_name"
            label="Role_Name:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.phone_number"
            label="Phone_Number:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.address"
            label="Address:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.password"
            label="Password:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.email"
            label="Email:"
            outlined
            rounded
            type="text"
          />
          <q-input
            v-model.string="userStore.user.picture_URL"
            label="Picture_URL:"
            outlined
            rounded
            type="text"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
          </div>
          <p>Actual: {{ userStore.user }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
