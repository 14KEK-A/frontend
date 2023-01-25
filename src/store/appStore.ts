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
  //carts: Array<ICart>;
  // cart: Map<string, IShopItem>;
  cart: Array<{ id: string; item: IShopItem }>;
  //ICart: (ICart | string)[];
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLoginDialog: false,
    email: "admin@admin.com",
    password: "admin",
    //carts: [],
    // cart: new Map<string, IShopItem>(),
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
      // this.cart = LocalStorage.getItem("shopingCart") as Map<string, IShopItem>;
      // console.log();
      //this.cart = localStorage.get("shopingCart");
      //this.carts = LocalStorage.getItem(product_id);
      //this.cart.set("_id", { price: 500, quantity: 1 });
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
      // LocalStorage.set("shopingCart", this.cart);
      //this.carts = LocalStorage.getItem(product_id);
      // console.log(JSON.stringify(this.cart));
      LocalStorage.set("shopingCart", JSON.stringify(this.cart));
      console.log("writeCart: ", this.cart);
    },
  },
});
