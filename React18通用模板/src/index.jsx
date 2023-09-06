/**
 * @Author liming
 * @Date 2023/9/6 17:45
 **/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* ANTD-MOBILE */
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

/* REDUX */
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <App />
        {/*<Provider>*/}
        {/*   */}
        {/*</Provider>*/}
    </ConfigProvider>
);
