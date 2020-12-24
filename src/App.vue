<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Aside,
    Footer,
  },
};
</script>

<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
#app{
  font-family: "Microsoft YaHei", "微軟雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  // background-color: #B3C0D1;
  // color: #333;
  // text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
  height: 100vh;
  line-height: 200px;
}

.el-main {
  // background-color: #E9EEF3;
  // color: #333;
  // text-align: center;
  line-height: 160px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>