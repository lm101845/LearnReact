// ES6内置API的兼容处理
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';

fetch('/api/subscriptions/recommended_collections')
  .then(response => response.json())
  .then(value => {
    console.log('成功:', value);
  });

fetch('/zhihu/news/latest')
  .then(response => response.json())
  .then(value => {
    console.log('成功:', value);
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>珠峰培训</div>
  </React.StrictMode>
);
