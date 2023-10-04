import React, { Component } from 'react'



export default class Count extends Component {


    state = { carName: '奔驰c63' }
    //加法
    increment = () => {
        const { value } = this.selectedNumber
        // 我只是在UI组件里面调用了父亲给我的jia——我可没有调用任何redux相关的API
        this.props.jia(value*1)
        //当你点击加法+的时候，走的是这个回调，一走这个回调
        // 用户选择了value值，你把这个value值交给父亲给你的jia方法
    }
    //减法
    decrement = () => {
        const { value } = this.selectedNumber
        this.props.jian(value*1)
    }
    // (当前求和)奇数再加
    incrementOdd = () => {
        const { value } = this.selectedNumber
        if (this.props.count% 2 !== 0) {
        this.props.jia(value*1)
        }
    }
    incrementWait = () => {
        const { value } = this.selectedNumber
        this.props.jiaAsync(value*1,500)
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
