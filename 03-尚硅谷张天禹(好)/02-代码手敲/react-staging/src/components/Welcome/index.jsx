/*
 * @Author: liming
 * @Date: 2021-08-03 01:09:18
 * @LastEditTime: 2021-08-04 18:24:05
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\Welcome\index.jsx
 */

// 有些js是一般js，有些js是组件，我们可以把是组件的js改成jsx，这样比较好区分。

import React, { Component } from 'react';
// import './Welcome.css'
// import './index.css'
import welcome from './index.module.css'
// 如果你的css文件加了module关键词，你就可以这么玩了——不过样式的模块化用的不是特别多
//注意：脚手架里使用import来引用样式，而不是使用link，并且.css后缀名也不能少
export default class Welcome extends Component {
    render() {
        return (
            <div>
                {/* <h2 className="demo">Welcome</h2> */}
                <h2 className={welcome.title}>Welcome</h2>
            </div>
        )
    }
}