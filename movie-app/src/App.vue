<template>
  <div id="app">
    <el-menu mode="horizontal">
      <el-menu-item index="1">Movie App</el-menu-item>
      <el-menu-item index="2">Home</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.page {
  padding: 20px;
  margin: 0 auto;
  max-width: 700px;
}
body {
  margin: 0px;
}
</style>