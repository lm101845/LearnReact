// 快捷方式rcc react class component
// 快捷方式rfc react functional component
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        //render函数支持返回一个数组
        return (
            [
                <div>App1</div>,
                <div>App2</div>
            ]
        )
    }
}
