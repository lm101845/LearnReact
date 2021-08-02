/*
 * @Author: liming
 * @Date: 2021-08-03 01:09:18
 * @LastEditTime: 2021-08-03 01:57:44
 * @FilePath: \react-staging\src\components\Hello\index.jsx
 */
import React, { Component } from 'react';
// import './Hello.css'
import './index.css'
//注意：脚手架里使用import来引用样式，而不是使用link，并且.css后缀名也不能少
export default class Hello extends Component {
    render() {
        return (
            <div>
                <h2 className="title">Hello</h2>
            </div>
        )
    }
}