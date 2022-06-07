/*
 * @Author: liming
 * @Date: 2022-04-30 23:06:53
 * @LastEditTime: 2022-04-30 23:06:53
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\03_组件的通信\01_组件间的嵌套.js
 */
import React, { Component } from 'react'
//现在我们把App拆成3部分
function Header() {
    return <h2> 我是Header组件 </h2>
}

function Banner() {
    return <h2> 我是Banner组件 </h2>
}

function Main() {
    return (
        <div>
            <h2>我是Main组件</h2>
            <Banner></Banner>
        </div>
    )
}

function Footer() {
    return <h2> 我是Footer组件 </h2>
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}
