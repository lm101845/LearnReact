/*
 * @Author: liming
 * @Date: 2022-05-01 11:11:00
 * @LastEditTime: 2022-05-01 11:11:01
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\03_组件的通信\02_父传子通信-类组件.js
 */
import React, { Component } from 'react'

class ChildCpn extends Component {
    constructor(props) { 
        super()
        // this.props = props
        console.log(this.props,'这里打印为undefined');
        //相当于把父传过来的props传到当前对象里了
        //其实不实现constructor函数也是可以拿到props的
    }
    render() {
        console.log('rener里面的this.props',this.props);
        const {name,age,height} = this.props
        return (
            <div>
                <h2>子组件展示名字：{name + "-" + age + "-" + height + ""}</h2>
            </div>
        )
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <ChildCpn name="why" age="18" height="1.88"/>
                <ChildCpn name="Kobe" age="44" height="1.98"/>
            </div>
        )
    }
}
