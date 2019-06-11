import axios from 'axios'
import config from './common-url'
import * as auth from './auth'


export const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 1000 * 60,
  headers: {
    'X-Access-Token': auth.getToken(),
  }
})

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken; //用来取消axios请求
let removePending = config => {
  for (let p in pending) {
    if (pending[p].u === config.baseURL + '&' + config.method) {
      // 当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}
//post传参序列化---请求拦截器
instance.interceptors.request.use(config => {
  removePending(config);
  config.cancelToken = new CancelToken(
    c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({
        u: config.baseURL + '&' + config.method,
        f: c
      })
    },
    err => {
      console.log(err)
    }
  )
  return config
}, error => {
  nprogress.done()
  return error
})
// 返回状态判断---0响应拦截器
instance.interceptors.response.use(res => {
  if (!res.data) {
    return res;
  }
  removePending(res.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return res.data;
}, error => {
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
    } else {
      // 可以展示断网组件
      console.log('断网了')
    }
    return
  }
  // console.log(error.response, '2'); //可打印错误信息(根据后台)
  return Promise.reject(error)
})

// 上传文件
export const uploadFile = (url, f) => {
  const formData = new FormData();
  for (let i in f) {
    formData.append(i, f[i])
  }
  return instance({
    method: 'post',
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  install: function (Vue, options) {
    Vue.prototype.$http = instance;
    Vue.prototype.$uploadFile = uploadFile
  }
}