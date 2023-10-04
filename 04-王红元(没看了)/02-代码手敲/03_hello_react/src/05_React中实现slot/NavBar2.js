/*
 * @Author: liming
 * @Date: 2022-06-06 22:47:06
 * @LastEditTime: 2022-06-06 22:47:07
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\05_React中实现slot\NavBar copy.js
 */
/*
 * @Author: liming
 * @Date: 2022-06-06 22:32:05
 * @LastEditTime: 2022-06-06 22:32:05
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\05_React中实现slot\NavBar.js
 */
import React, { Component } from 'react'

export default class NavBar2 extends Component {
    render() {
        const { leftSlot, centerSlot, rightSlot } = this.props
    return (
        <div className='nav-item nav-bar'>
            <div className='nav-left'>
                { leftSlot}
            </div>
            <div className='nav-item nav-center'>
                { centerSlot}
            </div>
            <div className='nav-item nav-right'>
                { rightSlot}
            </div>
      </div>
    )
  }
}
