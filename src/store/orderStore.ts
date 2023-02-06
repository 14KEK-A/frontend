import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import router from "@src/router";

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
export interface Iorderdetails {
  product_id: string;
  //orders_id: string;
  //discount: boolean;
  name: string;
  price: number;
  quantity: number;
  //inCart: boolean;
}
//Array<{ id: string; item: IShopItem }>;
interface IOrder {
  _id?: string; // PK
  ship_date?: Date;
  order_date?: Date;
  products?: Array<{ id: string; item: Iorderdetails }>;
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
  orders: Array<IOrder>;
  order: IOrder;
  dataOld: IOrder;
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
          // process.exit(0);
          return;
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
    async create(
      cart: {
        id: string;
        item: {
          name: string;
          price: number;
          quantity: number;
        };
      }[]
    ): Promise<void> {
      console.log(this.order);
      interface Product {
        product_id: string;
        price: number;
        quantity: number;
      }
      const itemsFromCart: Product[] = [];
      cart.forEach((item) => {
        itemsFromCart.push({
          product_id: item.id,
          price: item.item.price,
          quantity: item.item.quantity,
        });
      });

      console.log("itemsFromCart: ", itemsFromCart);
      Loading.show();
      $axios
        .post("/orders", { products: itemsFromCart })
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            // this.order = {};
            this.getAll();
            Notify.create({
              message: `Your order has been saved successfully!`,
              color: "positive",
            });
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.order.status}) while create: ${error.response.order.message}`,
            color: "negative",
          });
        });
      // }
    },
    async createneworder(): Promise<void> {
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
