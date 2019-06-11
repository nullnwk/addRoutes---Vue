import store from '../store/index'
const tokenName = 'box-token';

//获取token
export function getToken() {
  var parsedObj = JSON.parse(window.localStorage.getItem(tokenName)) || '';
  return parsedObj.token;
}

//设置token
export function saveToken(obj) {
  // obj为登陆的所有信息
  window.localStorage.setItem(tokenName, JSON.stringify(obj) || '');
  store.dispatch("setToken", obj || '');
}

//删除token
export function removeToken() {
  // obj为登陆的所有信息
  window.localStorage.removeItem(tokenName);
}