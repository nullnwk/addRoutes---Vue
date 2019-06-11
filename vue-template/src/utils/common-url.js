// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://172.17.71.40:9091/pro/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'http://localhost:3000/',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'http://172.17.71.40:9091/test/',
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]