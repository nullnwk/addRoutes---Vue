module.exports = [{
  name: 'niu',
  path: '/niu',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
  },
  component: () => import( /* webpackChunkName:'niu'*/ '@/views/niu/index.vue')
}]