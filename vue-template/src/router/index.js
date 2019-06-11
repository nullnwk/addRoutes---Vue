import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// export const IndexRoute = {
//   path: "/",
//   name: "home",
//   component: () => import( /* webpackChunkName:'home'*/ '@/App.vue'),
//   children: []
// }
export let routesList = [{
    path: "/",
    name: "home",
    redirect: 'list'
  },
  // {
  //   path: '/login',
  //   name: "login",
  //   component: () => import( /* webpackChunkName:'Login'*/ '@/views/a-login')
  // },

]


const routerContext = require.context('./', true, /index\.js$/)
console.log(routerContext.keys(), 'routerContext');

routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routesList = [...routesList, ...(routerModule.default || routerModule)]
})


export default new Router({
  mode: 'history',
  routes: routesList
})