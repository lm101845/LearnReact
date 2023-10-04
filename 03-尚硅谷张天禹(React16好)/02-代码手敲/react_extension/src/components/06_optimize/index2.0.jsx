/*
 * @Author: liming
 * @Date: 2021-09-06 21:15:19
 * @LastEditTime: 2021-09-06 21:54:48
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\06_optimize\index.jsx
 */
import React, { Component } from 'react'
import './index.css'
export default class Parent extends Component {
    state = { carName: '奔驰c63', a: 1, b: 2, c: 3 }
    // 如果里面状态很多，我也不能一个一个去判断数据是否变化，后面会有封装好的给我们用
    changeCar = () => {
        this.setState({
            carName: '迈巴赫'
        })

        // this.setState({})
        // 我幌了它一下
        // 你虽然传了一个空对象，但是它仍然傻傻的帮你尝试重新更改一下，重新调用render函数
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props,this.state);  //目前的props和state
        // console.log(nextProps,nextState);    //接下要变化的目标props，目标state
        // 不能这么玩，你把组件更新的阀门给关了，这么玩组件不更新，就废了
        // return true
        // return false

        // 这样写阀门就很智能，只有数据改了才更新状态，阀门打开，数据没改就不用更新状态，阀门关闭
        // if (this.state.carName === nextState.carName) return false
        // else return true

        // 精简写法
        // 注意：真正开发的时候我们不需要真正的手动去控制阀门
        return !this.state.carName === nextState.carName
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
                {/* <Child /> */}
                {/* 此时子组件没有用到父组件的任何东西 */}
                <Child carName="奥拓" />
                {/* 父组件传的永远都是奥拓 */}
            </div>
        )
    }
}

class Child extends Component {
    // 孩子本身没有自身状态(nextState和this.state都是空)，孩子更关系父亲传过来的props是什么
    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props, this.state);  //目前的props和state
        console.log(nextProps, nextState);    //接下要变化的目标props，目标state
        // if (this.props.carName === nextProps.carName) return false
        // else return true

        // 更简洁写法  
        return  !this.props.carName === nextProps.carName
        
    }

    render() {
        console.log('子组件的render函数调用了');
        // 如果我子组件没有用到父组件的任何数据，但是父组件的render函数调用了，而子组件的render也被迫调用了，这样就影响性能了
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                <span>我接到的父组件的车是：{ this.props.carName}</span>
            </div>
        )
    }
}

