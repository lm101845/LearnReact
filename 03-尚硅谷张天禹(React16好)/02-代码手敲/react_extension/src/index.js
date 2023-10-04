/*
 * @Author: liming
 * @Date: 2021-09-05 22:25:05
 * @LastEditTime: 2021-09-05 23:17:10
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\index.js
 */
//脚手架已经帮你安好React了

//在入口文件里面的第一件事：引入React核心库
import React from 'react';

//引入ReactDOM
import ReactDOM from 'react-dom';


import App from './App';

import { BrowserRouter}  from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'))