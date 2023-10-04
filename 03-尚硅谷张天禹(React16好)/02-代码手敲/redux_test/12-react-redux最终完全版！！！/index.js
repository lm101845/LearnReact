/*
 * @Author: liming
 * @Date: 2021-08-30 17:03:27
 * @LastEditTime: 2021-09-04 23:53:24
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    // 此处需要用Provider包裹App,目的是让App所有的后代容器组件都能接收到store(不用你自己一个一个来了)
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
