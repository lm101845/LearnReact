/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-04 18:27:30
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\index.js
 */

//脚手架已经帮你安好React了

//在入口文件里面的第一件事：引入React核心库
import React from 'react';

//引入ReactDOM
import ReactDOM from 'react-dom';

//引入App组件
import App from './App';
//.js后缀名可以省略(.css后缀名无法省略)

//渲染APP组件到页面
ReactDOM.render(<App/>,document.getElementById('root'))

// import React from './module'
// console.log(React);




