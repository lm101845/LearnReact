import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

// import Vote2 from "./views函数组件上下文/Vote2";
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Vote from "@/views/Vote";
import store from './store/index'

// import ThemeContext from './ThemeContext'
//我们使用react-redux之后，就不需要自己写上下文ThemeContext了

import {Provider} from 'react-redux'
// console.log(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        {/*写法1：自己创建上下文对象*/}
        {/*<ThemeContext.Provider value={{store}}>*/}
        {/*    /!*基于上下文中的provider,把创建的store放在祖先的上下文中*!/*/}
        {/*    <Vote2/>*/}
        {/*</ThemeContext.Provider>*/}

        {/*写法2：使用react-redux,不用自己创建上下文对象了*/}
        <Provider store={store}>
            <Vote />
        </Provider>
    </ConfigProvider>
);
