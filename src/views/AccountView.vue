<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import { useAppStore } from "../store/appStore";
  import LoginDialog from "../components/LoginDialog.vue";
  import { storeToRefs } from "pinia";
  import router from "@src/router";
  import { watch, computed, onMounted } from "vue";

  const usersStore = useUsersStore();
  const appStore = useAppStore();

  const { isLoading } = storeToRefs(usersStore);
  watch(isLoading, () => {
    usersStore.getAll();
  });
  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));
  //const loggedUser = usersStore.getLoggedUser;
  onMounted(() => {
    usersStore.getAll();
  });
  onMounted(() => {
    usersStore.getLoggedUser;
  });
  function editRecord(): void {
    usersStore.getLoggedUser;
    router.push("/useredituser");
  }
  function newRegister(): void {
    usersStore.user = {};
    router.push("/newregister");
  }
</script>

<template>
  <q-page>
    <div class="row window-height flex-center justify-evenly">
      <q-btn
        class="shadow-10"
        color="info"
        :label="anyLoggedUser ? 'Logout' : 'Login'"
        no-caps
        @click="appStore.showLoginDialog = true"
      />
      <LoginDialog />
      <q-btn
        v-show="usersStore.loggedUser == null"
        class="shadow-10"
        color="blue"
        label="Register"
        no-caps
        @click="newRegister"
      />
      <LoginDialog />
      <div v-if="anyLoggedUser" class="q-pa-md row items-start q-gutter-md">
        <q-card bordered class="bg-primary text-white" dark>
          <q-card-section>
            <div class="text-h6">First Name: {{ usersStore.getLoggedUser?.first_name }}</div>
            <div class="text-h6">Last Name: {{ usersStore.getLoggedUser?.last_name }}</div>
            <div class="text-h6">Username: {{ usersStore.getLoggedUser?.user_name }}</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>Address: {{ usersStore.getLoggedUser?.address }}</q-card-section>
          <q-card-section>E-mail: {{ usersStore.getLoggedUser?.email }}</q-card-section>
          <q-card-section>
            Phone number: {{ usersStore.getLoggedUser?.phone_number }}
          </q-card-section>
          <div style="max-height: 35vh; overflow: hidden">
            <q-img
              class="pic"
              :src="usersStore.getLoggedUser?.picture_URL"
              style="max-widht: 100%; height: auto; opacity: 1"
            ></q-img>
          </div>
          <q-separator class="q-my-md" flex-center inset />
          <q-btn class="q-my-md" color="info" flex-center no-caps text-black @click="editRecord">
            Edit
          </q-btn>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

<style scoped></style>
