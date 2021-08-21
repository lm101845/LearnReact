/*
 * @Author: liming
 * @Date: 2021-08-21 01:15:56
 * @LastEditTime: 2021-08-21 01:34:29
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\setupProxy.js
 */

// 这个文件名不能改，固定的
// 而且里面用的是Common.js语法，服务器模块化

const proxy = require('http-proxy-middleware');
// 引入一个内置的模块，不需要单独下载的
// 在你初始化脚手架的时候就已经下载好了
// 你在package.json里面使用proxy:'http:www.localhost:5000'时实际上也用到它了

module.exports = function (app) {
    //注意：每次一改这个核心的配置文件，都要停掉脚手架之后重新开启配置才能生效
    app.use(
        proxy('/api1', {   //不能什么都走代理吧，只有遇见/api前缀的请求，才会触发该代理配置
            // 以后看到你请求路径里面有api1，则转发此请求
            target: 'http://localhost:5000',   //请求转发给谁
            changeOrigin: true,  //控制服务器收到的响应头中Host字段的值
            // 默认值是false，我们要把它修改为true,更安全——撒谎
            pathRewrite:{'^/api1':''}   //重写请求路径——不写的话会产生严重问题(/api1用于标记哪个请求用代理，利用完后就把/api1替换为空字符串)
        }),
         proxy('/api2', {
            // 以后看到你请求路径里面有api1，则转发此请求
            target: 'http://localhost:5001',
            changeOrigin: true,
            // 默认值是false，我们要把它修改为true,更安全——撒谎
            pathRewrite:{'^/api2':''}
        })
    )
}