import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/reset.min.css';
import Vote from '@/views/Vote';
/* 注册STORE到上下文中 */
import store from './store';
import ThemeContext from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider
    value={{
      store
    }}>
    <Vote />
  </ThemeContext.Provider>
);