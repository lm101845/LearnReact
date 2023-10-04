import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from '@/views类组件上下文/Task';
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';
/* REDUX */
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Task />
    </Provider>
  </ConfigProvider>
);
