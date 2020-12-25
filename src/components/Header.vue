<script>
import { ref } from "vue";
export default {
  setup() {
    const activeIndex = ref(1);

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return { activeIndex, handleSelect };
  },
};
</script>

<template>
  <!--

    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
 -->
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router="true"
    @select="handleSelect"
  >
    <el-menu-item index="/"><i class="el-icon-s-home"></i>回首頁</el-menu-item>
    <el-menu-item index="/Chat"><i class="el-icon-chat-line-round"></i>公開聊天室</el-menu-item>
    <el-menu-item index="/MyChat"><i class="el-icon-s-comment"></i>我的聊天室</el-menu-item>
    <el-menu-item index="/Car"><i class="el-icon-trophy"></i>賽車模擬</el-menu-item>
    <el-submenu index="2">
      <template #title>子選單</template>
      <el-menu-item index="2-1">一般子選項</el-menu-item>
      <el-menu-item
        index="2-2"
        disabled
      >disabled選項</el-menu-item>
      <el-submenu index="2-4">
        <template #title>第二層選項</template>
        <el-menu-item index="2-4-1">選項1</el-menu-item>
        <el-menu-item index="2-4-2">選項2</el-menu-item>
        <el-menu-item index="2-4-3">選項3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4"><a
        href="https://www.ele.me"
        target="_blank"
      >加連結的選項</a></el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
</style>
