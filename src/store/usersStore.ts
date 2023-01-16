import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import router from "src/router";

Notify.setDefaults({
  position: "bottom",
  textColor: "white",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});
interface IPaginatedParams {
  offset: number;
  limit: string;
  order: string;
  sort: string;
  keyword?: string;
}
interface IPagination {
  sortBy?: string;
  descending?: false;
  page?: number;
  rowsPerPage?: number;
  rowsNumber?: number;
  filter?: string;
}
interface IUser {
  _id?: string;
  role_name?: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  phone_number?: string;
  email?: string;
  picture_URL?: string;
  password?: string;
  address?: string;
}

interface IState {
  loggedUser: null | IUser;
  users: Array<IUser>;
  user: IUser;
  userOld: IUser;
  selected: Array<IUser>;
  isLoading: boolean;
  pagination: IPagination;
}

export const useUsersStore = defineStore({
  id: "usersStore",
  state: (): IState => ({
    users: [],
    user: {},
    userOld: {},
    selected: [],
    loggedUser: null,
    isLoading: false,
    pagination: {
      sortBy: "Name",
      descending: false,
      rowsPerPage: 10,
      filter: "",
    },
  }),
  getters: {
    getLoggedUser(): null | IUser {
      return this.loggedUser;
    },
  },
  actions: {
    async loginUser(params: IUser): Promise<void> {
      Loading.show();
      $axios
        .post("auth/login", {
          email: params.email,
          password: params.password,
        })
        .then((res) => {
          this.loggedUser = res.data;
          Loading.hide();
          Notify.create({
            message: `${res.data.first_name} ${res.data.last_name} with ${res.data.email} e-mail is logged in`,
            color: "positive",
          });
        })
        .catch(() => {
          this.loggedUser = null;
          Loading.hide();
          Notify.create({ message: "Error on Authentication", color: "negative" });
        });
    },
    async logOut(): Promise<void> {
      Loading.show();
      $axios
        .post("auth/logout")
        .then(() => {
          this.loggedUser = null;
          Loading.hide();
          Notify.create({
            message: "Successful logout",
            color: "positive",
          });
        })
        .catch(() => {
          this.loggedUser = null;
          Loading.hide();
          Notify.create({ message: "Error on log out", color: "negative" });
        });
    },
    async RegisterUser(params: IUser): Promise<void> {
      Loading.show();
      $axios
        .post("auth/register", {
          email: params.email,
          password: params.password,
        })
        .then((res) => {
          this.loggedUser = res.data;
          Loading.hide();
          Notify.create({
            message: `${res.data.first_name} ${res.data.last_name} with ${res.data.email} e-mail is registered in`,
            color: "positive",
          });
        })
        .catch(() => {
          this.loggedUser = null;
          Loading.hide();
          Notify.create({ message: "Error on Registration", color: "negative" });
        });
    },
    async create(): Promise<void> {
      if (this.user) {
        Loading.show();
        // delete this.user.category;
        $axios
          .post("auth/register", this.user)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.user = {};
              this.getAll();
              Notify.create({
                message: `New user with id=${res.data._id} has been registered successfully!`,
                color: "positive",
              });
              //router.push("/qtableuser");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.user.status}) while create: ${error.response.user.message}`,
              color: "negative",
            });
          });
      }
    },
    async getAll(): Promise<void> {
      Loading.show();
      this.users = [];
      $axios
        .get("/users")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.users = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.user.status}) while get all: ${error.response.user.message}`,
            color: "negative",
          });
        });
    },
    async getById(): Promise<void> {
      if (this.user && this.user._id) {
        Loading.show();
        $axios
          .get(`/users/${this.user._id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.user = res.data;
              Object.assign(this.userOld, this.user);
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error while get by id: ${error.message}`,
              color: "negative",
            });
          });
      }
    },
    async fetchPaginatedusers(params: IPaginatedParams): Promise<void> {
      Loading.show();
      $axios
        .get(
          `/users/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.users = res.data.orders;
            // this.numberOfStreets = res.user.count; // ez ide majd nem kell
            this.pagination.rowsNumber = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.user.status}) while fetch paginated: ${error.response.user.message}`,
            color: "negative",
          });
        });
    },
    async editById(): Promise<void> {
      if (this.user && this.user._id) {
        const diff: any = {};
        Object.keys(this.user).forEach((k, i) => {
          const newValue = Object.values(this.user)[i];
          const oldValue = Object.values(this.userOld)[i];
          if (newValue != oldValue) diff[k] = newValue;
        });
        if (Object.keys(diff).length == 0) {
          Notify.create({
            message: "Nothing changed!",
            color: "negative",
          });
          process.exit(0);
        }
        Loading.show();
        $axios
          .patch(`users/${this.user._id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.user = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data._id} has been edited successfully!`,
                color: "positive",
              });
              router.push("/qtableuser");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.user.status}) while edit by id: ${error.response.user.message}`,
              color: "negative",
            });
          });
      }
    },
    async deleteById(): Promise<void> {
      Loading.show();
      this.isLoading = true;
      if (this.selected.length) {
        const id_for_delete = this.selected.pop()?._id;
        await $axios
          .delete(`users/${id_for_delete}`)
          .then(() => {
            Loading.hide();
            Notify.create({
              message: `Document with id=${id_for_delete} has been deleted successfully!`,
              color: "positive",
            });
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.user.status}) while delete by id: ${error.response.user.message}`,
              color: "negative",
            });
          });
        if (this.selected.length) this.deleteById();
        else this.isLoading = false;
      }
    },
  },
});
