<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useWebSocket,useNotifyMe } from "../my-api";
import "@/assets/css/chat.css";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // 聊天室內容
    const text = ref("");

    // 當前使用者的大頭貼
    const PERSON_IMG = store.getters.getPersonImg;
    console.log("當前使用者的大頭貼 PERSON_IMG", PERSON_IMG);

    // 當前使用者的名稱
    const PERSON_NAME = store.getters.getPersonName;
    console.log("當前使用者的姓名 PERSON_NAME", PERSON_NAME);

    // 連線 websocket
    // const ws = new WebSocket("ws://120.115.2.76:8443/?id=" + PERSON_NAME);
    const ws = useWebSocket("120.115.2.76:8443/?id=" + PERSON_NAME);

    // 顯示訂閱
    const showNotification = ref(false);

    // html 中聊天室
    const chatroom = document.getElementsByClassName("msger-chat");

    // 傳送訊息至 WebSocket Server，訊息格式 json
    const handleMessageEvent = () => {
      console.log("準備送到 ws", text.value);
      ws.send(
        JSON.stringify({
          event: "message",
          photo: PERSON_IMG,
          name: PERSON_NAME,
          content: text.value,
        })
      );
      text.value = "";
    };

    // 當我們輸入完訊息按下 Enter 鍵或是滑鼠按下 送出訊息 按鈕會觸發的方法
    const handleSyncMessageEvent = (e) => {
      console.log("handleSyncMessageEvent", e);
      if (e.keyCode === 13 && text.value !== "") {
        handleMessageEvent();
      }
    };

    const insertMsg = (msg, domObj) => {
      console.log("insertMsg", msg);
      domObj.insertAdjacentHTML("beforeend", msg);
      domObj.scrollTop += 500;
    };

    const getMessage = (name, img, side, text) => {
      console.log("getMessage", text);
      const d = new Date();
      //   Simple solution for small apps
      let msg = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}</div>
          </div>

          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
      return msg;
    };

    const getEventMessage = (msg) => {
      console.log("getEventMessage", msg);
      return `<div class="msg-left">${msg}</div>`;
    };

    // 透過 onmessage 接收 server 傳送的訊息
    onMounted(() => {
      ws.onmessage = function (e) {
        let m = JSON.parse(e.data);
        let msg = "";
        console.log("接收 server 傳送的訊息", m);
        console.log("m.event", m.event);
        console.log("m.name", m.name);
        switch (m.event) {
          case "message":
            console.log("m.photo", m.photo);
            console.log("m.content", m.content);
            if (m.name == PERSON_NAME) {
              msg = getMessage(m.name, m.photo, "right", m.content);
            } else {
              msg = getMessage(m.name, m.photo, "left", m.content);
            }
            useNotifyMe("新訊息", m.name + "說：" + m.content);
            break;
          case "other":
            if (m.name != PERSON_NAME) {
              msg = getEventMessage(m.name + " " + m.content);
            } else {
              msg = getEventMessage("您已" + m.content);
            }
            useNotifyMe("有人登入了", m.name + "已登入");
            break;
        }
        insertMsg(msg, chatroom[0]);
      };
    });

    return {
      handleMessageEvent,
      handleSyncMessageEvent,
      text,
      useNotifyMe,
      showNotification,
      router,
    };
  },
};
</script>

<template>
  <el-page-header
    @back="router.push('/')"
    content="我是聊天室來著"
  >
  </el-page-header>

  <section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> 公開匿名聊天室
        <el-button
          style="line-height: 1rem;"
          type="success"
          icon="el-icon-s-comment"
          size="mini"
          @click="useNotifyMe"
          v-if="showNotification"
        >有訊息通知我</el-button>
      </div>
      <div class="msger-header-options">
        <span><i class="fas fa-cog"></i></span>
      </div>
    </header>

    <!--聊天 block-->
    <div class="msger-chat"></div>

    <!--聊天 block-->
    <div class="msger-inputarea">
      <el-input
        id="msg"
        :rows="2"
        v-model="text"
        type="text"
        class="msger-input"
        placeholder="說些什麼吧～"
        @keydown="handleSyncMessageEvent"
      >
      </el-input>
      <el-button
        class="msger-send-btn"
        type="primary"
        plain
        id="send"
        @click="handleMessageEvent"
      >發送訊息</el-button>
    </div>
  </section>

</template>

<style lang="scss">
</style>