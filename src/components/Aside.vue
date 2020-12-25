<script>
export default {
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return { handleOpen, handleClose };
  },
};
</script>

<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        :uniqueOpened="true"
        default-active="1"
        class="el-menu-vertical"
        router="true"
        background-color="#D3DCE6"
        text-color="#000"
        active-text-color="#0000ff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <template #title>回首頁</template>
        </el-menu-item>
        <el-menu-item index="/Chat">
          <i class="el-icon-chat-line-round"></i>
          <template #title>公開聊天室</template>
        </el-menu-item>
        <el-menu-item index="/MyChat">
          <i class="el-icon-s-comment"></i>
          <template #title>我的聊天室</template>
        </el-menu-item>
        <el-menu-item index="/Car">
          <i class="el-icon-trophy"></i>
          <template #title>賽車模擬</template>
        </el-menu-item>

        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>導航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">選項1</el-menu-item>
            <el-menu-item index="1-2">選項2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">選項3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>選項4</template>
            <el-menu-item index="1-4-1">選項1</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-menu-item
          index="3"
          disabled
        >
          <i class="el-icon-document"></i>
          <template #title>導航三</template>
        </el-menu-item>
        <el-submenu index="5">
          <template #title>
            <i class="el-icon-location"></i>
            <span>導航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="5-1">選項1</el-menu-item>
            <el-menu-item index="5-2">選項2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="5-3">選項3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped></style>
