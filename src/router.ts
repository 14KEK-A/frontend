import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUsersStore } from "./store/usersStore";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import GridView from "./views/GridView.vue";
import StartPageView from "./views/StartPageView.vue";
import HelpView from "./views/HelpView.vue";
import QTableViewPartner from "./views/QTableViewPartner.vue";
import QTableViewProduct from "./views/QTableViewProduct.vue";
import QTableViewRating from "./views/QTableViewRating.vue";
import QTableViewOrder from "./views/QTableViewOrder.vue";
import NewViewOrder from "./views/NewViewOrder.vue";
import NewViewProduct from "./views/NewViewProduct.vue";
import NewViewRating from "./views/NewViewRating.vue";
import NewViewPartner from "./views/NewViewPartner.vue";
import EditViewPartner from "./views/EditViewPartner.vue";
import EditViewProduct from "./views/EditViewProduct.vue";
import EditViewOrder from "./views/EditViewOrder.vue";
import EditViewRating from "./views/EditViewRating.vue";
import Products from "./views/Products.vue";
import EditViewUser from "./views/EditViewUser.vue";
import NewViewUser from "./views/NewViewUser.vue";
import QTableViewUser from "./views/QTableViewUser.vue";
import NewRegister from "./views/RegisterView.vue";
import Salesmen from "./views/Salesmen.vue";
import UserEditUser from "./views/EditUserforUser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/editrating",
    name: "editrating",
    component: EditViewRating,
  },
  {
    path: "/editpartner",
    name: "editpartner",
    component: EditViewPartner,
  },
  {
    path: "/editproduct",
    name: "editproduct",
    component: EditViewProduct,
  },
  {
    path: "/editorder",
    name: "editorder",
    component: EditViewOrder,
  },
  {
    path: "/newpartner",
    name: "newpartner",
    component: NewViewPartner,
  },
  {
    path: "/newrating",
    name: "newrating",
    component: NewViewRating,
  },
  {
    path: "/neworder",
    name: "neworder",
    component: NewViewOrder,
  },
  {
    path: "/newproduct",
    name: "newproduct",
    component: NewViewProduct,
  },
  {
    path: "/neworder",
    name: "neworder",
    component: NewViewOrder,
  },
  {
    path: "/qtableorder",
    name: "qtableorder",
    component: QTableViewOrder,
  },
  {
    path: "/qtablepartner",
    name: "qtablepartner",
    component: QTableViewPartner,
  },
  {
    path: "/qtableproduct",
    name: "qtableproduct",
    component: QTableViewProduct,
  },
  {
    path: "/qtablerating",
    name: "qtablerating",
    component: QTableViewRating,
  },
  {
    path: "/grid",
    name: "grid",
    component: GridView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/qhelp",
    name: "qhelp",
    component: HelpView,
  },
  {
    path: "/allproducts",
    name: "allproducts",
    component: Products,
  },
  {
    path: "/salesmen",
    name: "salesmen",
    component: Salesmen,
  },
  {
    path: "/qtableuser",
    name: "qtableuser",
    component: QTableViewUser,
  },
  {
    path: "/newuser",
    name: "newuser",
    component: NewViewUser,
  },
  {
    path: "/newregister",
    name: "newregister",
    component: NewRegister,
  },
  {
    path: "/edituser",
    name: "edituser",
    component: EditViewUser,
  },
  {
    path: "/useredituser",
    name: "useredituser",
    component: UserEditUser,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    const usersStore = useUsersStore();
    if (usersStore.getLoggedUser) {
      next();
    } else {
      next("/account");
    }
  } else {
    next();
  }
});
export default router;
