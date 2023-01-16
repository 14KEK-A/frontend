<script setup lang="ts">
  import router from "src/router";
  import { useUsersStore } from "./store/usersStore";
  import { useAppStore } from "../src/store/appStore";
  //import AccountView from "./views/AccountView.vue";

  const leftDrawer = ref<boolean>(true);
  const usersStore = useUsersStore();
  const appStore = useAppStore();

  // const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));

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
  function newRegister(): void {
    usersStore.user = {};
    router.push("/newregister");
  }

  const menuItems = ref([
    {
      icon: "mdi-home",
      text: "startPage",
      name: "startPage",
      route: "/",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-account",
      text: "account",
      name: "account",
      route: "/account",
      disabled: false,
      separator: false,
    },
    {
      icon: "mdi-information",
      text: "about",
      name: "about",
      route: "/about",
      disabled: false,
      separator: false,
    },
    // {
    //   icon: "mdi-lifebuoy",
    //   text: "Products",
    //   name: "allproducts",
    //   route: "/allprducts",
    //   disabled: false,
    //   separator: true,
    // },
  ]);
  /*
  function toggleLanguage() {
    locale.value = locale.value == "hu" ? "en" : "hu";
    menuItems.value.forEach((e) => {
      if (e.name != "") e.text = t(e.name);
    });
  }*/
  // const links = ref([
  //   {
  //     icon: "mdi-fruit-pineapple",
  //     text: "Pinia",
  //     name: "",
  //     link: "https://pinia.vuejs.org/introduction.html",
  //     disabled: false,
  //     separator: false,
  //   },
  // ]);
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr fFf">
      <q-header class="bg-primary text-white text-left" elevated>
        <!-- <q-toolbar>
          <q-btn dense flat icon="mdi-menu" round @click="leftDrawer = !leftDrawer" />
          <q-toolbar-title id="title" style="cursor: pointer" @click="router.push({ path: '/' })">
            4pet WEBSHOP -
            {{ usersStore.loggedUser ? usersStore.loggedUser?.name : "You arn't logged in." }}
          </q-toolbar-title>
          <q-btn flat icon="mdi-cart" @click="$q.dark.toggle" />
          <q-btn flat icon="mdi-theme-light-dark" @click="$q.dark.toggle" />
          <q-btn dense flat icon="mdi-menu" round @click="leftDrawer = !leftDrawer" />
        </q-toolbar> -->
        <q-toolbar style="height: 64px">
          <q-toolbar-title id="title" style="cursor: pointer" @click="router.push({ path: '/' })">
            4PET WEBSHOP
          </q-toolbar-title>
          <q-btn
            v-if="$q.screen.gt.xs"
            class="q-ml-sm q-px-md pull-right"
            flat
            label="About"
            no-caps
            no-wrap
          ></q-btn>
          <q-btn
            v-if="usersStore.loggedUser"
            class="q-ml-sm q-px-md pull-right"
            flat
            label="Logout"
            no-caps
            @click="appStore.showLoginDialog = true"
          ></q-btn>
          <q-btn
            v-else
            v-show="usersStore.loggedUser == null"
            class="q-ml-sm q-px-md pull-right"
            flat
            label="Login"
            no-caps
            :to="{ login: '/account' }"
            @click="appStore.showLoginDialog = true"
          ></q-btn>
          <q-btn
            v-show="usersStore.loggedUser == null"
            class="q-ml-sm q-px-md pull-right"
            flat
            label="Register"
            no-caps
            @click="newRegister"
          ></q-btn>
          <q-btn
            class="q-ml-sm q-px-md pull-right"
            label="Cart"
            no-caps
            no-wrap
            outline
            to="/home"
          ></q-btn>
          <!-- <q-btn flat icon="mdi-cart" @click="$q.dark.toggle" /> -->
          <q-btn flat icon="mdi-theme-light-dark" @click="$q.dark.toggle" />
          <q-btn dense flat icon="mdi-menu" round @click="leftDrawer = !leftDrawer" />
          <q-space />
        </q-toolbar>
      </q-header>
      <q-header class="bg-static-info" elevated></q-header>

      <q-drawer
        v-model="leftDrawer"
        bordered
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        show-if-above
        :width="200"
      >
        <q-scroll-area class="fit">
          <!-- routes: -->
          <q-list>
            <template v-for="(menuItem, index) in menuItems" :key="index">
              <q-item clickable :disable="menuItem.disabled" @click="router.push(menuItem.route)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="menuItem.separator" :key="'sep' + index" />
            </template>

            <q-item clickable :to="{ name: 'allproducts' }">
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Products</q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'salesmen' }">
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Our salesmen</q-item-section>
            </q-item>

            <q-item
              v-show="usersStore.loggedUser?.role_name == 'admin'"
              clickable
              :to="{ name: 'qtablerating' }"
            >
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Rating</q-item-section>
            </q-item>

            <q-item
              v-show="usersStore.loggedUser?.role_name == 'admin'"
              clickable
              :to="{ name: 'qtablepartner' }"
            >
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Partner</q-item-section>
            </q-item>

            <q-item
              v-show="usersStore.loggedUser?.role_name == 'admin'"
              clickable
              :to="{ name: 'qtableproduct' }"
            >
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Product</q-item-section>
            </q-item>
            <q-item
              v-show="usersStore.loggedUser?.role_name == 'admin'"
              clickable
              :to="{ name: 'qtableorder' }"
            >
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>Order</q-item-section>
            </q-item>
            <q-item
              v-show="usersStore.loggedUser?.role_name == 'admin'"
              clickable
              :to="{ name: 'qtableuser' }"
            >
              <q-item-section avatar>
                <q-icon name="mdi-table" />
              </q-item-section>
              <q-item-section>User</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
          <!-- links: -->
          <q-list>
            <!-- <template v-for="(linkItem, index) in links" :key="index">
              <q-item clickable :href="linkItem.link" target="_blank">
                <q-item-section avatar>
                  <q-icon :name="linkItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ linkItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="linkItem.separator" :key="'sep' + index" />
            </template> -->
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container id="container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  #title {
    font-size: 10px;
    @media (min-width: 400px) {
      font-size: calc(10px + 0.5vw);
    }
    @media (min-width: 800px) {
      font-size: calc(14px + 0.5vw);
    }
    @media (min-width: 1200px) {
      font-size: calc(18px + 0.5vw);
    }
  }
</style>
