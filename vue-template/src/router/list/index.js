module.exports = [{
  name: "list",
  path: "/list",
  meta: {
    // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    keepAlive: true, //设置缓存,有的话,返回页面不走created
  },
  component: () => import( /* webpackChunkName:'list'*/ '@/views/list/index.vue')
}]