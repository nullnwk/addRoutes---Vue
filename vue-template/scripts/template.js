module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
   <div id="${compoenntName}">
    ${compoenntName}
  </div>
</template>

<script>
import url from "@/utils/api/${compoenntName}";
export default {
  name: "${compoenntName}",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang = "scss" scoped >
</style>
`
  },
  vueTemplateT: compoenntName => {
    return `<template>
  <div id="${compoenntName}">
      <keep-alive>
        <router-view v-if = "$route.meta.keepAlive"></router-view>
      </keep-alive> 
      <router-view v-if = "!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import url from "@/utils/api";
export default {
  name: "${compoenntName}",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang = "scss" scoped >
</style>
`
  },
  entryTemplate: `import Main from './main.vue'
export default Main`,
  apiTemplate: `export default {}`,

  routeTemplate: (name) => {
    return `module.exports = [{name: '${name}',path: '/${name}',component: () => import( /* webpackChunkName:'${name}'*/ '@/views/${name}/index.vue')}]`
  },
  routeTemplateL: (name) => {
    return `module.exports = [{name: '${name}',path: '/${name}',meta: {requireAuth: true},component: () => import( /* webpackChunkName:'${name}'*/ '@/views/${name}/index.vue')}]`
  },
  routeTemplateLT: (name) => {
    return `module.exports = [{name: '${name}',path: '/${name}',meta: {requireAuth: true},component: () => import( /* webpackChunkName:'${name}'*/ '@/views/${name}/index.vue'),children: []}]`
  },
  routeTemplateT: (name) => {
    return `module.exports = [{name: '${name}',path: '/${name}',component: () => import( /* webpackChunkName:'${name}'*/ '@/views/${name}/index.vue'),children: []}]`
  },
}