<template>
  <div class="appmenu">
    <header>
        <router-link to='/list' class='router'>首页</router-link>
        <router-link to='/list' class='router'>动态</router-link>
        <router-link to='/niu' class='router'>动态</router-link>
        <div @click="quit" class='router g-login'>退出</div>
    </header>
  </div>
</template>

<script>
import * as auth from "../utils/auth";
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    quit() {
      auth.removeToken();
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  /* padding: 0 100px; */
  background: rgb(182, 181, 181);
  height: 50px;
  line-height: 50px;
  overflow: hidden;
}
.router {
  padding: 0 20px;
  color: #fff;
}
.g-login {
  margin-left: auto;
}
</style>
