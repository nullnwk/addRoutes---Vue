<template>
   <div class="Login">
     用户名<input type="text">
     <button @click="login">登陆</button>
  </div>
</template>

<script>
import url from "@/utils/api/list";
import * as auth from "@/utils/auth.js";
import store from "@/store";

export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    async login() {
      var list = [
        {
          name: "Nested123",
          path: "/Nested",
          "'meta'": {
            title: "Nested",
            icon: "nested"
          },
          children: [
            {
              name: "Menu1",
              children: [
                {
                  name: "Menu1-1",
                  children: null,
                  path: "/menu1-1",
                  "'meta'": {
                    title: "Menu1-1"
                  }
                },
                {
                  name: "Menu1-2",
                  children: null,
                  path: "/menu1-2",
                  "'meta'": {
                    title: "Menu1-2"
                  }
                }
              ],
              path: "/menu1",
              "'meta'": {
                title: "Menu1",
                icon: "menu1"
              }
            }
          ]
        }
      ];

      auth.saveToken({ token: "1231" });
      // 动态路由
      store.dispatch("setRouterListH", list);
      localStorage.setItem("routerListH", JSON.stringify(list));
      this.$router.push("/list");
    }
  }
};
</script>

<style lang = "scss" scoped >
</style>
