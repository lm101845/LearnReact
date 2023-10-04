import React from "react";
import { HashRouter } from 'react-router-dom';
import RouterView from "./router";
import { KeepAliveProvider } from 'keepalive-react-component';
// 全局样式处理
import 'lib-flexible';
import './index.less';

const App = function App() {
    return <HashRouter>
        <KeepAliveProvider>
            <RouterView />
        </KeepAliveProvider>
    </HashRouter>;
};
export default App;