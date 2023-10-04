import React, { Component } from 'react'
// 因为他叫index，所以后面的我们可以不写了
// import { Link,Router} from 'react-router-dom'
// import { Link,BrowserRouter,Route} from 'react-router-dom'
// BrowserRouter我们不在这里引入了，因为要一直罩着小弟(每个路由)，来一个小弟就要往外括，就很麻烦
// 我们直接在index.js里面包BrowserRouter，一劳永逸，因为App是所有组件的爸爸，你在index.js里面把爸爸包起来了，下面的儿子也就自动包起来了
// import { Link,Route} from 'react-router-dom'
// import { NavLink, Route } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
// 如果你想要加高亮效果，就不要用Link了，使用Link的升级版——NavLink
// 这个库不可能只暴露一个东西，所以它用的不是默认暴露，用的是分别暴露(你用哪个，你取哪个)
// Router是路由器(你在Web中使用，就引入具体的BrowserRouter)

import Home from './pages/Home'
import About from './pages/About'
// Home,About是路由组件，放到pages文件夹里面
import Header from './components/Header'
// Header是一般组件，放到components文件夹里面
import MyNavLink from './components/MyNavLink'
export default class App extends Component {
    // 这才是App本该有的样子，它就是个外壳
    render() {
        return (
            <div>
                <div>
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8">
                            <Header a={1} />
                            {/* 【一般组件】，你传什么，props就能收到什么 */}
                            {/* 而【路由组件可以收到一些东西，见下面】 */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-2 col-xs-offset-2">
                            <div className="list-group">
                                {/* 原生HTML中,靠<a/>跳转不同的页面 */}
                                {/* 而现在页面只有一个,index.html了 */}
                                {/* <a className="list-group-item" href="./about.html">About</a>
                                <a className="list-group-item active" href="./home.html">Home</a> */}

                                {/* 在React中靠靠路由链接实现切换组件--编写路由链接 */}
                                {/* 你a标签怎么写,Link就怎么写 */}
                                {/* <BrowserRouter> */}
                                {/* <NavLink className="list-group-item" activeClassName='atguigu' to="/about">About</NavLink> */}
                                {/* <Link className="list-group-item" active to="/about">About</Link> */}
                                {/* 注意：浏览器是不认识Link的，它是React里面的东西，最终代码要交给浏览器执行，它还是把Link转为a的 */}
                                {/* <Link className="list-group-item" active to="/home">Home</Link> */}
                                {/* <NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink> */}
                                {/* NavLink里面可以多传一个属性:activeClassName */}
                                {/* </BrowserRouter> */}
                                {/* <MyNavLink to="/about" title='About'/>
                                <MyNavLink to="/home" title='Home'/> */}
                                {/* <MyNavLink to="/about" title='About' a={1} b={2} c={3} /> */}
                                {/* 假如我这里要传很多组的样式属性，这么写也太麻烦了 */}
                                
                                {/* <NavLink className="list-group-item" activeClassName='atguigu' to="/home" children='About'/> */}
                                {/* 注意：不一定要写标签体，你把标签体内容写到children中也是可以的！！！ */}

                                {/* 升级版，把title写到外面,这才是一个优秀的封装*/}
                                <MyNavLink to="/about">About</MyNavLink>
                                {/* 标签属性to,a,b,c等我们知道怎么接，在props身上，但是我们没有学过标签体内容About如何去接 */}
                                {/* 注意：标签体内容也是一个特殊的标签属性 */}
                                {/* 标签里面的内容人家自己给你收集到children身上了 */}
                                {/* <MyNavLink to="/home/a/b">Home</MyNavLink> */}
                                <MyNavLink to="/home">Home</MyNavLink>
                                {/* 前端路由在你点击的时候根本不发送网络请求，但是如果你【刷新】的话，那样式就丢了*/}
                                {/* 最终服务器请求的css文件路径是http://192.168.1.5:3000/atguigu/css/bootstrap.css，这是错的 */}
                                {/* webpack兜底条款：你写错了，我就给你public文件夹下的index.html */}
                                {/* 总结：你的路由路径是【多级结构】并且你【刷新】的话，样式会丢失，不刷新不会丢失 */}

                                {/* 人家要的东西(下面的Router里面的)，你一个都不能少 */}
                                {/* 你给的东西(MyNavLink里面的)，可以多给 */}
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel">
                                <div className="panel-body">
                                    {/* <h3>???????</h3> */}
                                    {/* <Home/>
                                    <About /> */}
                                    {/* 这么写就不需要点，直接渲染组件了 */}
                                    {/* 注册路由——不需要组件标签体内容，所以自结束了 */}
                                    {/* <BrowserRouter> */}
                                        {/* 注意：你整个应用都得用【一个】路由器进行管理，你加上上面那个写了2个BrowserRouter*/}
                                    {/* 那就说明你这个项目用了2个【路由器】，这是不对的 */}
                                    {/* 我们要用BrowserRouter把它们都给包起来*/}
                                        {/* <Route path="/about" component={ About}/>
                                        <Route path="/home" component={ Home}/>
                                        <Route path="/home" component={Test} /> */}
                                    {/* 如果你真想这么展示的话，为什么不把Home,Test变成一个组件呢 */}
                                    {/* 它匹配到Home之后，还会往下进行匹配，如果注册的路由很多的话，这样效率就很低 */}
                                    {/* </BrowserRouter> */}

                                    <Switch>
                                        {/* 注册路由 */}
                                        {/* 如果你的路由是一个以上的话，你再包裹Switch   */}
                                        {/* 使用Switch组件把你注册的路由都给包起来，这样匹配的时候匹配到后就不往下继续找了，效率就高了 */}
                                        <Route exact={ true} path="/about" component={ About}/>
                                            {/* <Route path="/home/a/b" component={ Home}/>      */}
                                            <Route exact  path="/home" component={ Home}/>     
                                        {/* 此时匹配到Home以后就不会往下找了，所以Test组件就不会展示到页面上了 */}
                                        {/* 所以一般情况下我们不会让一个路径去对应多个组件的 */}
                                        {/* exact={ true}表示精准匹配，简写为exact*/}
                                        {/* 但是严格匹配如果随便开，就会导致严重的问题。只有出现了一些状态我们才会开启 */}
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
