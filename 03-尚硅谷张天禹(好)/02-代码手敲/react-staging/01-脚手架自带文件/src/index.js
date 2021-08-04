/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-03 00:29:41
 * @FilePath: \react-staging\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// index.js入口文件是如何找到index.html里面的id为root的容器呢？
// 这个是React官方脚手架底层写好的

reportWebVitals();
