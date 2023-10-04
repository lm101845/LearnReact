/**
 * @Author liming
 * @Date 2023/9/4 15:16
 **/
import React from 'react'
import {HashRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";

//v6版本没有switch和redirect了

import HomeHead from "./components/HomeHead";
//导入需要的组件
import A from './views/A'
import B from './views/B'
import C from './views/C'
import A1 from './views/a/A1'
import A2 from './views/a/A2'
import A3 from './views/a/A3'

const App = () => {
    // console.log(useLocation(),'App组件useLocation')
    //没有被Route包起来，拿不到
    return <HashRouter>
        <HomeHead/>
        <div className="content">
            {/*
            所有的路由匹配规则，放在Routes中；
            每一条规则的匹配，还是基于Route
             + 路由匹配成功，不再基于component/render控制渲染的组件，而是基于element,语法格式是<Component/>
             +不再需要Switch,默认就是一个匹配成功，就不再往下匹配了
             +不再需要exact,默认每一项都是精准匹配
            原有的Redirect操作，被<Navigate to/>替代

            */}
            <Routes>
                <Route to="/" element={<Navigate to="/a"/>}/>
                <Route path="/a" element={<A/>}>
                    {/*v6版本中，要求所有路由(二级或者多级路由)，不再分散到各个组件中编写，而是统一写在一起*/}
                    <Route to="/a" element={<Navigate to="/a/a1"/>}/>
                    {/*哈哈哈哈哈哈，这里a前面之前没加/，老是跳转不过去，找了半天错误！！！*/}
                    <Route path="/a/a1" element={<A1/>}/>
                    <Route path="/a/a2" element={<A2/>}/>
                    <Route path="/a/a3" element={<A3/>}/>
                </Route>
                <Route path="/b" element={<B/>}></Route>
                {/*index表明它默认要展示B*/}
                {/*<Route path="/c/:id/:name" element={<C/>}></Route>*/}
                <Route path="/c" element={<C/>}></Route>
                {/*<Navigate to="*" element={<Navigate to={'/a'}/>}/>*/}
                {/*都不匹配，我们可以渲染404组件，也可以重定向到A组件[传递不同的问号参数信息]]*/}
                <Route path="*" element={<Navigate to={{
                    pathname:'/a',
                    search:'?from=404'
                }}/>}/>
            </Routes>
        </div>
    </HashRouter>
}

export default App

