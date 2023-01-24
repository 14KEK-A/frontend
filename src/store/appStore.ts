import { defineStore } from "pinia";
import { extend, LocalStorage } from "quasar";
interface IState {
  showLoginDialog: boolean;
  email: string;
  password: string;
  carts: Array<ICart>;
  cart: ICart;
  //ICart: (ICart | string)[];
}
interface ICart {
  product_id?: string;
  price?: number;
  quantity?: number;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLoginDialog: false,
    email: "admin@admin.com",
    password: "admin",
    carts: [],
    cart: {},
  }),
  getters: {
    getShowLoginDialog(): boolean {
      return this.showLoginDialog;
    },
    getCart(): string {
      return localStorage.get.cart(product_id);
      //this.carts = carts ? JSON.parse(carts) : [];
      //return this.carts;
    },
  },
  actions: {
    setShowLoginDialog(value: boolean): void {
      this.showLoginDialog = value;
    },

    setCart(product_id: string, cart: string) {
      LocalStorage.set(product_id, cart);
      //this.carts = LocalStorage.getItem(product_id);
    },
  },
});

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// LocalStorage.set(key, value)
// let value = LocalStorage.get.item(key)

// this.$q.localStorage.set(key, value)
// let value = this.$q.localStorage.get.item(key)

// LocalStorage.set(key, value)

//  inside of a Vue file
// this.$q.localStorage.set(key, value)
// this.$q.sessionStorage.set(key, value)
// Retrieving Data
// One item:

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// let item = LocalStorage.get.item(key)

//  inside of a Vue file
// let item = this.$q.localStorage.get.item(key)

// All items:

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// let item = LocalStorage.get.all()

//  inside of a Vue file
// let item = this.$q.localStorage.get.all()
// Iterating through Store
// Getting length of store:

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// let length = LocalStorage.get.length()

//  inside of a Vue file
// let length = this.$q.localStorage.get.length()
// Getting item at index:

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// let item = LocalStorage.get.index(index)

//  inside of a Vue file
// let item = this.$q.localStorage.get.index(index)
// Now you know how to loop through the store.

// Removing Data
// One item:

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// LocalStorage.remove(key)

//  inside of a Vue file
// this.$q.localStorage.remove(key)
// All items (clear the store):

//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// LocalStorage.clear()

//  inside of a Vue file
// this.$q.localStorage.clear()
// Is Store Empty?
//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// (boolean) LocalStorage.isEmpty()

//  inside of a Vue file
// (boolean) this.$q.localStorage.isEmpty()

// Is Key in Store?
//  outside of a Vue file
// import { LocalStorage } from 'quasar'

// (boolean) LocalStorage.has(key)

//  inside of a Vue file
// (boolean) this.$q.localStorage.has(key)
