const fs = require('fs');
const path = require('path');
const { getAst, getCode, getDependecies } = require('./parser');
module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    const info = this.build(this.entry);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];//filename,dependece,code
      const { dependecies } = item;
      if (dependecies) {
        for (let j in dependecies) {
          this.modules.push(this.build(dependecies[j]));
        }
      }
    }
    let bundle = {};
    this.modules.forEach(item => {
      bundle[item.filename] = {
        dependecies: item.dependecies,
        code: item.code
      }
    })
    this.file(bundle);
  }
  /**
   * 分析依赖
   */
  build(path) {
    let ast = getAst(path);
    const dependecies = getDependecies(ast, path);
    let code = getCode(ast);
    return {
      filename: path,
      dependecies,
      code
    }
  }
  /**
   * 输出文件
   */
  file(bundleObj) {
    //1 测试写文件
    //2 code 执行
    const newCode = JSON.stringify(bundleObj);
    const filePath = path.join(this.output.path, this.output.filename);
    console.log(filePath, '=====filePath=====');
    const bundle = `(function(graph){
        function require(module){
          function localRequire(relativePath){
            return require(graph[module].dependecies[relativePath])
          }
          var exports = {};
          (function(require,exports,code){
            console.log('code before eval',code);
            eval(code)
          })(localRequire,exports,graph[module].code) 
          return exports;
        }
        require('${this.entry}')
    })(${newCode})`;
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(path.dirname(filePath));
    }
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}

/**
 * 0 结果/目标演示
 * 1 首页
 * 2 其他模块
 *
 *
 */
//import 方式不同，require 