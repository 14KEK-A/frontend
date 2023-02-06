import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export interface IShopItem {
  name: string;
  price: number;
  quantity: number;
}
interface IState {
  showLoginDialog: boolean;
  email: string;
  password: string;
  cart: Array<{ id: string; item: IShopItem }>;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLoginDialog: false,
    email: "admin@admin.com",
    password: "admin",
    cart: [],
  }),
  getters: {
    getShowLoginDialog(): boolean {
      return this.showLoginDialog;
    },
  },
  actions: {
    setShowLoginDialog(value: boolean): void {
      this.showLoginDialog = value;
    },
    readCart(): void {
      console.log("readCart: ", JSON.parse(LocalStorage.getItem("shopingCart") as string));

      const savedCart: { id: string; item: IShopItem }[] | null = JSON.parse(
        LocalStorage.getItem("shopingCart") as string
      );
      console.log("saved: ", savedCart);
      if (savedCart == null) {
        this.cart = [];
      } else {
        this.cart = savedCart;
      }
      console.log("card after saved: ", this.cart);
    },
    writeCart(): void {
      LocalStorage.set("shopingCart", JSON.stringify(this.cart));
      console.log("writeCart: ", this.cart);
    },
  },
  persist: {
    enabled: true,
  },
});
