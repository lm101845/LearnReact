import React, { PureComponent } from 'react';

import Home from './pages/home5-redux-saga使用';
import About from './pages/about4';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
        <About/>
      </div>
    )
  }
}
