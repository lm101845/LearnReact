/*
 * @Author: liming
 * @Date: 2021-04-12 07:28:55
 * @LastEditTime: 2021-04-12 07:53:49
 * @FilePath: \01-黑马\01-自己手敲代码\01-webpack-base\webpack.config.js
 *
 */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin"); // 导入 在内存中自动生成 index 页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, "./src/index.html"), // 源文件
  filename: "index.html", // 生成的内存中首页的名称
});

// export default不能这么写
// 向外暴露一个打包的配置对象——这个是Node语法
// 因为Webpack是基于Node构建的，所以Webpack支持所有的Node API和语法
// webpack默认只能打包处理.js后缀类型的文件，像.png,.vue等文件webpack无法主动处理，所以要配置第三方的loader规则
module.exports = {
  mode: "development", //development production
  //   mode: "production",
  // 在webpack4.x中，有一个很大的特性，就是约定大于配置，约定默认的打包入口路径是src-->index.js
  plugins: {
    htmlPlugin,
  },
  module: {
    // module是所有第三方模块的配置规则
    rules: [
      //   第三方匹配规则
      { test: /\.js| jsx$/, use: "babel-loader", exclude: /node_modules/ },
      // 在配置babel的时候，一定要加上exclude，否则你的整个项目会报错
      // 千万别忘记添加exclude排除项
    ],
  },
};

// 这样写行不行？？——目前是不行的
// 这是ES6中向外导出模块的API,与之对应的是import * from '标识符'
// export default{}

// 哪些特性Node支持呢？——如果浏览器支持哪些，则Node就支持哪些(Node用的就是谷歌浏览器的V8引擎)
