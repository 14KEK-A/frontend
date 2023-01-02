<script setup lang="ts">
  import { useAppStore } from "../store/appStore";
  import { useUsersStore } from "src/store/usersStore";
  import { computed } from "vue";
  // interface IProps {
  //   email?: string;
  //   password?: string;
  // }
  // const props = withDefaults(defineProps<IProps>(), {
  //   email: "student001@jedlik.eu",
  //   password: "student001",
  // });
  // const emit = defineEmits<{
  //   // eslint-disable-next-line no-unused-vars
  //   (e: "close-login-dialog"): void;
  // }>();
  // interface IReactiveData {
  //   email: string;
  //   password: string;
  // }
  // const r = reactive<IReactiveData>({
  //   email: props.email,
  //   password: props.password,
  // });
  const usersStore = useUsersStore();
  const appStore = useAppStore();
  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));
  function LoginLogout() {
    if (anyLoggedUser.value) {
      usersStore.logOut();
    } else {
      usersStore.loginUser({
        email: appStore.email,
        password: appStore.password,
      });
    }
  }
</script>

<template>
  <div style="width: 500px">
    <p class="text-h4">Register</p>
    <q-form @submit.prevent="emits('register', usersStore.data)">
      <q-input v-model="usersStore.data.username" label="Username:" type="text" />
      <q-input v-model="usersStore.data.email" label="Email:" type="text" />
      <q-input v-model="usersStore.data.password" autocomplete="on" label="Password:" type="password" />
      <div class="q-py-sm flex justify-evenly">
        <q-btn :disabled="isDisabled" type="submit">Register</q-btn>
        <q-btn @click="emits('to-login')">Go to Login</q-btn>
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
