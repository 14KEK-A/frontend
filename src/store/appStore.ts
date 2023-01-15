import { defineStore } from "pinia";

interface IState {
  showLoginDialog: boolean;
  email: string;
  password: string;
}
interface IReg {
  showRegisterDialog: boolean;
  name: string;
  email: string;
  password: string;
  address?: string;
}
export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLoginDialog: false,
    email: "student005@jedlik.eu",
    password: "test5",
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
  },
});
export const useAppStoreR = defineStore({
  id: "appStoreR",
  state: (): IReg => ({
    showRegisterDialog: false,
    name: "",
    email: "",
    password: "",
    address: "",
  }),
  getters: {
    getShowRegisterDialog(): boolean {
      return this.showRegisterDialog;
    },
  },
  actions: {
    setShowRegisterDialog(value: boolean): void {
      this.showRegisterDialog = value;
    },
  },
});
