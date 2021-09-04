// import CountUI from '../../components/Count'
// 我们就不用在这引入了，我们直接把CountUI组件就写在这里即可
import React, { Component } from 'react'
// 注意：import导入语句一定要都挨在一起


import { connect } from 'react-redux'

// 容器组件是根据UI组件加工而来的
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

//定义UI组件
class Count extends Component {
    state = { carName: '奔驰c63' }
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
    incrementWait = () => {
        const { value } = this.selectedNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        // console.log('UI组件接收到的props是：',this.props);
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
                {/* 这个count是你父亲containers给的，而父亲的count是a函数接到的,调的时候人家帮你传好了*/}
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
    //mapStateToProps
    state => ({ count: state }),
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync:createIncrementAsyncAction,
    }
)(Count)


