import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.less';

/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
            <App/>
    </ConfigProvider>
);
