/**
 * @Author liming
 * @Date 2023/8/1 11:37
 **/
import React from 'react'
import Menu from "./views/Menu";
import Nav from "./views/Nav";

const App = ()=>{
    return <div className="home-box">
        <Nav/>
        <Menu/>
        <div className="box">我是内容</div>
    </div>
}

export default App
