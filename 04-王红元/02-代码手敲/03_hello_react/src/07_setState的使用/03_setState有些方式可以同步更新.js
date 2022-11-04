/**
 * @Author liming
 * @Date 2022/11/4 20:49
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello World'
        }
    }

    render() {
        return (
            <div>
                <h2>当前文本：{this.state.message}</h2>
                <button onClick={e => this.changeText()}>改变文本</button>
                <br/><br/>
                <button id="btn">改变文本2</button>
            </div>
        );
    }
    componentDidMount() {
        document.getElementById("btn").addEventListener('click',()=>{
            //方式二：使用原始DOM方式来监听按钮点击
            console.log('被点击了')
            this.setState({
                message: "你好，世界"
            })
            console.log(this.state.message, '使用了定时器，就变成同步了')
        })
    }

    changeText() {
        //方式一：将setState放入到定时器中执行
        setTimeout(() => {
            this.setState({
                message: "你好，世界"
            })
            console.log(this.state.message, '使用了定时器，就变成同步了')
        }, 0)
    }
}