<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import { useAppStore } from "../store/appStore";
  import LoginDialog from "../components/LoginDialog.vue";

  const usersStore = useUsersStore();
  const appStore = useAppStore();

  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));

  interface IReactiveData {
    email: string;
    password: string;
  }

  const state = reactive<IReactiveData>({
    email: "student005@jedlik.eu",
    password: "test5",
  });

  function Submit() {
    if (!anyLoggedUser.value) {
      usersStore.loginUser({
        email: state.email,
        password: state.password,
      });
    } else {
      usersStore.logOut();
    }
  }
</script>

<!-- <template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form @submit="Submit">
          <h5 v-if="!anyLoggedUser" class="text-center q-mt-sm q-mb-none">Login</h5>
          <h5 v-else class="text-center q-mt-sm q-mb-none">Logout</h5>
          <q-input
            v-model="state.email"
            :disable="anyLoggedUser"
            filled
            label="e-mail:"
            :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
            type="text"
          />
          <q-input
            v-if="!anyLoggedUser"
            v-model="state.password"
            filled
            label="Password:"
            :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
            type="text"
          />
          <div class="row justify-center">
            <q-btn
              class="q-mr-md"
              color="green"
              :label="anyLoggedUser ? 'Logout' : 'Login'"
              no-caps
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template> -->

<template>
  <q-page>
    <div class="row window-height flex-center justify-evenly">
      <q-btn
        class="shadow-10"
        color="info"
        :label="anyLoggedUser ? 'Show logout dialog' : 'Show login dialog'"
        no-caps
        @click="appStore.showLoginDialog = true"
      />
      <LoginDialog />
      <q-btn
        class="shadow-10"
        color="blue"
        :label="anyLoggedUser ? 'Cancel' : 'Register'"
        no-caps
        @click="appStore.showRegisterDialog = true"
      />
      <LoginDialog />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

<style scoped></style>
