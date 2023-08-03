import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

// import Vote from "./views函数组件上下文/Vote";
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Vote from "@/views/Vote";
import store from './store/index'
import ThemeContext from './ThemeContext'
// console.log(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <ThemeContext.Provider value={{store}}>
            {/*基于上下文中的provider,把创建的store放在祖先的上下文中*/}
            <Vote/>
        </ThemeContext.Provider>
    </ConfigProvider>
);
