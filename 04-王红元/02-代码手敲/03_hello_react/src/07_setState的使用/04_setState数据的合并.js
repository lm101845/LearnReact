/**
 * @Author liming
 * @Date 2022/11/4 21:24
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello World',
            name: 'coderwhy'
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
                <h2>{this.state.name}</h2>
                <button onClick={e => this.changeText()}>改变文本</button>
            </div>
        );
    }

    changeText() {
        this.setState({
            message: "你好，世界"
        })
        //this.state = Object.assign({},this.state,{message:'你好，世界'})
        //React本质上是这么写的，所以修改了message,state.name还是有的，不会被覆盖的
    }
}