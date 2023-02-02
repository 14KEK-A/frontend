<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";
  import router from "@src/router";
  const nshow = false;
  const userStore = useUsersStore();

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
            v-show="nshow"
            v-model.string="userStore.user.role_name"
            default="user"
            label="Role_Name:"
            type="text"
          />
          <q-input
            v-show="nshow"
            v-model.number="userStore.user.role_bits"
            default="255"
            label="Role_Bits:"
            type="number"
          />
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
          <div id="registerForm">
            <q-input v-model.string="userStore.user.password" label="Password:" type="text" />
            <!-- <input
              v-model=""
              class="form-control"
              name="conpassword"
              placeholder="Retype password"
              required
              type="password"
            /> -->
          </div>
          <q-input
            v-model.string="userStore.user.email"
            label="Email:"
            outlined
            rounded
            type="text"
          />
          <q-input v-model.string="userStore.user.picture_URL" label="Picture_URL:" type="text" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
            <!-- <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" /> -->
          </div>
          <p>Actual: {{ userStore.user }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
<!-- computed: {
  ConfirmPWD() {
      return [
          (v) => !!v || "type pw",
          (v) => v == this.$refs.fldPasswordChange.value || "Different pw"
       ]
  },
  Required() {
      return [(v) => !!v || 'type pw']
  }
},


<q-input filled
             v-model="loginData.password"
             label="Votre mot de passe"
             hint="Saisissez votre mot de passe"
             v-bind:type="isPwd ? 'password' : ''"
             lazy-rules
             v-bind:rules="Required"
             ref="fldPasswordChange">
        <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    v-on:click="isPwd = !isPwd"></q-icon>
        </template>
    </q-input>
    <q-input filled
             v-model="loginData.passwordConfirm"
             label="Confirmez votre mot de passe"
             v-bind:type="isPwd ? 'password' : ''"
             lazy-rules
             v-bind:rules="ConfirmPWD"
             ref="fldPasswordChangeConfirm">
        <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    v-on:click="isPwd = !isPwd"></q-icon>
        </template>
    </q-input> -->
