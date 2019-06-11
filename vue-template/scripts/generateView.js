const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const resolve = (...file) => path.resolve(__dirname, ...file);
// const route = require("../src/router/home");

const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const {
  vueTemplate,
  vueTemplateT,
  routeTemplate,
  routeTemplateL,
  routeTemplateLT,
  routeTemplateT,
  apiTemplate
} = require('./template')

// 判断文件是否存在,并引入
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

log('请输入要生成的页面组件名称,会生成在views/目录中');
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString();
  var componentDirectory = resolve('../src/views', inputName); // vue组件目录路径
  let componentName = null;
  var N = null;

  console.log(componentDirectory, 'componentDirectory');

  try {
    // 判断有没有t,有的话,自动生成template目录  创建view
    if (inputName.includes('/t')) {
      if (inputName.includes('/t/l')) {
        componentName = inputName.substring(inputName.lastIndexOf('/t/l'), 0);
        N = componentDirectory.substring(componentDirectory.lastIndexOf('\\t\\l'), 0)
      } else {
        componentName = inputName.substring(inputName.lastIndexOf('/t'), 0);
        N = componentDirectory.substring(componentDirectory.lastIndexOf('\\t'), 0)
      }
    } else if (inputName.includes('/l')) {
      if (inputName.includes('/t/l')) {
        componentName = inputName.substring(inputName.lastIndexOf('/t/l'), 0);
        N = componentDirectory.substring(componentDirectory.lastIndexOf('\\t\\l'), 0)
      } else {
        componentName = inputName.substring(inputName.lastIndexOf('/l'), 0);
        N = componentDirectory.substring(componentDirectory.lastIndexOf('\\l'), 0)
      }
    } else {
      componentName = inputName;
      N = componentDirectory;
    }
    var componentVueName = resolve(N, 'index.vue');
    if (!inputName.includes('/t')) {
      var componentDirectory = N;
    } else {
      var componentDirectory = N + '\\template';
    }

    // 判断文件是否存在
    const hasComponentExists = fs.existsSync(componentVueName);
    if (hasComponentExists) return errorLog(`${inputName}页面组件已存在,请重新输入`);
    log(`正在生成cview目录${componentDirectory}`);
    await dotExistDirectoryCrate(componentDirectory);
    successLog('生成目录成功');

    log(`正在生成vue文件${componentVueName}`);
    // 路由
    var r = path.resolve(__dirname).substring(path.resolve(__dirname).lastIndexOf('\\scripts'), 0)
    a = r + '\\src\\router\\' + componentName
    await dotExistDirectoryCrate(a);
    a = resolve(a, 'index.js')
    //如果有l,代表需要登陆,加入meta对象
    if (inputName.includes('/l')) {
      if (inputName.includes('/t/l')) {
        await generateFile(componentVueName, vueTemplateT(componentName));
        await generateFile(a, JSON.stringify(routeTemplateLT(componentName)));
      } else {
        await generateFile(a, JSON.stringify(routeTemplateL(componentName)));
        await generateFile(componentVueName, vueTemplate(componentName));
      }
    } else if (inputName.includes('/t')) {
      await generateFile(componentVueName, vueTemplateT(componentName));
      if (inputName.includes('/t/l')) {
        await generateFile(a, JSON.stringify(routeTemplateLT(componentName)));
      } else {
        await generateFile(a, JSON.stringify(routeTemplateT(componentName)));
      }
    } else {
      await generateFile(componentVueName, vueTemplate(componentName));
      await generateFile(a, JSON.stringify(routeTemplate(componentName)));
    }

    log(`正在生成router文件${a}`);

    successLog('生成文件成功');
    successLog('生成路由成功');

    log(`正在生成接口文件${a}`);

    var api = r + '\\src\\utils\\api\\' + componentName + '.js'
    await generateFile(api, apiTemplate);


    // 路由创建成功后,在次读写,删除js文件中前后的双引号
    let dataSync = fs.readFileSync(a, 'utf-8');
    dataSync = dataSync.substring(1, dataSync.length - 1)
    fs.writeFileSync(a, dataSync, 'utf-8');
  } catch (error) {
    errorLog(error.message);
  }
  process.stdin.emit('end');
})
process.stdin.on('end', () => {
  log('exit');
  process.exit();

})

// 生成目录
function dotExistDirectoryCrate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, () => {
      resolve(true);
    })
  })
}
// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}