<script setup lang="ts">
  import router from "@src/router";
  import { useUsersStore } from "./store/usersStore";
  import { ref, onMounted, computed } from "vue";
  import { useAppStore } from "@src/store/appStore";
  //import { useProductStore } from "../src/store/productStore";
  //import AccountView from "./views/AccountView.vue";

  import { matAdd, matRemove } from "@quasar/extras/material-icons";

  const leftDrawer = ref<boolean>(true);
  const usersStore = useUsersStore();
  const appStore = useAppStore();
  //const productStore = useProductStore();

  const totalPrice = computed(() => {
    // appStore.cart.reduce((accumulator, { item }) => {
    //   return accumulator + item.price;
    // }, 0)
    let sum = 0;
    appStore.cart.forEach(({ item }) => (sum += item.price * item.quantity));
    return sum;
  });

  //const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));

  // onMounted(() => {
  //   usersStore.autoLogin();
  // });

  function addOneToQuantity(cartItemId: string) {
    appStore.cart.some(({ id, item }) => {
      if (id == cartItemId) {
        item.quantity++;
      }
    });
    appStore.writeCart();
  }

  function removeOneFromQuantity(cartItemId: string) {
    appStore.cart.some(({ id, item }) => {
      if (id == cartItemId) {
        if (item.quantity == 1) {
          appStore.cart = appStore.cart.filter((cartItem) => cartItem.id != id);
        } else {
          item.quantity--;
        }
      }
    });
    appStore.writeCart();
  }

  // window.addEventListener(
  //   "beforeunload",
  //   () => {
  //     if (usersStore.loggedUser) {
  //       usersStore.closeApp();
  //     }
  //   },
  //   false
  // );
  function newRegister(): void {
    usersStore.user = {};
    router.push("/newregister");
  }
  function about(): void {
    usersStore.user = {};
    router.push("/about");
  }
  function LOGIN(): void {
    usersStore.user = {};
    router.push("/account");
  }
  function LOGOUT(): void {
    usersStore.user = {};
    router.push("/account");
  }
  function Checkout(): void {
    usersStore.user = {};
    router.push("/CartView");
  }
  function editRecord(): void {
    usersStore.getLoggedUser;
    router.push("/useredituser");
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
      icon: "shopping_cart_checkout",
      text: "Shopping Cart Checkout",
      name: "Cart",
      route: "/CartView",
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
  ]);
  onMounted(() => {
    appStore.readCart();
  });
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
            @click="about"
          ></q-btn>
          <q-btn-dropdown
            class="q-ml-sm q-px-md pull-right"
            flat
            icon="mdi-cart"
            label="Cart"
            no-caps
            no-wrap
            outline
          >
            <q-list>
              <q-item v-for="{ id, item } in appStore.cart" :key="id" icon="">
                <q-item-section>{{ item.name }} {{ item.price }} Ft</q-item-section>
                <q-item-section side>
                  <q-btn dense flat :icon="matRemove" @click="removeOneFromQuantity(id)" />
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat :icon="matAdd" @click="addOneToQuantity(id)" />
                </q-item-section>
                <!-- <q-item-section side>
                  <q-btn dense flat :icon="matRemove" @click="removeOneFromQuantity(id)" />
                </q-item-section> -->
                <q-item-section side>{{ item.quantity }} db</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Total price: {{ totalPrice }} Ft</q-item-section>
                <q-btn color="primary" @click="Checkout">Checkout</q-btn>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown
            class="q-ml-sm column q-px-md pull-right"
            flat
            label="Account"
            no-caps
            no-wrap
            outline
          >
            <div class="column no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">
                  <q-btn
                    v-if="usersStore.loggedUser"
                    class="q-my-md"
                    color="primary"
                    no-caps
                    @click="editRecord"
                  >
                    Edit User
                  </q-btn>
                </div>
              </div>

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ usersStore.getLoggedUser?.user_name }}
                </div>

                <q-btn
                  v-if="usersStore.loggedUser"
                  class="q-ml-sm q-px-md pull-right"
                  flat
                  label="Logout"
                  no-caps
                  @click="LOGOUT"
                ></q-btn>
                <!-- (appStore.showLoginDialog = true) -->
                <q-btn
                  v-else
                  v-show="usersStore.loggedUser == null"
                  class="q-ml-sm q-px-md pull-right"
                  flat
                  label="Login"
                  no-caps
                  @click="LOGIN"
                ></q-btn>
                <q-btn
                  v-show="usersStore.loggedUser == null"
                  class="q-ml-sm q-px-md pull-right"
                  flat
                  label="Register"
                  no-caps
                  @click="newRegister"
                ></q-btn>
              </div>
            </div>
          </q-btn-dropdown>
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
        style="margin-top: 64px"
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
              v-show="
                usersStore.loggedUser?.role_name == 'admin' ||
                usersStore.loggedUser?.role_name == 'salesman'
              "
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
