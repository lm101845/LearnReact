/**
 * @Author liming
 * @Date 2022/11/4 23:46
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            message: 'hello world'
        }
    }

    render() {
        console.log("App render函数被调用");
        return (
            <div>
                <h2>当前计数: {this.state.counter}</h2>
                <h2>{this.state.message}</h2>
                <button onClick={e => this.increment()}>+1</button>
                <button onClick={e => this.changeText()}>改变文本</button>
            </div>
        )
    }

    //生命周期函数：它不会阻止【第一次】渲染
    //默认返回true,写成false,则不会调用render函数了——但我们不应该不管三七二十一直接阻断了，不好
    //这个生命周期是类特有的，函数没有这个，而且每个类都要写，很麻烦！！
    //解决方法：让类继承PureComponent,而不是Component
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //nextProps:根据最新的props来判断要不要调用render函数
        //nextState:根据最新的state来判断要不要调用render函数
        if(this.state.counter !== nextState.counter){
            return true
        }
        return false
    }

    increment() {
        console.log('increment函数被调用了')
        this.setState({
            counter: this.state.counter + 1
        })
    }

    changeText(){
        this.setState({
            message:"你好世界"
        })
    }
}