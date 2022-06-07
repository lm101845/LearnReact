/*
 * @Author: liming
 * @Date: 2022-06-06 22:30:33
 * @LastEditTime: 2022-06-06 22:30:33
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\05_React中实现slot\App.js
 */
import React, { Component } from 'react'
import NavBar from './NavBar'
import NavBar2 from './NavBar2'
export default class App extends Component {
  render() {
    return (
        <div>
            <NavBar>
                <span>aaa</span>
                <strong>bbb</strong>
                <a href="/#">ccc</a>
                {/* 问题：这种做法顺序不能乱，所以这种方法适用于只放一个东西 */}
            </NavBar>
            <hr />
            <NavBar2
                leftSlot={ <span>aaa</span> }
                centerSlot={ <strong>bbb</strong> }
                rightSlot={ <a href="/#">ccc</a> }
            />
      </div>
    )
  }
}
