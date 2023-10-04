/*
 * @Author: liming
 * @Date: 2022-06-06 23:34:51
 * @LastEditTime: 2022-06-06 23:34:52
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\06_跨组件通信\01_跨组件通信-props.js
 */

//跨组件通信方式一：通过props一层层传递
import React, { Component } from 'react'

//创建Context对象
const UserContext = React.createContext({
    nickname: 'zhangsan',
    level:5
})

//这个只有类组件才行
function  ProfileHeader(){
        return (
            <UserContext.Consumer>
                {
                    value => {
                        return (
                            <div>
                                <h2>用户昵称：{ value.nickname}</h2>
                                <h2>用户等级：{value.level}</h2>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        )
}

ProfileHeader.contextType = UserContext
//attribute 属性展开 ...props
function Profile() {
    return (
        <div>
            <ProfileHeader />
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
            level: 44
        }
    }

    render() {
        return (
            <div>
                <UserContext.Provider value={this.state}>
                    <Profile />
                </UserContext.Provider>
            </div>
        )
    }
}

