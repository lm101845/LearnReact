/**
 * @Author liming
 * @Date 2023/9/6 17:45
 **/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'



/*ANTD-MOBILE*/
import 'antd-mobile/es/global';
import {ConfigProvider} from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";

/*改变REM换算比例*/
import 'lib-flexible'
import './index.less'

/*处理最大宽度*/
(function (){
    const handleMax = function (){
        let html = document.documentElement
        let root = document.getElementById('root')
        let deviceW = html.clientWidth
        root.style.maxWidth = '750px'
        if(deviceW >= 750){
            html.style.fontSize = '75px'
        }
    }
    handleMax()
    // window.addEventListener('resize',handleMax)
    // 不用加，因为就一台手机
})()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
       <App/>
    </ConfigProvider>
);
