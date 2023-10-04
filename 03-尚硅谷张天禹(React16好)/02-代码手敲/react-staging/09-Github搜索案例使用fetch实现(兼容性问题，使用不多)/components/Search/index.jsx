import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from  'axios'
export default class Search extends Component {
    myRef = React.createRef()
    search = async() => {
        console.log('Search组件发布消息了');
        // search里面就只干一件事情，就是发布消息
        // 我一点击按钮就执行Search函数，然后就开始发布消息，并且携带了数据(一个人的姓名和年龄)
        // 紧接着List那边因为订阅了消息，所以它那边可以收到消息及我携带的数据
        // PubSub.publish('atguigu', {name:'tom',age:18})
        const { value: keyWord } = this.myRef.current
        //发送请求之前更新一下状态
        PubSub.publish('atguigu', {isFirst:false,isLoading:true})
        //发送网络请求——使用axios发送
        //#region 
        // axios.get(`/api1/search/users2?q=${keyWord}`).then(
        //     response => {
        //         // 请求成功后通知List更新状态
        //         // this.props.updateAppState({isLoading:false,users:response.data.items})
        //         PubSub.publish('atguigu', {isLoading:false,users:response.data.items})
        //     },
        //     error => {
        //         // this.props.updateAppState({isLoading:false,err:error.message})
        //         PubSub.publish('atguigu', {isLoading:false,err:error.message})
        //     }
        // )
        //#endregion

        //发送网络请求——使用fetch发送(未优化)
        // fetch(`/api1/search/users2?q=${keyWord}`).then(
        //     // response => { console.log('联系服务器成功了', response) },
        //     response => {
        //         // console.log('联系服务器成功了', response.json())
        //         console.log('联系服务器成功了')
        //         return response.json()
        //     },
        //     error => {
        //         console.log('联系服务器失败了', error)
        //         return new Promise(() => { })
        //     }
        //     // 这个失败的回调其实也是有返回值的，返回的是非Promise值，undefined,那么之后的.then状态就是成功的
        //     // 这里写初始化状态的Promise之后，则不会往下走了
        // ).then(
        //     // Promise可以集中处理错误，不需要非常二的在每个.then里面分别写成功了怎么样，失败了怎么样
        //     //.then是可以链式调用的,原因在于then的返回值依然是Promise实例
        //     response => {
        //         console.log('获取数据成功了',response);
        //     },
        //     error => {
        //         console.log('获取数据失败了',error);
        //     }
        // )
        
          //发送网络请求——使用fetch发送(优化)
        try {
                const response = await fetch(`/api1/search/users?q=${keyWord}`)
                // 等一下
                const data = await response.json()
                // console.log(data);
                // 再等一下
                // 所谓的关注分离就是不是一下子就把请求发给你 
                // 注意：await只能等到失败的结果，异常它是不管的——使用try---catch包裹起来即可
                // 数据如果回来了，就可以利用pubSub干一件事情了
                 PubSub.publish('atguigu', {isLoading:false,users:data.items})
                // console.log(data);
        } catch (error) {
            PubSub.publish('atguigu', {isLoading:false,err:error.message})
            console.log('请求出错', error);
        }
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
