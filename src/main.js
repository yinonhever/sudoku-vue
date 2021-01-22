import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import Page from "./components/Page";
import BaseButton from "./components/BaseButton";
import BaseSpinner from "./components/BaseSpinner";

const app = createApp(App);

app.component("Page", Page);
app.component("BaseButton", BaseButton);
app.component("BaseSpinner", BaseSpinner);

app.use(store);
app.use(router);

app.mount("#app");
