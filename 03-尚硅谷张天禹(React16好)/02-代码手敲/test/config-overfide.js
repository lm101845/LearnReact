/*
 * @Author: liming
 * @Date: 2021-08-28 23:00:07
 * @LastEditTime: 2021-08-28 23:05:35
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\test\config-overfide.js
 */

//配置具体的修改规则
// module.exports = function override(config, env) {
//   // do stuff with the webpack config...
    
//   return config;
// };

 const { override, fixBabelImports } = require('customize-cra');
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
 );