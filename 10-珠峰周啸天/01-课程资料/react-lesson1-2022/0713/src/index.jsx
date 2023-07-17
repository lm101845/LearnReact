import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/Demo5';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Demo />
  </>
);

// <React.StrictMode>会导致组件连续渲染两次，当初就是这样设计的，以此来更精准的检测出“不符合规范”的语法