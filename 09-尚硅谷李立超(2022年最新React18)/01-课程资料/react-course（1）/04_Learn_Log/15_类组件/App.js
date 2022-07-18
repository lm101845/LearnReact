/*
*   Webstrom中的快捷方式：
*       rsc --> 函数组件（不带props）
*       rsi --> 函数组件（带props）
*       rcc --> 类组件
* */

import React, {Component} from 'react';
import './App.css';
import User from "./components/User";

class App extends Component {
    render() {
        return (
            <div className="app">
                <User name='猪八戒' age={28} gender={'男'}/>
            </div>
        );
    }
}

export default App;


