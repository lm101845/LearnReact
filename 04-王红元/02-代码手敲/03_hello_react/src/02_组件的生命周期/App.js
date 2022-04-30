import React, { Component } from 'react'

class Cpn extends Component {
    render() {
        return <h2>我是Cpn组件</h2>
    }
    componentWillUnmount() {
        console.log('调用了Cpn的componentWillUnmount方法');
    }
}
 
export default class App extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
            isShow:true
        }
        console.log('执行了组件的constructor方法')
    }
    render() {
        console.log('执行了组件的render方法');
        return (
            <>
                <div> 我是App组件 </div>
                <h2>当前计数：{this.state.count}</h2>
                <button onClick={e => this.increasement()}>点击+1</button>
                <hr></hr>
                <button onClick={e=>this.changeCpnShow()}>切换</button>
                {this.state.isShow && <Cpn />}
            </>

        )
    }
    increasement() {
        console.log(this, 'increasement方法里面的this');
        this.setState({
            count: this.state.count + 1
        })
    }

    changeCpnShow() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    componentDidMount() {
        console.log('执行了组件的componentDidMount方法');
    }

    componentDidUpdate() {
        console.log('执行了组件的componentDidUpdate方法');
    }
}
