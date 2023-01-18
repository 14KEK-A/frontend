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

interface IRating {
  _id?: number; // PK
  star?: number;
  comment?: string;
  users_id?: {
    role_name: string;
    role_bits: number;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    address: string;
    email: string;
    phone_number: string;
    picture_URL: string;
  };
  partners_id?: { nev: string; address: string; email: string; phone_number: string };
  products_id?: {
    name: string;
    price: number;
    type: string;
    description: string;
    picture: string;
    count: number;
  };
}

interface IState {
  ratings: Array<IRating>; // store documents (records) after get method(s)
  rating: IRating; // temporary object for create, edit and delete method
  dataOld: IRating; // temporary object for patch method (store rating here before edit)
  selected: Array<IRating>;
  isLoading: boolean;
}

export const useRatingStore = defineStore({
  id: "ratingStore",
  state: (): IState => ({
    ratings: [],
    rating: {},
    dataOld: {},
    selected: [],
    isLoading: false,
  }),
  getters: {
    getrating(): null | IRating {
      return this.rating;
    },
  },
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.ratings = [];
      $axios
        .get("/ratings")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.ratings = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.rating.status}) while get all: ${error.response.rating.message}`,
            color: "negative",
          });
        });
    },
    async getById(): Promise<void> {
      if (this.rating && this.rating._id) {
        Loading.show();
        $axios
          .get(`/ratings/${this.rating._id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.rating = res.data;
              Object.assign(this.dataOld, this.rating);
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
    async editById(): Promise<void> {
      if (this.rating && this.rating._id) {
        const diff: any = {};
        Object.keys(this.rating).forEach((k, i) => {
          const newValue = Object.values(this.rating)[i];
          const oldValue = Object.values(this.dataOld)[i];
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
          .patch(`/ratings/${this.rating._id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.rating = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data._id} has been edited successfully!`,
                color: "positive",
              });
              router.push("/qtablerating");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.rating.status}) while edit by id: ${error.response.rating.message}`,
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
          .delete(`/ratings/${id_for_delete}`)
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
              message: `Error (${error.response.rating.status}) while delete by id: ${error.response.rating.message}`,
              color: "negative",
            });
          });
        if (this.selected.length) this.deleteById();
        else this.isLoading = false;
      }
    },
    async create(): Promise<void> {
      if (this.rating) {
        Loading.show();
        // delete this.rating.category;
        $axios
          .post("/ratings", this.rating)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.rating = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data._id} has been saved successfully!`,
                color: "positive",
              });
              router.push("/qtablerating");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.rating.status}) while create: ${error.response.rating.message}`,
              color: "negative",
            });
          });
      }
    },
  },
});
