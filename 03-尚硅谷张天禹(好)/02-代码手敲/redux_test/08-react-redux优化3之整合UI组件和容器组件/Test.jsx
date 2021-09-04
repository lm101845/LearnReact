import React, { Component } from 'react'

// 一个文件里面可以定义2个组件的！！！
 class Demo extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default class Test extends Component {
    render() {
        return (
            <div>
                <Demo />
                {/* 因为默认暴露只能暴露一次，所以这个Demo组件我就在自己家用即可 */}
            </div>
        )
    }
}
