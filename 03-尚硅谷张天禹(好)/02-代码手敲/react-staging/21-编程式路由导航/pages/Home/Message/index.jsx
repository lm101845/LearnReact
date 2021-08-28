import React, { Component } from 'react'
//引入Detail,在合适的时候再去渲染它
import Detail from './Detail'
// 引入Link,把a标签改为路由链接
import { Link, Route } from 'react-router-dom'
// 注册路由用Route
export default class Message extends Component {
    state = {
        messageArr: [
            {id:'01',title:'消息1'},
            {id:'02',title:'消息2'},
            {id:'03',title:'消息3'},
        ]
    }
    replaceShow = (id,title) => {
        // 编写一段代码，让其实现跳转的Detail组件，且为replace跳转
        //借助路由组件身上都有的API：push,replace
        //replace跳转+携带params参数
        // this.props.history.replace(`/home/message/detail/${id}/${title}`)
        //replace跳转+携带search参数
        // this.props.history.replace(`/home/message/detail?id=${id}/&title=${title}`)
        //push跳转+携带state参数
        this.props.history.replace(`/home/message/detail`, { id, title })
        // 这里id,title使用了对象的简写形式
    }
    pushShow = (id, title) => {
        //push跳转+携带params参数
        // this.props.history.push(`/home/message/detail/${id}/${title}`)
        //push跳转+携带search参数
        // this.props.history.push(`/home/message/detail?id=${id}/&title=${title}`)
        //push跳转+携带state参数
        this.props.history.push(`/home/message/detail`, { id, title })
        // 这里id,title使用了对象的简写形式
    }
    back = () => {
        this.props.history.goBack()
        
    }
    forward = () => {
        this.props.history.goForward()
    }
    go = () => {
        this.props.history.go(-2)
    }
    render() {
        const { messageArr} = this.state
        return (
           <div>
                <ul>
                    {/* <li>
                      <a href="/message1">message001</a>&nbsp;&nbsp;
                    </li>
                    <li>
                      <a href="/message2">message002</a>&nbsp;&nbsp;
                    </li>
                    <li>
                      <a href="/message/3" >message003</a>&nbsp;&nbsp;
                    </li> */}
                    {
                        messageArr.map(msgObj => {
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递params参数 */}
                                    {/* <a href="/xxx" >{ msgObj.title}</a> */}
                                    {/* <Link to="/home/message/detail/" >{msgObj.title}</Link> */}
                                    {/* <Link to={ `/home/message/detail/${msgObj.id}/${msgObj.title} `} >{msgObj.title}</Link> */}
                                    {/* 前面路由的一级名和二级名千万别写错，写错了话就匹配不上了 */}
                                    {/* 我们要想办法在它跳转的同时把数据带过来——params */}
                                    {/* 模版字符串里面的东西是JS里面的，所以要写在花括号里面 */}
                                    {/* ==================================================== */}
                                    {/* 向路由组件传递search参数 */}
                                    {/* <Link to={`/home/message/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                                    {/* ==================================================== */}
                                    {/* 像路由组件传递state参数——注意：这个state和组件中的state没有任何关系*/}
                                    {/* params参数和search参数都是暴露在地址栏的，而state不会暴露在地址栏 */}
                                    {/* 如果你要传递state参数，不能像前面那样写了，要把to传递为一个对象 */}
                                    {/* 第一个花括号表示你要传递js表达式，第二个花括号才表示你要开始传对象了 */}
                                    <Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{ msgObj.title}</Link>
                                    &nbsp;<button onClick={()=>{this.pushShow(msgObj.id,msgObj.title)}}>push查看</button>
                                     {/* &nbsp;<button onClick={this.replaceShow}>replace查看</button> */}
                                    &nbsp;<button onClick={() => { this.replaceShow(msgObj.id,msgObj.title)}}>replace查看</button>
                                 </li> 
                            )
                        })
                    }
                </ul>
                <hr />
                {/* <Detail/> */}
                {/* 注册路由时就应该声明、接收params参数 */}
                {/* 想给组件传点东西，肯定要使用props */}
                {/* 你上面光带id,title不行，你这里要声明，接收 */}
                {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}
                {/* 因为只有一个，所以就不用包Switch了 */}
                {/* ====================================== */}

                {/* 注册路由时就应该声明、接收search参数——其实。。。。search参数无需声明接收(有关键的?存在)，很爽 */}
                {/* search参数正常注册即可 */}
                {/* state参数正常注册即可 */}
                <Route path="/home/message/detail" component={Detail}></Route>
                <button onClick={this.back}>回退</button>
                <button onClick={this.forward}>前进</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}
