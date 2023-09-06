/**
 * @Author liming
 * @Date 2023/9/4 15:16
 **/
import React from 'react'
import {HashRouter} from "react-router-dom";
import HomeHead from "./components/HomeHead";
import RouterView from './router'
//v6版本没有switch和redirect了


const App = () => {
    return <HashRouter>
        <HomeHead/>
        <div className="content">
            <RouterView/>
        </div>
    </HashRouter>
}

export default App

