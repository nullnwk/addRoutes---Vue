import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './router/router-intercept';

import axios from './utils/http-axios';
import jq from './utils/http-jq';

import './components';


Vue.config.productionTip = false;

Vue.use(axios)
Vue.use(jq)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");