<template>
   <div id="niu">
    <button @click="add1">按钮</button>
  </div>
</template>

<script>
import addRouter from "@/router/addRouter/addRouter.js";
import url from "@/utils/api/niu";
export default {
  name: "niu",
  components: {},
  data() {
    return {
      list: [
        {
          name: "Nested",
          redirect: "/nested/menu1",
          children: [
            {
              name: "Menu1",
              children: [
                {
                  name: "Menu1-1",
                  children: null,
                  path: "menu1-1",
                  meta: {
                    title: "Menu1-1"
                  }
                },
                {
                  name: "Menu1-2",
                  children: null,
                  path: "menu1-2",
                  meta: {
                    title: "Menu1-2"
                  }
                }
              ],
              path: "menu1",
              meta: {
                title: "Menu1",
                icon: "menu1"
              }
            },
            {
              name: "Menu2",
              children: null,
              path: "menu2",
              component: null,
              meta: {
                title: "Menu2",
                icon: "menu2"
              }
            }
          ],
          path: "/nested",
          meta: {
            title: "Nested",
            icon: "nested"
          }
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    add1() {
      console.log(JSON.stringify(addRouter(this.list)));
    }
  }
};
</script>

<style lang = "scss" scoped >
</style>
