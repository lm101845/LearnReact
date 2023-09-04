/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import {Link, Redirect, Route, Switch} from 'react-router-dom'
import routes from '../router/aRoutes'   //二级路由
import styled from 'styled-components'
import A1 from "./a/A1";
import A2 from "./a/A2";
import A3 from "./a/A3";
import RouterView from '../router'

const DemoBox = styled.div`
  display: flex;

  .menu {
    a {
      color: #000;
      display: block;
      font-size: 16px;
    }
  }
`
const A = () => {
    return <DemoBox>
        <div className="menu">
            <Link to="/a/a1">A1</Link>
            <Link to="/a/a2">A2</Link>
            <Link to="/a/a3">A3</Link>
        </div>

        <div className="view">
            {/*配置二级路由的匹配规则:需要把一级路由也带上，不能省略*/}
            {/*不需要这么写了*/}
            {/*<Switch>*/}
            {/*    <Redirect exact from='/a' to='/a/a1'></Redirect>*/}
            {/*    <Route path='/a/a1' component={A1}></Route>*/}
            {/*    <Route path='/a/a2' component={A2}></Route>*/}
            {/*    <Route path='/a/a3' component={A3}></Route>*/}
            {/*    <Redirect to="/a/a1"></Redirect>*/}
            {/*</Switch>*/}
            <RouterView routes={routes}></RouterView>
        </div>
    </DemoBox>
}

export default A
