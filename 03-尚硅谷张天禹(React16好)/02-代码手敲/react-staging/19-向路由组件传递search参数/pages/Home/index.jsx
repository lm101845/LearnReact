import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink'
// 因为我是默认暴露的，所以也不用写花括号了

//注册路由要引入Route
import { Route,Switch,Redirect} from 'react-router-dom'
import News from './News'
import Message from './Message'
export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>我是Home的内容</h3>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            {/* <a className="list-group-item" href="./home-news.html">News</a> */}
                            {/* 把a标签转为MyNavLink标签 */}
                            {/* <MyNavLink to='/news'>News</MyNavLink> */}
                            <MyNavLink to='/home/news'>News</MyNavLink>
                            {/* 注意：前面的/home一定要记得带上！！！ */}
                            {/* home组件要来到你的面前，你才有机会点击你的home链接 */}
                            {/* React中路由的注册是有顺序的，/home和/about是先注册的 */}

                            {/* 你就算注册的是三级路由，那么你前两级路由的名字也要写在前面！！！ */}
                        </li>
                        <li>
                            {/* <a className="list-group-item " href="./home-message.html">Message</a> */}
                            {/* <MyNavLink to='/message'>Message</MyNavLink> */}
                            <MyNavLink to='/home/message'>Message</MyNavLink>
                        </li>
                    </ul>
                    {/* <News/>
                    <Message/> */}

                    {/* 不能直接写<News/>和<Message/>,我们在这里注册路由 */}
                    <Switch>
                        <Route path="/home/news" component={ News}/>
                        <Route path="/home/message" component={Message} />
                        <Redirect to='/home/message'/>
                   </Switch>
                </div>
            </div>
        )
    }
}
