import { createApp } from "vue";
import App from "./App.vue";
// import store from '../src/';

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   render: h => h(App),
// });

const app = createApp(App);

// install all modules from `modules/*.ts`
const modules = import.meta.glob<any>("/src/modules/*.ts", { eager: true });
Object.values(modules).forEach((module) => module.install?.(app));

app.mount("#app");
