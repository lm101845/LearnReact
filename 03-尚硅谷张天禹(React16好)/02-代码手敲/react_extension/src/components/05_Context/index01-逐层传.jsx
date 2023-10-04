 import React, { Component } from 'react'
 import './index.css'
export default class A extends Component {
    //  A组件是祖父组件——爷爷
    state = {username:'tom'}
     render() {
         return (
             <div className='parent'>
                 <h3>我是A组件</h3>
                 <h4>我的用户名是：{this.state.username}</h4>
                 <B username={ this.state.username}/>
                 {/* B是爸爸 */}
             </div>
         )
     }
}
 
class B extends Component {
    render() {
        return (
            <div className='child'>
                <h3>我是B组件</h3>
                <h4>我从A组件接收到的用户名:{ this.props.username}</h4>
                <C username={this.props.username }/>
                {/* C是儿子 */}
                {/* 可以逐层传递，B收到了A组件传的username，可以继续往下传递给C */}
                {/* 但是这种逐层传，如果有好多层，你不能把其他的层都打扰一下吧 */}
            </div>
        )
    }
}

class C extends Component {
    render() {
        return (
            <div className='grand'>
                <h3>我是C组件</h3>
                <h4>我从A组件接收到的用户名:{ this.props.username}</h4>
            </div>
        )
    }
}
 