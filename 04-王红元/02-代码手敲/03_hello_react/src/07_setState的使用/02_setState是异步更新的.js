/**
 * @Author liming
 * @Date 2022/11/4 19:54
 **/

import React, {Component} from 'react';

function Home(props){
   return <h1>{props.message}</h1>
}
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'Hello World'
        }
    }

    render() {
        return (
            <div>
                <h2>当前文本：{this.state.message}</h2>
                <button onClick={e=>this.changeText()}>改变文本</button>
                <Home message={this.state.message}/>
                {/*如果render没有执行，则home依赖的还是原来的数据*/}
            </div>
        );
    }

    //获取异步更新后的数据
    //方式2：生命周期
    componentDidUpdate() {
        console.log(this.state.message,'生命周期里面拿')
    }

    changeText(){
        //2.setState是异步更新的
        // this.setState({
        //     message:"你好，世界"
        // })
        // console.log(this.state.message)
        //还是Hello World！！！！因为setState的更新是异步的更新！！！

        //获取异步更新后的数据
        //方式1：添加第2个参数
        //setState(更新的state,回调函数[会等到state内部更新之后自动回调])
        this.setState({
            message:"你好，世界"
        },()=>{
            console.log(this.state.message,'回调函数')
            //这个回调函数非常类似于Vue里面的nextTick
        })
    }
}
