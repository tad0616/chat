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
    const form = ref("");
    const chatForm = reactive({
      chatRoom: "",
      myName: "",
      myPic: "",
    });

    const rules = reactive({
      chatRoom: [
        { required: true, message: "請輸入或選擇一個聊天室", trigger: "blur" },
        {
          min: 3,
          max: 25,
          message: "字數在 3 到 25 個字之間",
          trigger: "blur",
        },
      ],
      myName: [{ required: true, message: "請輸入暱稱", trigger: "blur" }],
      myPic: [{ required: true, message: "請選擇頭像", trigger: "change" }],
    });

    const picArr = [];
    for (let i = 0; i < 50; i++) {
      picArr[i] = require("../assets/images/chat/" + i + ".png");
    }
    const roomsArr = [
      {
        value: "聊天室1",
        label: "聊天室1",
      },
      {
        value: "聊天室2",
        label: "聊天室2",
      },
      {
        value: "聊天室3",
        label: "聊天室3",
      },
      {
        value: "聊天室4",
        label: "聊天室4",
      },
      {
        value: "聊天室5",
        label: "聊天室5",
      },
    ];

    const submitForm = (formName) => {
      formName.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return {
      router,
      showNotification,
      useNotifyMe,
      chatForm,
      submitForm,
      picArr,
      roomsArr,
      rules,
      form,
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
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form
          ref="form"
          :model="chatForm"
          :rules="rules"
          label-width="150px"
          style="margin-top:20px;"
          class="demo-ruleForm"
        >
          <el-row
            type="flex"
            justify=""
          >
            <el-col :span="12">
              <el-form-item
                label="我的暱稱"
                prop="myName"
              >
                <el-input v-model="chatForm.myName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="選擇或建立聊天室"
                prop="chatRoom"
              >

                <el-tooltip
                  class="item"
                  content="可以自行輸入以建立新聊天室"
                  placement="top-start"
                >
                  <el-select
                    v-model="chatForm.chatRoom"
                    filterable
                    allow-create
                    default-first-option
                    clearable
                    placeholder="請選擇或建立聊天室"
                  >
                    <el-option
                      v-for="item in roomsArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item
            label="我的頭像"
            prop="myPic"
          >
            <el-radio-group v-model="chatForm.myPic">
              <el-radio
                v-for="(img) in picArr"
                :key="img"
                :label="img"
              >
                <img :src="img">
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(form)"
            >進入聊天室</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>

</template>

<style lang="scss" scoped>
</style>