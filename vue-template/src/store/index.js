import Vue from "vue";
import Vuex from "vuex";

import {
  routesList
} from '@/router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    RouterList: [], //动态路由
    RouterListH: [], //接口请求回来的路由
    token: null, //如果设置为空对象,认为不为空
  },
  mutations: {
    set_router(state, RouterList) {
      state.RouterList = RouterList;
    },
    set_routerH(state, RouterList) {
      state.RouterListH = RouterList;
    },
    set_token(state, token) {
      state.token = token;
    },
  },
  actions: {
    // 设置动态路由
    setRouterList(context, routerList) {
      context.commit('set_router', routesList.concat(routerList));
    },
    // http请求获取路由
    setRouterListH(context, routerList) {
      context.commit('set_routerH', routerList);
    },
    setToken(context, token) {
      context.commit('set_token', token);
    },
  }
});