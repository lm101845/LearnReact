/**
 * @Author liming
 * @Date 2022/11/4 19:27
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        //在constructor构造器中有一个规定，那就是在super()调用前是不能够使用this的。
        //回到我们的React类组件中，super(props)显然是调用了父类Component的构造器，而传入props的作用就是初始化props实例。
        //这个state是在构造器里面写的
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                <h2>当前计数：{this.state.counter}</h2>
                <button onClick={e=>this.increment()}>+1</button>
            </div>
        );
    }

    increment(){
        // this.state.counter += 1;
        console.log(this.state.counter)
        //不能这样修改数据，界面无法刷新(虽然控制台数据变化了)
        //我们必须通过setState来告知React数据已经发生了变化
        this.setState({
            //setState是异步更新的
            counter:this.state.counter + 1
        })
    }
}

