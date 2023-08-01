/* path是Node内置的路径处理模块 */
// __dirname：获取当前文件所在目录的绝对路径
// path.resolve：在某一个绝对路径的基础上，基于后面的相对路径地址，获取一个全新的绝对路径地址
const path = require('path');
console.log(path.resolve(__dirname, './dist'));