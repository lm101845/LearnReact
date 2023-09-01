import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

// import Vote2 from "./views函数组件上下文/Vote2";
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App'
import Vote from "@/views/Vote2";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Vote title="React是很棒的前端框架 "/>
        {/*<App/>*/}
    </ConfigProvider>
);
