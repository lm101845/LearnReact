import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
// import Task from "./views类组件上下文/Task";   //类式组件
import Task from "./views/Task1";   //函数式组件
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Task/>
    </ConfigProvider>
);
