/*
 * @Author: liming
 * @Date: 2021-09-06 21:15:19
 * @LastEditTime: 2021-09-06 21:34:01
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\06_optimize\index.jsx
 */
import React, { Component } from 'react'
import './index.css'
export default class Parent extends Component {
    state = { carName: '奔驰c63' }
    changeCar = () => {
        // this.setState({
        //     carName: '迈巴赫'
        // })

        this.setState({})
        // 我幌了它一下
        // 你虽然传了一个空对象，但是它仍然傻傻的帮你尝试重新更改一下，重新调用render函数
    }
    render() {
        console.log('父组件的render函数调用了');
        const { carName} = this.state
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                <span>我的车名字是：{carName}</span><br />
                <button onClick={this.changeCar}>点我换车</button>
                {/* <Child carName={carName}/> */}
                <Child/>
            </div>
        )
    }
}

class Child extends Component {
    render() {
        console.log('子组件的render函数调用了');
        // 如果我子组件没有用到父组件的任何数据，但是父组件的render函数调用了，而子组件的render也被迫调用了，这样就影响性能了
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                {/* <span>我接到的父组件的车是：{ this.props.carName}</span> */}
            </div>
        )
    }
}

