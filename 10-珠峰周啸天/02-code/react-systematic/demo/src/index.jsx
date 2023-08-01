import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from '@/views类组件上下文/Demo12'
// import './index.less'
import FastClick from 'fastclick'

FastClick.attach(document.body)   //对document中所有点击事件解决300ms延迟
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Demo/>
    </>
)


