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
interface Iorderdetails {
  product_id: string;
  orders_id: string;
  discount: boolean;
  price: number;
  quantity: number;
  inCart: boolean;
}

interface IOrder {
  _id?: number; // PK
  ship_date?: Date;
  order_date?: Date;
  products?: (Iorderdetails | string)[];
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
  orders: Array<IOrder>; // store documents (records) after get method(s)
  order: IOrder; // temporary object for create, edit and delete method
  dataOld: IOrder; // temporary object for patch method (store order here before edit)
  selected: Array<IOrder>;
  selectedOrderdetails: Array<Iorderdetails>;
  isLoading: boolean;
  pagination: IPagination;
}

export const useOrderStore = defineStore({
  id: "orderStore",
  state: (): IState => ({
    orders: [],
    order: {},
    dataOld: {},
    selected: [],
    selectedOrderdetails: [],
    isLoading: false,
    pagination: {
      sortBy: "_id",
      descending: false,
      rowsPerPage: 10,
      filter: "",
    },
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.orders = [];
      $axios
        .get("/orders")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.orders = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.order.status}) while get all: ${error.response.order.message}`,
            color: "negative",
          });
        });
    },
    async getById(): Promise<void> {
      if (this.order && this.order._id) {
        Loading.show();
        $axios
          .get(`/orders/${this.order._id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.order = res.data;
              Object.assign(this.dataOld, this.order);
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
      if (this.order && this.order._id) {
        const diff: any = {};
        Object.keys(this.order).forEach((k, i) => {
          const newValue = Object.values(this.order)[i];
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
          .patch(`/orders/${this.order._id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.order = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data._id} has been edited successfully!`,
                color: "positive",
              });
              router.push("/qtableorder");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.order.status}) while edit by id: ${error.response.order.message}`,
              color: "negative",
            });
          });
      }
    },
    async fetchPaginatedOrders(params: IPaginatedParams): Promise<void> {
      Loading.show();
      $axios
        .get(
          `/orders/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.orders = res.data.orders;
            // this.numberOfStreets = res.order.count; // ez ide majd nem kell
            this.pagination.rowsNumber = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.order.status}) while fetch paginated: ${error.response.order.message}`,
            color: "negative",
          });
        });
    },

    async deleteById(): Promise<void> {
      Loading.show();
      this.isLoading = true;
      if (this.selected.length) {
        const id_for_delete = this.selected.pop()?._id;
        await $axios
          .delete(`/orders/${id_for_delete}`)
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
              message: `Error (${error.response.order.status}) while delete by id: ${error.response.order.message}`,
              color: "negative",
            });
          });
        if (this.selected.length) this.deleteById();
        else this.isLoading = false;
      }
    },
    async removeFromCartById(): Promise<void> {
      Loading.show();
      this.isLoading = true;
      if (this.selectedOrderdetails.length) {
        const id_for_remove = this.selectedOrderdetails.pop()?.product_id;
        await $axios.patch(`/orders/${id_for_remove}`).then(() => {
          Loading.hide();
          Notify.create({
            message: `Cart item with id=${id_for_remove} has been deleted successfully!`,
            color: "positive",
          });
        });
      }
    },
    async addToCart(): Promise<void> {
      if (this.order) {
        Loading.show();
        // delete this.user.category;
        $axios.patch("/orders", this.order).then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.order = {};
            //this.getAll();
            Notify.create({
              message: `New Cart item with id=${res.data.product_id} has been added successfully!`,
              color: "positive",
            });
          }
        });
      }
    },
    async create(): Promise<void> {
      if (this.order) {
        Loading.show();
        // delete this.order.category;
        $axios
          .post("/orders", this.order)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.order = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data._id} has been saved successfully!`,
                color: "positive",
              });
              router.push("/qtableorder");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.order.status}) while create: ${error.response.order.message}`,
              color: "negative",
            });
          });
      }
    },
  },
});
