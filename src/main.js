import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueNativeSock from "vue-native-websocket-vue3";
// import "reset-css";
// import "../theme/index.css";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-tw";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
// 使用VueNativeSock插件，并进行相关配置
// app.use(VueNativeSock, "ws://120.115.2.76:8443", {
//   store: store,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
//   format: "json",
// });
app.mount("#app");

export default app;
