import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from '@/views/Task';
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Task />
  </ConfigProvider>
);