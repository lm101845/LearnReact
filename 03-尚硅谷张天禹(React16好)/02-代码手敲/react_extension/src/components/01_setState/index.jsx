/*
 * @Author: liming
 * @Date: 2021-09-05 22:27:02
 * @LastEditTime: 2021-09-05 22:54:53
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\01_setState\index.jsx
 */
import React, { Component } from 'react'

export default class Demo extends Component {
    state = { count: 0 }
    
    add = () => {
        // 对象式的setState
        //1.获取原来的count值
        // const { count} = this.state
        //2.更新状态
        // setState的第一种写法——里面传对象
        // React帮你更新状态的时候，其实是异步的更新——setState函数是同步的，但是setState引起后续调用的函数动作是异步的
        // this.setState({
        //     count:count+1
        // }, () => {
        //     //这里的callback是可选的回调函数，它在状态更新完毕，界面也更新后(render调用后)才被调用
        //     console.log('setState回调函数里面的count',this.state.count);
        // })
        // console.log('count的输出为',this.state.count);


        // setState的第二种写法——里面传函数
        // this.setState((state, props) => { 
        this.setState(state=> ({
            // setState函数形式的优势：它可以拿到state(原来的状态值)和props(父组件传过来的数据)
            // console.log(state,props)
            // return {count:state.count+1}
            count:state.count+1}))
    }
    render() {
        return (
            <div> 
                <h1>当前求和为：{ this.state.count}</h1>
                <button onClick={this.add}>点我加1</button>
            </div>
        )
    }
}
