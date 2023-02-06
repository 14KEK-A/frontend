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

interface IPartner {
  _id?: string; // PK
  name?: string;
  address?: string;
  email?: string;
  phone_number?: string;
}

interface IState {
  partners: Array<IPartner>;
  partner: IPartner;
  dataOld: IPartner;
  selected: Array<IPartner>;
  isLoading: boolean;
  pagination: IPagination;
}
interface IPagination {
  sortBy?: string;
  descending?: false;
  page?: number;
  rowsPerPage?: number;
  rowsNumber?: number;
  filter?: string;
}
interface IPaginatedParams {
  offset: number;
  limit: string;
  order: string;
  sort: string;
  keyword?: string;
}

export const usePartnerStore = defineStore({
  id: "partnerStore",
  state: (): IState => ({
    partners: [],
    partner: {},
    dataOld: {},
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
      this.partners = [];
      $axios
        .get("partners")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.partners = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.partner.status}) while get all: ${error.response.partner.message}`,
            color: "negative",
          });
        });
    },
    async getById(): Promise<void> {
      if (this.partner && this.partner._id) {
        Loading.show();
        $axios
          .get(`/partners/${this.partner._id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.partner = res.data;
              Object.assign(this.dataOld, this.partner);
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
      if (this.partner && this.partner._id) {
        const diff: any = {};
        Object.keys(this.partner).forEach((k, i) => {
          const newValue = Object.values(this.partner)[i];
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
          .patch(`/partners/${this.partner._id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.partner = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data._id} has been edited successfully!`,
                color: "positive",
              });
              router.push("/qtablepartner");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.partner.status}) while edit by id: ${error.response.partner.message}`,
              color: "negative",
            });
          });
      }
    },
    async fetchPaginatedPartners(params: IPaginatedParams): Promise<void> {
      Loading.show();
      $axios
        .get(
          `/partners/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.partners = res.data.orders;
            this.pagination.rowsNumber = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({
            message: `Error (${error.response.partner.status}) while fetch paginated: ${error.response.partner.message}`,
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
          .delete(`/partners/${id_for_delete}`)
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
              message: `Error (${error.response.partner.status}) while delete by id: ${error.response.partner.message}`,
              color: "negative",
            });
          });
        if (this.selected.length) this.deleteById();
        else this.isLoading = false;
      }
    },
    async create(): Promise<void> {
      if (this.partner) {
        Loading.show();
        $axios
          .post("/partners", this.partner)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data._id} has been saved successfully!`,
                color: "positive",
              });
              router.push("/qtablepartner");
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({
              message: `Error (${error.response.partner.status}) while create: ${error.response.partner.message}`,
              color: "negative",
            });
          });
      }
    },
  },
});
