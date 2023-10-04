/*
 * @Author: liming
 * @Date: 2022-06-06 22:32:05
 * @LastEditTime: 2022-06-06 22:32:05
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\05_React中实现slot\NavBar.js
 */
import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
    return (
        <div className='nav-item nav-bar'>
            <div className='nav-left'>
                { this.props.children[0]}
            </div>
            <div className='nav-item nav-center'>
                { this.props.children[1]}
            </div>
            <div className='nav-item nav-right'>
                { this.props.children[2]}
            </div>
      </div>
    )
  }
}
