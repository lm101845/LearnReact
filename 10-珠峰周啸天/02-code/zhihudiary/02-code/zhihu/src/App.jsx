/**
 * @Author liming
 * @Date 2023/9/6 22:51
 **/
import React from 'react'
import {HashRouter} from "react-router-dom";
import RouterView from "./route";
import {KeepAliveProvider} from 'keepalive-react-component'
const App = () => {
    return <HashRouter>
        <KeepAliveProvider>
            <RouterView/>
        </KeepAliveProvider>
    </HashRouter>
}

export default App
