import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {
      //state给List最直接，List最需要这些东西
    // List里面有状态，你这里读取状态做展示，但是它故步自封了，状态一辈子也改不了了
      state = {
        users: [],  //初始化状态，users初始值为数组
        isFirst: true, //是否为第一次展开
        isLoading: false,  //是否处于加载中，发送请求前为true，一旦数据回来了就显示为true
        err:''          //存储请求相关的错误信息
    }

    //List要收数据，就要订阅消息，那List组件什么时候订阅消息合适呢？——组件一放到页面上我就要马上订阅消息，要借助钩子
    componentDidMount() {
        // PubSub.subscribe('atguigu', (_,data) => {
        this.token = PubSub.subscribe('atguigu', (_,stateObj) => {
            // 给每一个消息起个名字
            // 消息名随便写，这里我就叫atguigu
            // 2个参数，第一个参数是消息名，我不需要，使用下划线占用
            // console.log('List组件收到数据了：',data);
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
        //当unmount的时候取消订阅
    }
    render() {
        // const { users, isFirst, isLoading, err } = this.props
        const { users, isFirst, isLoading, err } = this.state
        // 这回你不用从父亲那里接了，从自己身上接就行
        return (
            <div className="row">
                {/* 注意：JSX里面不能写if判断(语句)，只能写(三元)表达式 */}
                {
                    // this.props.users.map((userObj) => {
                    // 三元表达式可以连着写
                    isFirst ? <h2>欢迎使用，请输入关键字,随后点击搜索</h2> :
                        isLoading ? <h2>Loading...</h2> :
                            err ?  <h2 style={{color:'red'}}>{err}</h2> :
                                // 这里有个坑，不能输入错误对象err,而是要输入错误信息err.message
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )

                    })
                }
            </div>
        )
    }
}

