/**
 * @Author liming
 * @Date 2023/9/4 15:16
 **/
import React from 'react'
import {HashRouter,Route,Switch,Redirect,Link} from "react-router-dom";
import RouterView from './router'
import routes from './router/routes'
import styled from 'styled-components'

//导入组件
// import A from './views/A'
// import B from './views/B'
// import C from './views/C'
// import Wrong from "./views/Wrong";

const NavBox = styled.nav`
  a{
    margin-left:10px;
    color:#000;
    font-size: 32px;
  }
`
const App = (props)=>{
    console.log(props,'App组件的props')
    return <HashRouter>
        {/*导航部分*/}
        <NavBox>
            <Link to="/a">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </NavBox>

        {/*不需要这么写了*/}
        {/*<Switch>*/}
        {/*    /!*Switch里面的路由，只能匹配其中一个*!/*/}
        {/*    <Redirect exact from ='/' to='/a'></Redirect>*/}
        {/*    <Route  path="/a" component={A}></Route>*/}
        {/*    <Route path="/b" component={B}></Route>*/}
        {/*    <Route path="/c" component={C}></Route>*/}
        {/*    <Redirect to="/a"></Redirect>*/}
        {/*</Switch>*/}
        <div className="content">
            <RouterView routes={routes}></RouterView>
        </div>
    </HashRouter>
}

export default App

