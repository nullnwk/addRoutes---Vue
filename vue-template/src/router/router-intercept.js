import router from './index'; // 引入路由
import * as auth from '../utils/auth'
import store from '@/store'
import addRouter from './addRouter/addRouter'


var data = false // 本次demo用变量凑合一下,项目里面应该放到vuex内
router.beforeEach((to, from, next) => {
  if (auth.getToken()) { //查看token是否存在
    if (data) {
      // 获取了动态路由 data一定true,就无需再次请求 直接放行
      next()
    } else {
      // data为false,一定没有获取动态路由,就跳转到获取动态路由的方法
      gotoRouter(to, next)
      data = true;
    }
    next();
  } else {
    if (to.path === '/Login') { //这就是跳出循环的关键
      next()
    } else {
      next('/Login')
    }

  }
  next();
});

router.afterEach((to, from) => {});


async function gotoRouter(to, from) {
  var res = await getRouterList()
  router.addRoutes(res)
  store.dispatch('setRouterList', res);
}

var _this = this
//获取动态路由
function getRouterList(params) {
  return new Promise((resolve, reject) => {
    if (!auth.getToken()) {
      return false;
    }
    var list = store.state.RouterListH = JSON.parse(localStorage.getItem('routerListH'));
    var r = addRouter(list);
    // 一定不能写在静态路由里面，否则会出现，访问动态路由404的情况.所以在这列添加
    r.push({
      path: '*',
      name: 'notfound',
      redirect: '/list',
      meta: {
        title: '404-页面丢了'
      }
    })
    resolve(r)
  })
}