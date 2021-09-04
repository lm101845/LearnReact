/*
 * @Author: liming
 * @Date: 2021-08-30 17:03:27
 * @LastEditTime: 2021-09-04 20:37:41
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    // <App />,
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
