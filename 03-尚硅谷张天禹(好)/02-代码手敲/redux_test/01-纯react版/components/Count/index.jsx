import React, { Component } from 'react'

export default class Count extends Component {
    state = {
        count: 0
    }
    // 以下的写法通用性不强，太多冗余代码但是这里不要做太多的整合，因为一会儿我们要引入redux

    //加法
    increment = () => {
        const { value } = this.selectedNumber
        // 获取用户输入——你确实拿到了用户的输入了，但是你拿到的是一个【字符串】
        // 你把value*1，执行一下强制类型转换即可
        const { count } = this.state
        // 读取原来的状态值
        this.setState({
            count: count + value * 1
        })
    }
    //减法
    decrement = () => {
        const { value } = this.selectedNumber
        const { count } = this.state
        this.setState({
            count: count - value * 1
        })
    }
    // (当前求和)奇数再加
    incrementOdd = () => {
        const { value } = this.selectedNumber
        const { count } = this.state
        if (count % 2 !== 0) {
            this.setState({
                count: count - value * 1
            })
        }

    }
    incrementWait = () => {
        const { value } = this.selectedNumber
        const { count } = this.state
        setTimeout(() => {
                this.setState({
                count: count + value * 1
            })
        },500)
    }
    render() {
        const { count } = this.state
        return (
            <div>
                <h1>当前求和为：{count}</h1>
                {/* <select> */}
                <select ref={c => this.selectedNumber = c}>
                    {/*this.selectedNumber = c意思是把这个select节点放到了组件实例自身上，然后给它起了一个名字叫selectedNumber*/}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                {/* 写个回调形式的ref */}
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementWait}>等一会再加(异步加)</button>
                {/* 按住Alt键就能选好多 */}
            </div>
        )
    }
}
