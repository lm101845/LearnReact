import React, { Component } from 'react'
// 因为他叫index，所以后面的我们可以不写了
// import { Link,Router} from 'react-router-dom'
// import { Link,BrowserRouter,Route} from 'react-router-dom'
// BrowserRouter我们不在这里引入了，因为要一直罩着小弟(每个路由)，来一个小弟就要往外括，就很麻烦
// 我们直接在index.js里面包BrowserRouter，一劳永逸，因为App是所有组件的爸爸，你在index.js里面把爸爸包起来了，下面的儿子也就自动包起来了
import { Link,Route} from 'react-router-dom'
// 这个库不可能只暴露一个东西，所以它用的不是默认暴露，用的是分别暴露(你用哪个，你取哪个)
// Router是路由器(你在Web中使用，就引入具体的BrowserRouter)

import Home from './components/Home'
import About from './components/About'
export default class App extends Component {
    // 这才是App本该有的样子，它就是个外壳
    render() {
        return (
            <div>
                <div>
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8">
                            <div className="page-header"><h2>React Router Demo</h2></div>
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
                                <Link className="list-group-item" to="/about">About</Link>
                                {/* 注意：浏览器是不认识Link的，它是React里面的东西，最终代码要交给浏览器执行，它还是把Link转为a的 */}
                                      <Link className="list-group-item" to="/home">Home</Link>
                              {/* </BrowserRouter> */}
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
                                            <Route path="/about" component={ About}/>
                                            <Route path="/home" component={ Home}/>
                                    {/* </BrowserRouter> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
