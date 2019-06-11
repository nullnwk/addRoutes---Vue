<template>
  <div class="home">
    <div v-if="$store.state.token">
      <div id="nav">
        <appmenu />
      </div>
      <main>
        <appside />
        <!-- 设置缓存,页面不走created -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </main>
    </div>
    <div v-else>
      <a-login />
    </div>
  </div>
</template>

<script>
import appmenu from "./components/appmenu.vue";
import appside from "./components/appside.vue";
import * as auth from "@/utils/auth.js";
import aLogin from "./views/a-login/index";

export default {
  name: "home",
  components: {
    appmenu,
    appside,
    aLogin
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    if (auth.getToken()) {
      this.$store.dispatch("setToken", auth.getToken());
    }
  }
};
</script>
<style>
body {
  margin: 0;
}
main {
  display: flex;
}
</style>

