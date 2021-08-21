import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from  'axios'
export default class Search extends Component {
    myRef = React.createRef()
    search = () => {
        console.log('Search组件发布消息了');
        // search里面就只干一件事情，就是发布消息
        // 我一点击按钮就执行Search函数，然后就开始发布消息，并且携带了数据(一个人的姓名和年龄)
        // 紧接着List那边因为订阅了消息，所以它那边可以收到消息及我携带的数据
        // PubSub.publish('atguigu', {name:'tom',age:18})
        const { value: keyWord } = this.myRef.current
        //发送请求之前更新一下状态
        PubSub.publish('atguigu', {isFirst:false,isLoading:true})
        //发送网络请求
        axios.get(`/api1/search/users?q=${keyWord}`).then(
            response => {
                // 请求成功后通知List更新状态
                // this.props.updateAppState({isLoading:false,users:response.data.items})
                PubSub.publish('atguigu', {isLoading:false,users:response.data.items})
            },
            error => {
                // this.props.updateAppState({isLoading:false,err:error.message})
                PubSub.publish('atguigu', {isLoading:false,err:error.message})
            }
        )
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input ref={this.myRef} type="text" placeholder="输入关键词点击搜索"/>&nbsp;
					{/* <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索"/>&nbsp; */}
                    <button onClick={ this.search}>搜索</button>
                </div>
            </section>
        )
    }
}
