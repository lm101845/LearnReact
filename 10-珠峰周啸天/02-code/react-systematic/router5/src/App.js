/**
 * @Author liming
 * @Date 2023/9/4 15:16
 **/
import React from 'react'
import {HashRouter,Route,Switch,Redirect,Link} from "react-router-dom";
import RouterView from './router'
import routes from './router/routes'
import styled from 'styled-components'
import HomeHead from "./components/HomeHead";


const NavBox = styled.nav`
  a{
    margin-left:10px;
    color:#000;
    font-size: 32px;
  }
`
const App = ()=>{
    return <HashRouter>
        {/*导航部分*/}
        <HomeHead/>
        <div className="content">
            <RouterView routes={routes}></RouterView>
        </div>
    </HashRouter>
}

export default App

