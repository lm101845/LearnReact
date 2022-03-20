/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-03 00:50:22
 * @FilePath: \react-staging\src\App.js
 */

//创建"外壳"组件App

//这里我们使用类式组件(不使用函数式组件)

//这个js文件要使用React.Component就需要引入它
//App.js大写，说明它是一个组件
import React from "react";

class App extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        )
    }
}

export default App
//默认暴露App组件(必须要暴露，别人才能用)