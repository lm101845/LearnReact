/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-25 17:27:49
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\index.js
 */

//脚手架已经帮你安好React了

//在入口文件里面的第一件事：引入React核心库
import React from 'react';

//引入ReactDOM
import ReactDOM from 'react-dom';

// 引入Router
// Router分为2种：BrowserRouter(history模式，没有＃号，但是兼容性不好)和HashRouter(有井号，丑，但是兼容性好)
// ＃后面的东西叫哈希值，特点是＃后面的东西都不作为资源发给服务器，当成前台资源
import {BrowserRouter } from 'react-router-dom'
// import {HashRouter } from 'react-router-dom'
//引入App组件
import App from './App';
//.js后缀名可以省略(.css后缀名无法省略)

//渲染APP组件到页面
// 为了一劳永逸的解决问题，把App给包起来
ReactDOM.render(
    <BrowserRouter> <App /></BrowserRouter>,
    // <HashRouter> <App /></HashRouter>,
    document.getElementById('root'))





