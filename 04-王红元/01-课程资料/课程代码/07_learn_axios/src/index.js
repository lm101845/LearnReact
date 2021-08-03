import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import App from './App';

// 7.默认配置
axios.defaults.baseURL = "https://httpbin.org";
axios.defaults.timeout = 5000;
axios.defaults.headers.common["token"] = "dafdafadfadfadfas";
// axios.defaults.headers.post["Content-Type"] = "application/text";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
