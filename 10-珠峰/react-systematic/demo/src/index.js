//对ES6内置API做兼容性处理
import 'react-app-polyfill/ie11'   //这个表示可以兼容到ie11
import 'react-app-polyfill/ie9'   //这个表示可以兼容到ie11
import 'react-app-polyfill/stable'   //这个表示可以兼容到ie11
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div>珠峰培训</div>);

fetch('/jian/subscriptions/recommended_collections').then(res=>res.json()).then(value => {
    console.log(value,'简书value')
})

fetch('/zhi/news/latest').then(res=>res.json()).then(value => {
    console.log(value,'知乎value')
})
