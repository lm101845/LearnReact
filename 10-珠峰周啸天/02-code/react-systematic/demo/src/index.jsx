import React from 'react';
import ReactDOM from 'react-dom/client';
// import Test1 from './diff/Test1'
// import './index.less'
import FastClick from 'fastclick'
// import Demo1 from './iterator/Demo1'
import generatorDemo1 from './iterator/generatorDemo'
FastClick.attach(document.body)   //对document中所有点击事件解决300ms延迟
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
       hello
    </>
)


