/*
 CommonJS模块规范：
    导出模块  
      module.exports = { ... }
      module.exports = ...
    导入模块
      const xxx = require(模块地址「可以省略.js后缀」)
    实现了真正的按需导入：啥时候用，啥时候导入即可

 CommonJS模块规范实现了模块导入的缓存机制
   导入一个模块，会把这个模块中的代码执行，获取其导出的内容「并且缓存起来」
   当后续，在遇到这个模块的导入，不再重新把模块中的代码执行，而是直接获取之前缓存中存储的导出的内容！！

 只支持在Node（或者webpack）环境下运行，不支持浏览器环境！！
*/

const A = require('./A');
console.log(A.sum(10, 20, 30, 40));

const average = require('./B');
console.log(average(10, 20, 30, 40));