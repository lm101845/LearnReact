import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
// 因为他叫index，所以后面的我们可以不写了

export default class App extends Component {
    state = {
        users: [],  //初始化状态，users初始值为数组
        isFirst: true, //是否为第一次展开
        isLoading: false,  //是否处于加载中，发送请求前为true，一旦数据回来了就显示为true
        err:''          //存储请求相关的错误信息
    }
   
    // 名人名言：状态在哪，操纵状态的方法就在哪里
    // saveUsers = (users) => {
    //     this.setState({
    //         users
    //     })
    // }

    // changeFirst = (users) => {
    //     this.setState({
    //         users
    //     })
    // }

    //   changeisLoading = (users) => {
    //     this.setState({
    //         users
    //     })
    // }

    //   saveerr = (users) => {
    //     this.setState({
    //         users
    //     })
    // }
    // 这4个函数都要传给search

    // 但是这样写太麻烦了，写的可以更加通用一些
    // 更新App的state
    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }

    render() {
        // const {users,isFirst,isLoading,err} = this.state
        return (
              <div className="container">
                {/* <Search saveUsers={this.saveUsers}/> */}
                <Search updateAppState={ this.updateAppState}/>
                {/* 父给子通过props传函数 */}
                {/* <List users={this.state.users} /> */}
                <List {...this.state} />
                {/* 可以这么写，批量传递——你有多少个我就传多少个 */}
                {/* <List users={users} isFirst={isFirst} isLoading={isLoading} err={err} /> */}
                {/* 这样写不好，我不能有10个状态，就传10个状态吧 */}
                {/* 传过来的数据交给List做展示 */}
            </div>
        )
    }
}
