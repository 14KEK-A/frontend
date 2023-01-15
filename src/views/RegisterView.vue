<script setup lang="ts">
  // import { useUtcakStore } from "../store/utcakStore";
  import { useUsersStore } from "../store/usersStore";
  import router from "src/router";

  // const utcakStore = useUtcakStore();
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
          <h4 class="text-center q-mt-lg q-mb-none">Register</h4>

          <q-input
            v-model.string="userStore.user.first_name"
            filled
            label="First_Name:"
            type="text"
          />
          <q-input
            v-model.string="userStore.user.last_name"
            filled
            label="Last_Name:"
            type="text"
          />
          <q-input
            v-model.string="userStore.user.user_name"
            filled
            label="User_Name:"
            type="text"
          />
          <q-input
            v-model.string="userStore.user.phone_number"
            filled
            label="Phone_Number:"
            type="text"
          />
          <q-input v-model.string="userStore.user.address" filled label="Address:" type="text" />
          <div class="row justify-center">
            <q-input
              v-model.string="userStore.user.password"
              filled
              label="Password:"
              type="text"
            />
            <q-input
              v-model.string="userStore.user.password"
              filled
              label="Password confirm:"
              type="text"
            />
          </div>
          <q-input v-model.string="userStore.user.email" filled label="Email:" type="text" />
          <!-- <q-input
            v-model.string="userStore.user.picture_URL"
            filled
            label="Picture_URL:"
            type="text"
          /> -->
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <!-- <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" /> -->
          </div>
          <p>Actual: {{ userStore.user }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
