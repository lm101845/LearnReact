import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Demo from "@/views/Demo";
import store from './store/index'

import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Demo />
        </Provider>
    </ConfigProvider>
);
