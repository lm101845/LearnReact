/*
 * @Author: liming
 * @Date: 2022-06-06 23:34:51
 * @LastEditTime: 2022-06-06 23:34:52
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\06_跨组件通信\01_跨组件通信-props.js
 */

//跨组件通信方式一：通过props一层层传递
import React, { Component } from 'react'

function ProfileHeader(props) {
    return (
        <div>
            <h2>用户昵称：{props.nickname}</h2>
            <h2>用户等级：{props.level}</h2>
        </div>
    )
}
//attribute 属性展开 ...props
function Profile(props) {
    return (
        <div>
            <ProfileHeader nickname={ props.nickname } level={ props.level } />
            <ProfileHeader { ...props } />
            {/* 这种写法更加简洁*/}
            <ul>
                <li>设置1</li>
                <li>设置2</li>
                <li>设置3</li>
                <li>设置4</li>
            </ul>
        </div>
    )
}
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: 'kobel',
            level:44
        }
    }

    render() {
    const {nickname,level} = this.state
    return (
        <div>
            <Profile nickname={ nickname } level={ level } />
            <Profile {...this.state}/>
      </div>
    )
  }
}

