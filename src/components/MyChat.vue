<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket, useNotifyMe } from "../my-api";
import "@/assets/css/chat.css";
export default {
  setup(props, { emit }) {
    const ws = useWebSocket("120.115.2.76:8443/?id=my_chat");
    const router = useRouter();
    // 顯示訂閱
    const showNotification = ref(false);
    const chatForm = reactive({
      newChatRoom: "",
      allChatRooms: "",
      myName: "",
      myPic: "",
      desc: "",
    });

    const picArr = [];
    for (let i = 0; i < 50; i++) {
      picArr[i] = require("../assets/images/chat/"+i+".png");
    }
    // picArr.splice(0,1);
    console.log(picArr);

    const onSubmit = () => {
      console.log("送出");
    };
    return {
      router,
      showNotification,
      useNotifyMe,
      chatForm,
      onSubmit,
      picArr,
    };
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

    <el-form
      ref="form"
      :model="chatForm"
      label-width="130px"
    >
      <el-form-item label="建立新聊天室">
        <el-input v-model="chatForm.newChatRoom"></el-input>
      </el-form-item>

      <el-form-item label="選擇現有聊天室">
        <el-select
          v-model="chatForm.allChatRooms"
          placeholder="請選擇聊天室"
        >
          <el-option
            label="聊天室1"
            value="chatRoom1"
          ></el-option>
          <el-option
            label="聊天室2"
            value="chatRoom2"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="顯示名稱">
        <el-input v-model="chatForm.myName"></el-input>
      </el-form-item>

      <el-form-item label="選擇頭像">
        <el-radio-group v-model="chatForm.myPic">
          <el-radio
            v-for="(img) in picArr"
            :key="img"
            :label="img"
          >
            <img :src="img" >
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>

</template>

<style lang="scss" scoped>
</style>