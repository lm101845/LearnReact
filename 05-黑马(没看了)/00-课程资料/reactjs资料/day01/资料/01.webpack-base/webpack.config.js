const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') // 导入 在内存中自动生成 index 页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './src/index.html'), // 源文件
  filename: 'index.html' // 生成的内存中首页的名称
})


// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
module.exports = {
  mode: 'development', // development   production
  // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
  plugins: [
    htmlPlugin
  ]
}


// 行不行 ？  目前不行； // 这是 ES6 中 向外导出模块的API 与之对应的 是  import ** from '标识符'
// export default {}
// 那些 特性 Node 支持呢？  如果 chrome 浏览器支持哪些，则 Node 就支持哪些；