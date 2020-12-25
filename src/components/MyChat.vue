<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket,useNotifyMe } from "../my-api";
import '@/assets/css/chat.css'
export default {
  setup(props, {emit}) {
    const ws = useWebSocket("120.115.2.76:8443/?id=my_chat");
    const router = useRouter();
    // 顯示訂閱
    const showNotification = ref(false);
    return {router,showNotification,useNotifyMe};
  },
};
</script>

<template>
  <el-page-header
    @back="router.push('/')"
    content="我的聊天室"
  >
  </el-page-header>

  <section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> 建立聊天室
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

<style lang="scss" scoped>
</style>