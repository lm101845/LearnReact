import React from 'react'
import {flushSync} from "react-dom";
//flushSync:可以刷新'update'更新队列，也就是让修改状态的任务立即批处理一次
class Demo extends React.Component{
    state = {
        x:10,
        y:5,
        z:0
    }
    handler = ()=>{
        //this->实例[宿主环境]
        let {x,y} = this.state

        //触发?次更新——也是一次(因为setState默认是异步操作[实现状态批处理],放在定时器里面，就可以手动变成[同步]了)
        this.setState({x:x+1})
        console.log(this.state,'1')
        flushSync(()=>{
            this.setState({y:y+1})
            console.log(this.state,'2')
        })
        //在修改z之前，要确保x,y都已经修改过和让视图更新了
        //不想有延迟，不愿意用定时器包起来(虽然可以做)

        console.log(this.state,'3')    //flushSync操作结束后，会立即"刷新"更新队列
        this.setState({z:this.state.x + this.state.y})
        console.log(this.state,'4,期望z是17',)
    }
    render() {
        console.log('render')
        let {x,y,z} = this.state
        return <div>
            x:{x}-y:{y}-z:{z}
            <br/>
            <button onClick={this.handler}>按钮</button>
        </div>
    }
}

export default Demo

