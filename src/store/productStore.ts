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

interface IProduct {
  _id?: number; // PK
  name?: string;
  price?: number;
  type?: string;
  picture?: string;
  description?: string;
  orders_id?: { ship_date: Date; order_date: Date };
  carts_id?: { nev: string };
  //ratings_id?: { stars: number };
}
interface IPagination {
  sortBy?: string;
  descending?: false;
  page?: number;
  rowsPerPage?: number;
  rowsNumber?: number;
  filter?: string;
}
interface IState {
  products: Array<IProduct>; // store documents (records) after get method(s)
  product: IProduct; // temporary object for create, edit and delete method
  productOld: IProduct; // temporary object for patch method (store product here before edit)
  selected: Array<IProduct>;
  isLoading: boolean;
  pagination: IPagination;
}

export const useProductStore = defineStore({
  id: "productStore",
  state: (): IState => ({
    products: [],
    product: {},
    productOld: {},
    selected: [],
    isLoading: false,
    pagination: {
      sortBy: "Name",
      descending: false,
      rowsPerPage: 10,
      filter: "",
    },
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.products = [];
      $axios
        .get("/products")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.products = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.product.status}) while get all: ${error.response.product.message}`,
            color: "negative",
          });
        });
    },
    async getById(): Promise<void> {
      if (this.product && this.product._id) {
        Loading.show();
        $axios
          .get(`/products/${this.product._id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.product = res.data;
              Object.assign(this.productOld, this.product);
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
    async fetchPaginatedProducts(params: IPaginatedParams): Promise<void> {
      Loading.show();
      $axios
        .get(
          `/products/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.products = res.data.orders;
            // this.numberOfStreets = res.product.count; // ez ide majd nem kell
            this.pagination.rowsNumber = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.product.status}) while fetch paginated: ${error.response.product.message}`,
            color: "negative",
          });
        });
    },
    async editById(): Promise<void> {
      if (this.product && this.product._id) {
        const diff: any = {};
        Object.keys(this.product).forEach((k, i) => {
          const newValue = Object.values(this.product)[i];
          const oldValue = Object.values(this.productOld)[i];
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
          .patch(`products/${this.product._id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.product = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data._id} has been edited successfully!`,
                color: "positive",
              });
              router.push("/qtableproduct");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.product.status}) while edit by id: ${error.response.product.message}`,
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
          .delete(`products/${id_for_delete}`)
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
              message: `Error (${error.response.product.status}) while delete by id: ${error.response.product.message}`,
              color: "negative",
            });
          });
        if (this.selected.length) this.deleteById();
        else this.isLoading = false;
      }
    },
    async create(): Promise<void> {
      if (this.product) {
        Loading.show();
        // delete this.product.category;
        $axios
          .post("products/", this.product)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.product = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data._id} has been saved successfully!`,
                color: "positive",
              });
              router.push("/qtableproduct");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.product.status}) while create: ${error.response.product.message}`,
              color: "negative",
            });
          });
      }
    },
  },
});
