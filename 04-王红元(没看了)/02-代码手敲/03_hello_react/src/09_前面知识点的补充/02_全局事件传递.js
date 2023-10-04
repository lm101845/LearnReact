/**
 * @Author liming
 * @Date 2022/11/5 22:38
 **/

import React, {PureComponent} from 'react';
import {EventEmitter} from 'events'
//事件总线：event bus
const eventBus = new EventEmitter();
class Home extends PureComponent{
    componentDidMount() {
        eventBus.addListener("sayHello",this.handlerSayHelloListener)
    }

    componentWillUnmount() {
        eventBus.removeListener("sayHello",this.handlerSayHelloListener)
    }

    handlerSayHelloListener(args){
        console.log(args,'接收到的参数')
    }
    render() {
        return (
            <div>
                Home

            </div>
        );
    }
}

class Profile extends PureComponent{
    render() {
        return (
            <div>
                Profile--发消息
                <button onClick={e=>this.emitEvent()}>点击了Profile按钮</button>
            </div>
        );
    }

    emitEvent(){
        eventBus.emit("sayHello","home你好")
    }
}

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                <Home/>
                <Profile/>
            </div>
        );
    }
}