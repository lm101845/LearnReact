import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// withRouter是小写的，它是个函数，不是组件
class Header extends Component {
    back = () => {
            // 注意：只有路由组件才有history,location,match，Header属于一般组件，是没有这些属性的，所以为undefined,报错
        this.props.history.goBack()
        
    }
    forward = () => {
        this.props.history.goForward()
    }
    go = () => {
        this.props.history.go(-2)
    }
    render() {
        console.log('Header组件收到的props是',this.props);
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                  <button onClick={this.back}>回退</button>
                <button onClick={this.forward}>前进</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}

export default withRouter(Header)
// 我暴露的是加工完之后Header的东西，或者说我暴露的是withRouter加工完成后的函数的返回值
// withRouter能够加工一般组件，然后在一般组件身上加上路由组件所特有的那三个东西：history,location,match
// withRouter的返回值是一个新组件