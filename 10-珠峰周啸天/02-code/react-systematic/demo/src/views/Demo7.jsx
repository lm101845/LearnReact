import React from 'react'
import {flushSync} from "react-dom";

class Demo extends React.Component{
    state = {
        x:0,
    }

    //只更新了1次，最终结果1
    // handler = ()=>{
    //     for (let i = 0; i < 20; i++) {
    //         this.setState({
    //             x:this.state.x + 1
    //         })
    //     }
    // }

    //更新了20次，最终结果20
    // handler = ()=>{
    //     for (let i = 0; i < 20; i++) {
    //         this.setState({
    //             x:this.state.x + 1
    //         })
    //         flushSync()
    //     }
    // }

    //需求，更新1次，最终结果20
    //这种写法不行
    // handler = ()=>{
    //     for (let i = 0; i < 20; i++) {
    //         this.setState({
    //             x:this.state.x + 1
    //         })
    //         if(i === 18){
    //             flushSync()
    //         }
    //     }
    // }

    //需求，更新1次，最终结果20
    //这种写法可以
    handler = ()=>{
        for (let i = 0; i < 20; i++) {
                this.setState(preState=>{
                    return {
                        x:preState.x + 1
                    }
                })
        }
    }

    render() {
        console.log('更新了')
        let {x} = this.state
        return <div>
            x:{x}
            <br/>
            <button onClick={this.handler}>按钮</button>
        </div>
    }

}

export default Demo

