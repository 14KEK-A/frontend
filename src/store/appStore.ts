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
