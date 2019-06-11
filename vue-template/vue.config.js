const webpack = require('webpack')
const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //插件

// 获取路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
//引入外部类库,jq
const jqPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
});
// 插件， 去除console.log
const delConsolPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: false,
      pure_funcs: ['console.log'] //移除console
    }
  },
  sourceMap: false,
  parallel: true
})

module.exports = {
  // baseUrl: '/', //跟路径
  //跟路径
  publicPath: '/',

  //打包路径
  outputDir: 'dist',

  // indexPath:'',
  //静态资源目录(js/css/img/fonts)  打包之后
  assetsDir: 'assets',

  //.map文件,有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  productionSourceMap: false,

  integrity: true,

  //是否开启esLint检测，有效值：true/false/error
  lintOnSave: false,

  // 代理
  devServer: {
    open: true, //npm run sever之后是否直接打开网页
    host: '0.0.0.0', //域名
    port: 8081,
    https: false,
    hotOnly: false, //热更新，webpack自带
    proxy: {
      // 设置跨域
      '/api': {
        target: 'http:localhost:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  },

  // 设置自定义路径
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set('@c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },

  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    plugins: [jqPlugin, delConsolPlugin],
  },

  css: {
    extract: true, // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    sourceMap: false,
    modules: false, // 启用 CSS modules for all css / pre-processor files.
    loaderOptions: {
      // 全局引入sass
      sass: {
        data: `@import "@/assets/css/comment.scss";`
      }
    }
  }
}