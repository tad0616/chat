import { createStore } from "vuex";
import main from "../main";

export default createStore({
  state: {
    socket: {
      // 連接狀態
      isConnected: false,
      // 消息內容
      message: "",
      // 重新連接錯誤
      reconnectError: false,
      // 心跳消息發送時間
      heartBeatInterval: 50000,
      // 心跳定時器
      heartBeatTimer: 0,
    },
  },
  actions: {},
  mutations: {
    // 連接打開
    SOCKET_ONOPEN(state, event) {
      console.log("連接打開 SOCKET_ONOPEN");

      console.log("state", state);
      console.log("event", event);
      console.log("main", main);

      main.config.globalProperties.$socket = event.currentTarget;
      state.socket.isConnected = true;
      console.log("連接成功");
      // 連接成功時啟動定時發送心跳消息，避免被服務器斷開連接
      // state.socket.heartBeatTimer = setInterval(() => {
      //   const message = "心跳消息";
      //   state.socket.isConnected &&
      //     main.config.globalProperties.$socket.sendObj({
      //       code: 200,
      //       msg: message,
      //     });
      // }, state.socket.heartBeatInterval);
    },
    // 連接關閉
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
      // 連接關閉時停掉心跳消息
      clearInterval(state.socket.heartBeatTimer);
      state.socket.heartBeatTimer = 0;
      console.log("連接已斷開: " + new Date());
      console.log(event);
    },
    // 發生錯誤
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // 收到服務端發送的消息
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
      console.log("收到訊息: ");
      console.dir(state.socket.message);
    },
    // 自動重連
    SOCKET_RECONNECT(state, count) {
      console.info("消息系統重連中...", state, count);
    },
    // 重連錯誤
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  getters: {
    getPersonImg() {
      // 使用者的大頭貼，預設有 10 張
      const userPhotos = [
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408584.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408537.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408540.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408545.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408551.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408556.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408564.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408571.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408578.svg",
        "https://www.flaticon.com/svg/static/icons/svg/3408/3408720.svg",
      ];
      const getRandomNum = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      return userPhotos[getRandomNum(0, userPhotos.length)];
    },
    getPersonName() {
      return "用戶" + Math.floor(Math.random() * 1000);
    },
  },
});
