import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/reset.min.css';
import Vote from '@/views类组件上下文/Vote';
/* 注册STORE到上下文中 */
import store from './store';
import { Provider } from './my-react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Vote />
  </Provider>
);
