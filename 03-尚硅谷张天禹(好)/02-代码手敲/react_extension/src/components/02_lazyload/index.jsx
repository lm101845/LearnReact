/*
 * @Author: liming
 * @Date: 2021-09-05 23:01:12
 * @LastEditTime: 2021-09-05 23:37:05
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\02_lazyload\index.jsx
 */
import React, { Component,lazy,Suspense} from 'react'
import { NavLink, Route } from 'react-router-dom'


// import Home from './Home'
// import About from './About'
// 要想懒加载，不能使用这种方式，要使用定义变量的方式
import Loading from './Loading'
// 注意：加载中Loading组件就不能用懒加载的形式来加载了
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
export default class Demo extends Component {
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
                                <NavLink className="list-group-item" to="/about">About</NavLink>
                                <NavLink className="list-group-item" to="/home">Home</NavLink>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel">
                                <div className="panel-body">
                                    {/* 使用Suspense组件将注册路由包起来，当网速很慢的时候，不能白屏，要让客户看一些东西  */}
                                    {/* <Suspense fallback={ <h1>Loading...</h1>}> */}
                                    <Suspense fallback={<Loading/>}>
                                        {/* 注册路由 */}
                                        <Route path="/about" component={About} />
                                        <Route path="/home" component={Home} />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
