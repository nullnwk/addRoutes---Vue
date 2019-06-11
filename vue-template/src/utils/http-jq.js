import config from './common-url'
import * as auth from './auth'

let jqCreate = {
  baseURL: config.baseURL,
  timeout: 1000 * 60,
  header: {
    'X-Access-Token': auth.getToken() || '',
  }
}

function getDataSync(url, type, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: jqCreate.baseURL + url,
      headers: jqCreate.headers,
      type: type,
      data: data,
      timeout: jqCreate.timeout,
      async: true,
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

function getDataAsync(url, type, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: jqCreate.baseURL + url,
      headers: jqCreate.headers,
      type: type,
      data: data,
      timeout: jqCreate.timeout,
      async: false,
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

export default {
  install: function (Vue, options) {
    Vue.prototype.getDataSync = getDataSync;
    Vue.prototype.getDataAsync = getDataAsync
  }
}