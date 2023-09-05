/**
 * @Author liming
 * @Date 2023/9/4 15:16
 **/
import React from 'react'
import {HashRouter,Route,Switch,Redirect,Link} from "react-router-dom";
import styled from 'styled-components'

//导入组件
import A from './views/A'
import B from './views/B'
import C from './views/C'
import Wrong from "./views/Wrong";

const NavBox = styled.nav`
  a{
    margin-left:10px;
    color:#000;
    font-size: 24px;
  }
`
const App = ()=>{
    /**基于HashRouter把所有要渲染的内容包起来，开启HASH路由
     * 后续用到的<Route>,<Link>等，都需要在HashRouter/BrowerRouter中使用
     * 开启后，整个页面地址，默认会设置一个#/哈希值
     *
     * Link实现路由切换/跳转的组件
     *    +最后渲染完毕的结果仍然是A标签
     *    +他可以根据路由模式，自动设定点击A切换的方式
     * */

    return <HashRouter>
        {/*导航部分*/}
        <NavBox>
            <Link to="/">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
            {/*<a href="#">A</a>*/}
            {/*<a href="#/b">B</a>*/}
            {/*<a href="#/c">C</a>*/}
        </NavBox>

        {/*路由容器：每一次页面加载或者路由切换完毕，都会根据当前的hash值，到这里和每一个Route进行匹配
        把匹配到的组件，放到容器中渲染*/}
        <div className="content">
            {/*
            Switch:确保路由中，只要有一项匹配，则不再继续向下匹配(一个Switch中只会有一个路由显示)
            exact:设置匹配模式为精准匹配
            */}
            <Switch>
                <Route exact path="/" component={A}></Route>
                <Route path="/b" component={B}></Route>
                <Route path="/c" render={()=>{
                    //当路由地址匹配后，先把render函数执行，函数的返回值就是我们需要渲染的内容
                    //在此函数中，可以处理一些事情，比如：登录态检验
                    let isLogin = true
                    if(isLogin){
                        return <C/>
                    }
                    return  <Redirect to="/login"></Redirect>
                }
                }></Route>

                {/*路由错误解决方法1：返回404*/}
                {/*放在最后一项，path设置*或者不写，意思是：以上都不匹配，则执行这个规则*/}
                {/*<Route path="*" component={Wrong}></Route>*/}
                {/*路由错误解决方法2：重定向到根页面*/}

                {/*如果*/}
                <Redirect to="/"></Redirect>
            </Switch>
            xxxxx
        </div>
    </HashRouter>
}

export default App

