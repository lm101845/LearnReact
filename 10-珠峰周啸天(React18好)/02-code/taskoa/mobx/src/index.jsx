import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import Task from "./views/Task";   //函数式组件
/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
/*REDUX*/
// import {Provider} from 'react-redux'
// import './defineProperty'
// import './views/decorator/decorator4'
import Demo1 from './mobxDemo6'

/*MOBX*/
import {Provider} from 'mobx-react'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        {/*<Demo1></Demo1>*/}
        {/*基于Provider把各个板块中的Store的实例，都放在上下文中*/}
            <Provider {...store} /*等价于task={store.task} personal={store.personal}*/>
                <Task/>
            </Provider>
    </ConfigProvider>
);
