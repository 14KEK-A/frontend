<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import { useAppStore } from "../store/appStore";
  import LoginDialog from "../components/LoginDialog.vue";
  import { storeToRefs } from "pinia";
  import router from "src/router";

  const usersStore = useUsersStore();
  const appStore = useAppStore();

  const { isLoading, selected } = storeToRefs(usersStore);
  watch(isLoading, () => {
    usersStore.getAll();
  });
  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));
  //const loggedUser = usersStore.getLoggedUser;
  onMounted(() => {
    usersStore.getAll();
  });
  onMounted(() => {
    usersStore.getById();
    usersStore.user = selected.value[0];
  });
  // function Submit() {    ---EDIT ACCOUNT
  //   usersStore.editById();
  // }
  // function editRecord(): void {
  //   usersStore.user = selected.value[0];
  //   usersStore.getById();
  //   router.push("/edituser");
  // }
  function newRegister(): void {
    usersStore.user = {};
    router.push("/newregister");
  }
  // interface IReactiveData {
  //   email: string;
  //   password: string;
  // }

  // const state = reactive<IReactiveData>({
  //   email: "student005@jedlik.eu",
  //   password: "test5",
  // });

  // function Submit() {
  //   if (!anyLoggedUser.value) {
  //     usersStore.loginUser({
  //       email: state.email,
  //       password: state.password,
  //     });
  //   } else {
  //     usersStore.logOut();
  //   }
  // }
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
            :rules="[(v) => (v != null && v != '') || 'Please fill in!']" ------------------------------hasznos a regnél
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
    </div>
    <div v-if="anyLoggedUser" class="q-pa-md row q-gutter-sm">
      <!-- <q-card class="q-ma-md text-black col-xs-12 col-md-4 col-lg-3">
        <q-card-section>
          <div class="text-h6">First Name: {{ usersStore.user.first_name }}</div>
          <div class="text-h6">Last Name: {{ usersStore.user.last_name }}</div>
          <div class="text-h6">Username: {{ usersStore.user.user_name }}</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section>Address: {{ usersStore.user.address }}</q-card-section>
        <q-card-section>E-mail: {{ usersStore.user.email }}</q-card-section>
        <q-card-section>Phone number: {{ usersStore.user.phone_number }}</q-card-section>
        <div style="max-height: 35vh; overflow: hidden">
          <q-img
            class="pic"
            :src="usersStore.user?.picture_URL"
            style="max-widht: 100%; height: auto; opacity: 0.6"
          ></q-img>
        </div>
        <q-separator class="q-my-md" inset />
      </q-card> -->
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

<style scoped></style>
