import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import Demo from "./views/Demo14";
import Vote from "./views/Vote";
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Demo x={10} y={20}/>
        {/*<Vote title="React学好需要JS功底 "/>*/}
    </ConfigProvider>
);
