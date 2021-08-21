import React, { Component } from 'react'
import axios from  'axios'
export default class Search extends Component {
    myRef = React.createRef()

    search = () => {
        //获取用户输入
        // const { keyWordElement} = this
        // 解构赋值的连续写法
        // const { keyWordElement: { value}} = this
		// const {keyWordElement:{value:keyWord}} = this
        const { value: keyWord } = this.myRef.current
        // 把解构赋值改个名字
        // console.log(this);
        // console.log(this.myRef.current.value);
        // console.log(value);
        // console.log(keyWord);

        // 在发送网络请求之前干的事情
        // 发送请求前通知App更新状态
        this.props.updateAppState({isFirst:false,isLoading:true})


        //发送网络请求
        axios.get(`/api1/search/users?q=${keyWord}`).then(
            // 你站在3000，同样给代理服务器3000发请求，则前面的东西都可以不写
        // axios.get(`https://localhost:3000/api/search/users?q=${keyWord}`).then(
            // 记得要加api1的前缀，前缀放在端口后面
        // axios.get(`https://localhost:3000/search/users?q=${keyWord}`).then(
        // axios.get(`https://localhost:5000/search/users?q=${keyWord}`).then(
            // 这里老师没有直接向github服务器发送数据，因为如果频繁发送Github就不让你发了
            // 老师自己弄了一个服务器，上面写了2个地址，一个github地址，一个伪造的地址
            // 如果github不让你发了，就转向伪造的地址，那里面有一些数据
        // axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            // 上线的网站很少用CORS解决跨域的，因为安全的问题，很多网站都可以访问，不安全

      
            
            response => {
                // console.log('成功了',response.data)
                // console.log('成功了',response.data.items)
                // this.props.saveUsers(response.data.items)

                  // 请求成功后通知App更新状态
                this.props.updateAppState({isLoading:false,users:response.data.items})
            },
            error => {
                // console.log('失败了',error); 
                // 请求失败后通知App更新状态
                this.props.updateAppState({isLoading:false,err:error.message})
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
