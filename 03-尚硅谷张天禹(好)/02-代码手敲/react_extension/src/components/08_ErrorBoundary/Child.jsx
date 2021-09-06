/*
 * @Author: liming
 * @Date: 2021-09-06 23:07:54
 * @LastEditTime: 2021-09-06 23:42:51
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\08_ErrorBoundary\Child.jsx
 */
import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        // 如果后端数据传过来的数据有问题了，组件显示有问题了，错误边界就有作用了
        // 子组件出错了，父组件应该正常显示，父组件出错的地方显示“网络繁忙等”
        // 我们使用错误边界，需要在父组件里面动手脚，而不是在子组件里面 
        // users: [
        //     {id:'001',name:'tom',age: 18},
        //     {id:'002',name:'jack',age: 19},
        //     {id:'003',name:'peiqi',age: 20},
        // ]

        users: 'abc'
        // 我故意写错，后端没有给你返回一个JSON数组
    }
    render() {
        return (
            <div>
                <h2>我是Child组件</h2>
                {
                    this.state.users.map((userObj) => {
                        return <h4 key={userObj.id}>{userObj.name}---{ userObj.age}</h4>
                    })
                }
            </div>
        )
    }
}
