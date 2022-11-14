import React, { PureComponent } from 'react';

import Home from './pages/home1-手动和redux联系';
import About from './pages/about';

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
