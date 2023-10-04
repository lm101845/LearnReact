const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') // 导入 在内存中自动生成 index 页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './src/index.html'), // 源文件
  filename: 'index.html' // 生成的内存中首页的名称
})


// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// webpack 默认只能打包处理 .js 后缀名类型的文件； 像 .png .vue 无法主动处理，所以要配置第三方的loader；
module.exports = {
  mode: 'development', // development   production
  // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
  plugins: [
    htmlPlugin
  ],
  module: { // 所有第三方 模块的配置规则
    rules: [ // 第三方匹配规则
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }, // 千万别忘记添加 exclude 排除项

      // 大家可以在 css-loader 之后，通过 ? 追加参数，
      // 其中，有个固定的参数，叫做 modules , 表示为 普通的 CSS 样式表，启用模块化
      { test: /\.css$/, use: ['style-loader', 'css-loader']}, // 打包处理 CSS 样式表的第三方loader
      { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' }, // 打包处理 字体文件 的loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]', 'sass-loader'] } // 打包处理 scss 文件的 loader
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'], // 表示，这几个文件的后缀名，可以省略不写
    alias: { // 表示别名
      '@': path.join(__dirname, './src') // 这样，@ 就表示 项目根目录中 src 的这一层路径
    }
  }
}


// 行不行 ？  目前不行； // 这是 ES6 中 向外导出模块的API 与之对应的 是  import ** from '标识符'
// export default {}
// 那些 特性 Node 支持呢？  如果 chrome 浏览器支持哪些，则 Node 就支持哪些；