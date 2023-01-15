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
            <q-card-section>
              <q-input v-model="appStore.email" :disable="anyLoggedUser" label="E_mail address" />
            </q-card-section>
            <q-card-section v-if="!anyLoggedUser">
              <q-input v-model="appStore.password" label="Password" type="password" />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-card-actions class="flex-center" style="height: 100%">
              <q-btn
                class="q-mr-md"
                color="green"
                :label="anyLoggedUser ? 'Logout' : 'Login'"
                no-caps
                @click="LoginLogout()"
              />
              <q-btn color="red" label="Close" no-caps @click="appStore.showLoginDialog = false" />
            </q-card-actions>
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
