/**
 * @Author liming
 * @Date 2022/11/4 22:07
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                <h2>当前计数:{this.state.counter}</h2>
                <button onClick={e=>this.increment()}>+1</button>
            </div>
        );
    }

    increment(){
        //1.setState本身被合并
        //https://www.mybj123.com/7401.html
        // this.setState({
        //     counter:this.state.counter + 1
        // })
        // this.setState({
        //     counter:this.state.counter + 1
        // })
        // this.setState({
        //     counter:this.state.counter + 1
        // })
        //调用了3次，但是显示的还是1
        //虽然你写了3次，但是它会合并的

        //2.我希望setState合并时进行累加(使用函数)
        this.setState((preState,props)=>{
           return {
               counter:preState.counter + 1
           }
        })

        this.setState((preState,props)=>{
           return {
               counter:preState.counter + 1
           }
        })

        this.setState((preState,props)=>{
           return {
               counter:preState.counter + 1
           }
        })
    }
}