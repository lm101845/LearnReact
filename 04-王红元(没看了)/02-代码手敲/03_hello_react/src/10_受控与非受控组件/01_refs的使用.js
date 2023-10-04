/**
 * @Author liming
 * @Date 2022/11/5 23:32
 **/

import React, {createRef, PureComponent, useState} from 'react';

class Counter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                <h2>当前计数: {this.state.counter}</h2>
                <button onClick={e => this.increment()}>+1</button>
            </div>
        )
    }

    increment() {
        this.setState({
            counter: this.state.counter + 1
        })
    }
}

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        //ref用在html元素上
        this.titleRef2 = createRef()
        this.titleRef3 = null
        //ref用在组件上
        this.counterRef = createRef()
        this.state = {
            counter: 0
        }
    }


    render() {
        return (
            <div>
                {/*<h2 ref=字符串/对象/函数>Hello React</h2>*/}
                <h2 ref="titleRef1">Hello React1</h2>
                {/*目前React推荐的方式*/}
                <h2 ref={this.titleRef2}>Hello React2</h2>
                <h2 ref={arg=>{this.titleRef3 = arg}}>Hello React3</h2>
                <button onClick={e=>this.changeText()}>改变文本</button>
                <hr/>
                <Counter ref={this.counterRef}/>
                <button onClick={e=>this.appBtnClick()}>App按钮</button>
            </div>
        );
    }

    changeText(){
        //方式1：字符串(不推荐)
        // console.log(this.refs.titleRef1);
        this.refs.titleRef1.innerHTML = "你好,世界1"

        //方式2：对象形式
        this.titleRef2.current.innerHTML = "你好,世界2"

        //方式3：回调函数形式
        // console.log(this.titleRef3)
        this.titleRef3.innerHTML = "你好,世界3"
    }

    appBtnClick(){
        console.log(this.counterRef)
        //打印出来的是一个组件对象
        //注：如果是函数式组件，是获取不到组件对象的，因为函数式组件没有组件实例
        //在父组件里面直接调用子组件里的一个函数
        this.counterRef.current.increment()
    }
}
