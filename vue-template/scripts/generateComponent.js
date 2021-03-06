const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const resolve = (...file) => path.resolve(__dirname, ...file);

const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));

const {
  vueTemplate,
  entryTemplate
} = require('./template');

const generateFile = (path, data) => {
  if (fs.existsSync(path)) return errorLog(`${path}文件已存在`);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', err => {
      if (err) {
        errorLog(err.message);
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
console.log('请输入要生成的组件名称、如需生成全局组件，请加 global/ 前缀');

let componentName = '';
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString();
  // 组件目录路径
  const componentDirectory = resolve('../src/components', inputName);
  // vue组件路径
  const componentVueName = resolve(componentDirectory, 'main.vue');
  // 入口文件路径
  const entryComponentName = resolve(componentDirectory, 'index.js');

  const hasComponentDirectory = fs.existsSync(componentDirectory);
  if (hasComponentDirectory) return errorLog(`${inputName}组件目录已存在,请重新输入`);
  log(`正在生成component目录${componentDirectory}`);
  await dotExistDirectoryCreate(componentDirectory);

  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log(`正在生成vue文件${componentVueName}`);
    await generateFile(componentVueName, vueTemplate(componentName));
    log(`正在生成 entry 文件 ${entryComponentName}`)
    await generateFile(entryComponentName, entryTemplate)
    successLog('生成成功')

  } catch (error) {
    errLog(error.message);
  }
  process.stdin.emit('end');
})

process.stdin.on('end', () => {
  log('exit');
  process.exit();
})

// 生成目录
function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory);
      callback();
    })
  }

}