/*
 * @Author: liming
 * @Date: 2021-09-04 06:46:30
 * @LastEditTime: 2021-09-04 22:45:17
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\containers\Count\index.jsx
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/actions/count'
//Count是UI
class Count extends Component {
    //加法
    increment = () => {
        const { value } = this.selectedNumber
        this.props.jia(value * 1)
    }
    //减法
    decrement = () => {
        const { value } = this.selectedNumber
        this.props.jian(value * 1)
    }
    // (当前求和)奇数再加
    incrementOdd = () => {
        const { value } = this.selectedNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    //等会再加
    incrementWait = () => {
        const { value } = this.selectedNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        return (
            <div>
                <h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
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
    state => ({ count: state.he,renshu:state.rens.length}),
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction,
    }
)(Count)
