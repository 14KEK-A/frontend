import { defineStore } from "pinia";

interface IState {
  showLoginDialog: boolean;
  email: string;
  password: string;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLoginDialog: false,
    email: "student001@jedlik.eu",
    password: "student001",
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
