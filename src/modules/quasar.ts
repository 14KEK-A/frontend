// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "quasar/src/css/index.sass";

import { Quasar, Notify, Dialog, LocalStorage } from "quasar";

const config = {
  plugins: { Notify, Dialog, LocalStorage },
  build: {
    devtool: "source-map",
  },
};

export const install = (app: any) => {
  app.use(Quasar, config);
};
