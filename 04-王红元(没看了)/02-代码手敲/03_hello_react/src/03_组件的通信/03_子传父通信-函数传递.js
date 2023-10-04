/*
 * @Author: liming
 * @Date: 2022-05-01 12:28:01
 * @LastEditTime: 2022-05-01 21:53:35
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\03_组件的通信\03_子传父通信-函数传递.js
 */
import React, { Component } from 'react'

class CounterButton extends Component {
    render() {
        console.log(this.props,'子组件的props');
        const { onClick } = this.props;
        return <button onClick={ onClick }>CounterButton+1</button>
        //当我点击时执行increment函数，而这个函数是从父组件传递过来的
        //onClick={ onClick }有点不太明白
    }
}
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
                <h2>当前计数：{ this.state.count }</h2>
                <button onClick={ e => this.increment() }>点击+1</button>
                <button onClick={ this.increment } name='why'>点击+1使用原始，不行</button>
                <br />
                <hr />
                <CounterButton onClick={ this.increment.bind(this) } />
                <CounterButton onClick={ this.increment2} />
                <CounterButton onClick={e=> this.increment()} />
            </div>
        )
    }

    increment() {
        console.log('increment函数的this', this)
        this.setState({
            count: this.state.count + 1
        })
    }

    increment2 = ()=>{
        console.log('increment函数的this', this)
        this.setState({
            count: this.state.count + 1
        })
    }
}
