//创建"外壳"组件App

//这里我们使用类式组件(不使用函数式组件)

//这个js文件要使用React.Component就需要引入它
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