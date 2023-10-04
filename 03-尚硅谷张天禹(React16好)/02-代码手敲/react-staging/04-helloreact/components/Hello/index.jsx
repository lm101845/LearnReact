/*
 * @Author: liming
 * @Date: 2021-08-03 01:09:18
 * @LastEditTime: 2021-08-04 18:22:57
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\Hello\index.jsx
 */
import React, { Component } from 'react';
// import './Hello.css'
import hello from './index.module.css'
// 样式也是可以做模块化的——给.css文件名字中间加上module
//注意：脚手架里使用import来引用样式，而不是使用link，并且.css后缀名也不能少
export default class Hello extends Component {
    render() {
        return (
            <div>
                {/* <h2 className="title">Hello</h2> */}
                <h2 className={ hello.title}>Hello</h2>
            </div>
        )
    }
}