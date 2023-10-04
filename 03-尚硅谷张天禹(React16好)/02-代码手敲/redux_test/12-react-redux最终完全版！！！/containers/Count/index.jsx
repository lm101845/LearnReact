/*
 * @Author: liming
 * @Date: 2021-09-04 06:46:30
 * @LastEditTime: 2021-09-05 00:28:25
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\containers\Count\index.jsx
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    increment,
    decrement,
    incrementAsync
} from '../../redux/actions/count'

//Count是UI
// 这里您该怎么写组件就怎么写组件，就是后面多引入了一个action,以及我暴露的时候做了一点手脚(暴露的是容器)
class Count extends Component {
    //加法
    increment = () => {
        const { value } = this.selectedNumber
        this.props.increment(value * 1)
    }
    //减法
    decrement = () => {
        const { value } = this.selectedNumber
        this.props.decrement(value * 1)
    }
    // (当前求和)奇数再加
    incrementOdd = () => {
        const { value } = this.selectedNumber
        if (this.props.count % 2 !== 0) {
            this.props.increment(value * 1)
        }
    }
    //等会再加
    incrementWait = () => {
        const { value } = this.selectedNumber
        this.props.incrementAsync(value * 1, 500)
    }
    render() {
        return (
            <div>
                <h2>我是Count组件,下方组件总人数为:{this.props.personCount}</h2>
                <h4>当前求和为：{this.props.count}</h4>
                <select ref={c => this.selectedNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementWait}>等一会再加(异步加)</button>
            </div>
        )
    }
}


export default connect(
    // state => ({ count: state }),
    state => ({
        count: state.count,
        personCount: state.persons.length
    }),
    {increment,decrement,incrementAsync}
)(Count)
